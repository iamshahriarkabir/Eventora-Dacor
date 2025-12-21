const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const stripe = require("stripe");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin Initialized Successfully");
} catch (error) {
  console.error(
    "❌ Failed to parse FIREBASE_SERVICE_ACCOUNT. Check your .env file."
  );
}

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@z4tech.as3lfup.mongodb.net/?appName=Z4Tech`;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// --- Custom Auth Middleware ---
const verifyFBToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded_email = decoded.email;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return res.status(401).send({ message: "unauthorized access" });
  }
};

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("Eventora_DB"); // DB Name Updated

    // Collections
    const usersCollection = db.collection("users");
    const servicesCollection = db.collection("services");
    const bookingsCollection = db.collection("bookings");
    const decoratorRequestsCollection = db.collection("decoratorRequests");

    console.log("☘️  MongoDB Connected Successfully!");

    // --- 1. USER AUTHENTICATION ROUTES ---

    // Save or Update User on Login/Register
    app.post("/auth/user", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };

      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }

      const result = await usersCollection.insertOne({
        ...user,
        role: "user",
        createdAt: new Date(),
      });
      res.send(result);
    });

    // Get all users
    app.get("/users", verifyFBToken, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Update User Role (Admin Only) - Manual Update
    app.patch("/users/role/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      const requester = await usersCollection.findOne({
        email: req.decoded_email,
      });
      if (!requester || requester.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { role: role },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Get User Role
    app.get("/users/role/:email", verifyFBToken, async (req, res) => {
      const email = req.params.email;
      if (req.decoded_email !== email) {
        return res.status(403).send({ message: "forbidden" });
      }
      const user = await usersCollection.findOne({ email });
      res.send({ role: user?.role || "user" });
    });

    // Public Decorators List (For Team Page & AI)
    app.get("/public/decorators", async (req, res) => {
      const query = { role: "decorator" };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    // --- DECORATOR REQUESTS ROUTES ---

    // 1. Submit a Request (User)
    app.post("/decorator-requests", verifyFBToken, async (req, res) => {
      const request = req.body;
      const existing = await decoratorRequestsCollection.findOne({
        email: request.email,
      });
      if (existing) {
        return res.send({ message: "Request already pending or processed" });
      }
      const result = await decoratorRequestsCollection.insertOne(request);
      res.send(result);
    });

    // 2. Get All Requests (Admin)
    app.get("/decorator-requests", verifyFBToken, async (req, res) => {
      const result = await decoratorRequestsCollection.find().toArray();
      res.send(result);
    });

    // 3. Approve/Reject Request (Admin) - FIXED LOGIC
    app.patch("/decorator-requests/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const { status, email } = req.body;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { status: status } };

      // Update Request Status
      await decoratorRequestsCollection.updateOne(filter, updateDoc);

      // If Approved, Update User Role AND Copy Specialty
      if (status === "approved") {
        // Fetch original request to get specialty details
        const requestData = await decoratorRequestsCollection.findOne(filter);

        if (requestData) {
          await usersCollection.updateOne(
            { email: email },
            {
              $set: {
                role: "decorator",
                specialty: requestData.specialty, // 🔥 FIX: Saving specialty to user profile
                experience: requestData.experience,
              },
            }
          );
        }
      }

      res.send({ success: true });
    });

    // --- 2. SERVICES ROUTES ---

    // Get All Services
    app.get("/services", async (req, res) => {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        page = 1,
        limit = 6,
      } = req.query;
      let query = {};

      if (search) query.service_name = { $regex: search, $options: "i" };
      if (category && category !== "All") query.category = category;
      if (minPrice || maxPrice) {
        query.cost = {};
        if (minPrice) query.cost.$gte = parseInt(minPrice);
        if (maxPrice) query.cost.$lte = parseInt(maxPrice);
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const total = await servicesCollection.countDocuments(query);
      const result = await servicesCollection
        .find(query)
        .skip(skip)
        .limit(limitNum)
        .toArray();

      res.send({
        services: result,
        totalServices: total,
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
      });
    });

    // Get Single Service
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const result = await servicesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Add Service (Admin)
    app.post("/services", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin")
        return res.status(403).send({ message: "forbidden" });

      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.send(result);
    });

    // Get Service Locations
    app.get("/services/locations/category", async (req, res) => {
      try {
        const result = await servicesCollection
          .aggregate([
            { $match: { location: { $exists: true, $ne: null, $ne: "" } } },
            { $group: { _id: "$location" } },
            { $project: { _id: 0, location: "$_id" } },
          ])
          .toArray();
        res.send(result.map((i) => i.location));
      } catch (error) {
        console.error("Location Fetch Error", error);
        res.status(500).send({ message: "Failed to fetch locations" });
      }
    });

    // Update Service
    app.patch("/services/:id", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin")
        return res.status(403).send({ message: "forbidden" });

      const id = req.params.id;
      const item = req.body;
      delete item._id;
      if (item.cost) {
        item.cost = parseInt(item.cost);
      }

      const filter = { _id: new ObjectId(id) };
      const updatedDoc = { $set: { ...item } };

      const result = await servicesCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // Delete Service
    app.delete("/services/:id", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin")
        return res.status(403).send({ message: "forbidden" });

      const id = req.params.id;
      const result = await servicesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // --- 3. BOOKING ROUTES ---

    // Create Booking
    app.post("/bookings", verifyFBToken, async (req, res) => {
      const booking = req.body;
      booking.status = "pending";
      booking.createdAt = new Date();
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    // Get Bookings
    app.get("/bookings", verifyFBToken, async (req, res) => {
      const email = req.decoded_email;
      const user = await usersCollection.findOne({ email });

      let query = {};
      if (user.role === "admin") {
        query = {};
      } else if (user.role === "decorator") {
        query = { decoratorEmail: email };
      } else {
        query = { userEmail: email };
      }

      const result = await bookingsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();
      res.send(result);
    });

    // Update Booking Status / Assign Decorator
    app.patch("/bookings/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updates };

      const result = await bookingsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Cancel Booking
    app.delete("/bookings/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const booking = await bookingsCollection.findOne(query);

      if (booking.status !== "pending") {
        return res
          .status(403)
          .send({ message: "Cannot cancel processed booking" });
      }
      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    });

    // --- 4. PAYMENT ROUTES ---
        const VALID_COUPONS = {
      SAVE10: 0.1, // 10% off
      STYLE20: 0.2, // 20% off
      FIRST50: 50,
      Z4CODE: 0.1, // 🔥 Its Ownership
    };


    app.post("/create-checkout-session", verifyFBToken, async (req, res) => {
      try {
        const {
          bookingId,
          serviceName,
          price,
          userEmail,
          addons = [],
          couponCode,
        } = req.body;

        let finalAmount = parseInt(price);
        let addonsCost = 0;
        if (addons.length > 0) {
          addonsCost = addons.reduce((acc, item) => acc + item.price, 0);
          finalAmount += addonsCost;
        }

        let discountAmount = 0;
        if (couponCode && VALID_COUPONS[couponCode]) {
          discountAmount = finalAmount * VALID_COUPONS[couponCode];
          finalAmount -= discountAmount;
        }

        const clientUrl = "https://eventora-client.vercel.app";

        const session = await stripeClient.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${serviceName} + Addons ${
                    couponCode ? "(Discount Applied)" : ""
                  }`,
                  description: `Base: $${price}, Addons: $${addonsCost}, Discount: -$${discountAmount}`,
                },
                unit_amount: Math.round(finalAmount * 100),
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            bookingId: bookingId.toString(),
            userEmail,
            couponUsed: couponCode || "none",
          },
          success_url: `${clientUrl}/dashboard/payment/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
          cancel_url: `${clientUrl}/services`,
        });

        res.send({ url: session.url });
      } catch (error) {
        console.error("Stripe Error:", error);
        res.status(400).send({ message: error.message });
      }
    });

    app.post("/payments/verify", verifyFBToken, async (req, res) => {
      const { sessionId, bookingId } = req.body;
      const session = await stripeClient.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          { $set: { status: "paid", transactionId: session.payment_intent } }
        );
        res.send({ success: true });
      } else {
        res.status(400).send({ success: false });
      }
    });

    // --- 5. ADMIN ANALYTICS ---
    app.get("/stats", verifyFBToken, async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();
      const totalServices = await servicesCollection.countDocuments();
      const totalBookings = await bookingsCollection.countDocuments();

      const revenueData = await bookingsCollection
        .aggregate([
          { $match: { status: { $ne: "pending" } } },
          { $group: { _id: null, total: { $sum: "$price" } } },
        ])
        .toArray();

      const revenue = revenueData.length > 0 ? revenueData[0].total : 0;
      res.send({ totalUsers, totalServices, totalBookings, revenue });
    });

    app.get("/", (req, res) => {
      res.send("Eventora API is running...");
    });
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;