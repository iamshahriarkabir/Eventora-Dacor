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
  console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT.");
}

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@z4tech.as3lfup.mongodb.net/?appName=Z4Tech`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Auth Middleware
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
    await client.connect();
    const db = client.db("Eventora_DB");

    // Collections
    const usersCollection = db.collection("users");
    const servicesCollection = db.collection("services");
    const bookingsCollection = db.collection("bookings");
    const decoratorRequestsCollection = db.collection("decoratorRequests");
    const blogsCollection = db.collection("blogs"); // 🔥 NEW COLLECTION

    console.log("☘️  MongoDB Connected Successfully!");

    // --- 1. AUTHENTICATION ---
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

    app.get("/users", verifyFBToken, async (req, res) => {
      const result = await usersCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(result);
    });

    app.patch("/users/role/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const requester = await usersCollection.findOne({ email: req.decoded_email });
      if (!requester || requester.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { role: role } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.get("/users/role/:email", verifyFBToken, async (req, res) => {
      const email = req.params.email;
      if (req.decoded_email !== email) return res.status(403).send({ message: "forbidden" });
      const user = await usersCollection.findOne({ email });
      res.send({ role: user?.role || "user" });
    });

    // --- 2. DECORATORS ---
    app.get("/public/decorators", async (req, res) => {
      const query = { role: "decorator" };
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/decorator-requests", verifyFBToken, async (req, res) => {
      const request = req.body;
      const existing = await decoratorRequestsCollection.findOne({ email: request.email });
      if (existing) return res.send({ message: "Request already pending" });
      const result = await decoratorRequestsCollection.insertOne(request);
      res.send(result);
    });

    app.get("/decorator-requests", verifyFBToken, async (req, res) => {
      const result = await decoratorRequestsCollection.find().toArray();
      res.send(result);
    });

    app.patch("/decorator-requests/:id", verifyFBToken, async (req, res) => {
      const id = req.params.id;
      const { status, email } = req.body;
      const filter = { _id: new ObjectId(id) };
      await decoratorRequestsCollection.updateOne(filter, { $set: { status } });

      if (status === "approved") {
        const requestData = await decoratorRequestsCollection.findOne(filter);
        if (requestData) {
          await usersCollection.updateOne(
            { email: email },
            {
              $set: {
                role: "decorator",
                specialty: requestData.specialty,
                experience: requestData.experience,
              },
            }
          );
        }
      }
      res.send({ success: true });
    });

    // --- 3. SERVICES (CRUD) ---
    app.get("/services", async (req, res) => {
      const { search, category, minPrice, maxPrice, page = 1, limit = 8 } = req.query; // limit increased to 8 for grid of 4
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
      const result = await servicesCollection.find(query).skip(skip).limit(limitNum).toArray();
      res.send({ services: result, totalServices: total, currentPage: pageNum, totalPages: Math.ceil(total / limitNum) });
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const result = await servicesCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/services", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin") return res.status(403).send({ message: "forbidden" });
      const result = await servicesCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/services/locations/category", async (req, res) => {
      const result = await servicesCollection.aggregate([
        { $match: { location: { $exists: true, $ne: null, $ne: "" } } },
        { $group: { _id: "$location" } },
        { $project: { _id: 0, location: "$_id" } },
      ]).toArray();
      res.send(result.map((i) => i.location));
    });

    app.patch("/services/:id", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin") return res.status(403).send({ message: "forbidden" });
      const item = req.body;
      delete item._id;
      if (item.cost) item.cost = parseInt(item.cost);
      const result = await servicesCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: item });
      res.send(result);
    });

    app.delete("/services/:id", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin") return res.status(403).send({ message: "forbidden" });
      const result = await servicesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // --- 4. BOOKINGS ---
    app.post("/bookings", verifyFBToken, async (req, res) => {
      const booking = req.body;
      booking.status = "pending";
      booking.createdAt = new Date();
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    app.get("/bookings", verifyFBToken, async (req, res) => {
      const email = req.decoded_email;
      const user = await usersCollection.findOne({ email });
      let query = {};
      if (user.role === "admin") query = {};
      else if (user.role === "decorator") query = { decoratorEmail: email };
      else query = { userEmail: email };
      const result = await bookingsCollection.find(query).sort({ createdAt: -1 }).toArray();
      res.send(result);
    });

    app.patch("/bookings/:id", verifyFBToken, async (req, res) => {
      const result = await bookingsCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
      res.send(result);
    });

    app.delete("/bookings/:id", verifyFBToken, async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const booking = await bookingsCollection.findOne(query);
      if (booking.status !== "pending") return res.status(403).send({ message: "Cannot cancel" });
      const result = await bookingsCollection.deleteOne(query);
      res.send(result);
    });

    // --- 5. PAYMENT (STRIPE) ---
    const VALID_COUPONS = {
      SAVE10: 0.1,
      STYLE20: 0.2,
      FIRST50: 50,
      Z4CODE: 0.1,
    };

    app.post("/create-checkout-session", verifyFBToken, async (req, res) => {
      try {
        const { bookingId, serviceName, price, userEmail, couponCode } = req.body;
        let finalAmount = parseInt(price);
        
        // Trusting frontend price as it includes addons & discounts (Assignment specific)
        
        const clientUrl = "https://eventora-client.vercel.app";

        const session = await stripeClient.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `${serviceName}`,
                  description: `Booking ID: ${bookingId} | Coupon: ${couponCode || 'None'}`,
                },
                unit_amount: Math.round(finalAmount * 100),
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: { bookingId: bookingId.toString(), userEmail },
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

    // --- 6. BLOGS ROUTES (NEW) --- 
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().sort({ date: -1 }).toArray();
      res.send(result);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const result = await blogsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // 🔥 NEW: Add Blog API (Paste this part)
    app.post("/blogs", verifyFBToken, async (req, res) => {
      const user = await usersCollection.findOne({ email: req.decoded_email });
      if (user?.role !== "admin") return res.status(403).send({ message: "forbidden" });
      
      const blog = req.body;
      blog.date = new Date(); // Auto assign server date
      const result = await blogsCollection.insertOne(blog);
      res.send(result);
    });

    // --- 7. ADMIN ANALYTICS ---
    app.get("/stats", verifyFBToken, async (req, res) => {
      const totalUsers = await usersCollection.countDocuments();
      const totalServices = await servicesCollection.countDocuments();
      const totalBookings = await bookingsCollection.countDocuments();
      const revenueData = await bookingsCollection.aggregate([
        { $match: { status: { $ne: "pending" } } },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]).toArray();
      res.send({
        totalUsers,
        totalServices,
        totalBookings,
        revenue: revenueData.length > 0 ? revenueData[0].total : 0,
      });
    });

    app.get("/", (req, res) => {
      res.send({ status: "running", msg: "Eventora Server is Online" });
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