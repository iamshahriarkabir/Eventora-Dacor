import { use, useState, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaGift, 
  FaCheck, 
  FaLock, 
  FaShieldAlt,
  FaMusic,
  FaCamera,
  FaLightbulb,
  FaLeaf
} from "react-icons/fa";

const BookingForm = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);

  // States for Price Calculation
  const [addons, setAddons] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Mock Addons
  const availableAddons = [
    { name: "Extra Floral Arrangements", price: 100, icon: <FaLeaf /> },
    { name: "Premium Lighting Setup", price: 150, icon: <FaLightbulb /> },
    { name: "Live Music / DJ", price: 300, icon: <FaMusic /> },
    { name: "Drone Photography", price: 200, icon: <FaCamera /> },
  ];

  useEffect(() => {
    document.title = "Eventora | Secure Booking";
    axios
      .get(`${import.meta.env.VITE_API_URL}/services/${id}`)
      .then((res) => setService(res.data));
  }, [id]);

  // 1. Logic: Addon Toggle
  const toggleAddon = (addon) => {
    if (addons.find((a) => a.name === addon.name)) {
      setAddons(addons.filter((a) => a.name !== addon.name));
    } else {
      setAddons([...addons, addon]);
    }
    // Reset coupon if addons change (to force re-calculation safety)
    if(isCouponApplied) {
        setIsCouponApplied(false);
        setDiscountAmount(0);
        toast("Price changed. Please re-apply coupon.");
    }
  };

  // 2. Logic: Price Calculations
  // Base + Addons
  const subTotal = service ? service.cost + addons.reduce((acc, curr) => acc + curr.price, 0) : 0;
  // Final Total
  const grandTotal = subTotal - discountAmount;

  // 3. Logic: Apply Coupon (Frontend)
  const handleApplyCoupon = () => {
      if(coupon.trim().toUpperCase() === "Z4CODE") {
          const discount = subTotal * 0.10; // 10% Discount
          setDiscountAmount(discount);
          setIsCouponApplied(true);
          toast.success("Coupon Applied! 10% Discount.");
      } else {
          toast.error("Invalid Coupon Code");
          setDiscountAmount(0);
          setIsCouponApplied(false);
      }
  };

  const onSubmit = async (data) => {
    if (!user) return toast.error("Please login to book");
    setLoading(true);

    // Clean addons (remove icons)
    const cleanAddons = addons.map(item => ({
        name: item.name,
        price: item.price
    }));

    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      image: service.image,
      // 🔥 FIX: Saving the GRAND TOTAL (Addons included, Discount deducted) to Database
      price: grandTotal, 
      userEmail: user.email,
      userName: user.displayName,
      date: data.date,
      address: data.address,
      notes: data.notes,
      status: "pending",
      addons: cleanAddons,
      couponCode: isCouponApplied ? "Z4CODE" : "",
    };

    try {
      const token = await user.getIdToken();

      // 1. Save Booking to Database
      const bookingRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (bookingRes.data.insertedId) {
        // 2. Create Stripe Session
        const paymentRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          {
            bookingId: bookingRes.data.insertedId,
            serviceName: service.service_name,
            price: service.cost, // Base price (Backend recalculates everything securely)
            userEmail: user.email,
            addons: cleanAddons,
            couponCode: isCouponApplied ? "Z4CODE" : "",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (paymentRes.data.url) {
          window.location.replace(paymentRes.data.url);
        }
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || error.message;
      toast.error(`Failed: ${errMsg}`);
      setLoading(false);
    }
  };

  if (!service) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-200/30 pt-24 pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex justify-center">
          <ul className="steps">
            <li className="step step-primary font-bold text-sm">Event Details</li>
            <li className="step step-primary font-bold text-sm">Customization</li>
            <li className="step font-bold text-sm text-base-content/50">Payment</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDE: INPUTS */}
          <div className="flex-1 space-y-8">
            {/* Step 1: Essentials */}
            <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span> 
                Event Essentials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-wide opacity-70">Event Date</label>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          className="input input-bordered w-full pl-10 focus:border-primary focus:outline-none bg-base-200/30"
                          placeholderText="Select date"
                          minDate={new Date()}
                        />
                      )}
                    />
                    <FaCalendarAlt className="absolute left-3 top-3.5 text-base-content/40" />
                  </div>
                  {errors.date && <span className="text-error text-xs mt-1">Date is required</span>}
                </div>

                <div className="form-control">
                  <label className="label font-bold text-xs uppercase tracking-wide opacity-70">Venue Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("address", { required: true })}
                      placeholder="e.g. Radisson Blu, Dhaka"
                      className="input input-bordered w-full pl-10 focus:border-primary focus:outline-none bg-base-200/30"
                    />
                    <FaMapMarkerAlt className="absolute left-3 top-3.5 text-base-content/40" />
                  </div>
                  {errors.address && <span className="text-error text-xs mt-1">Address is required</span>}
                </div>
              </div>

              <div className="form-control mt-6">
                <label className="label font-bold text-xs uppercase tracking-wide opacity-70">Special Requests</label>
                <textarea
                  {...register("notes")}
                  className="textarea textarea-bordered h-24 w-full focus:border-primary focus:outline-none bg-base-200/30 text-base"
                  placeholder="Any specific themes?"
                ></textarea>
              </div>
            </div>

            {/* Step 2: Add-ons */}
            <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span> 
                Enhance Your Experience
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableAddons.map((addon, idx) => {
                  const isSelected = addons.some((a) => a.name === addon.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleAddon(addon)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-base-200 hover:border-primary/50 bg-base-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                           isSelected ? "bg-primary text-white" : "bg-base-200 text-base-content/60"
                        }`}>
                           {addon.icon}
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${isSelected ? "text-primary" : "text-base-content"}`}>{addon.name}</p>
                          <p className="text-xs opacity-60">+${addon.price}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-primary bg-primary text-white" : "border-base-300"
                      }`}>
                        {isSelected && <FaCheck size={10} />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SUMMARY */}
          <div className="lg:w-96 relative">
            <div className="sticky top-28 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-xl">
              <h3 className="text-lg font-serif font-bold mb-6 pb-4 border-b border-base-200">
                Order Summary
              </h3>

              {/* Service */}
              <div className="flex gap-4 mb-6">
                <img src={service.image} alt="Service" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-sm leading-tight">{service.service_name}</h4>
                  <p className="text-xs opacity-60 mt-1">{service.category}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm opacity-70">
                  <span>Base Price</span>
                  <span>${service.cost}</span>
                </div>
                
                {addons.map((add, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-base-content/80">
                    <span className="flex items-center gap-1"><FaGift size={10} /> {add.name}</span>
                    <span>+${add.price}</span>
                  </div>
                ))}

                {isCouponApplied && (
                    <div className="flex justify-between text-sm text-success font-bold">
                        <span>Discount (10%)</span>
                        <span>-${discountAmount}</span>
                    </div>
                )}

                <div className="divider my-2"></div>
                
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-serif font-bold text-2xl text-primary">${grandTotal}</span>
                </div>
              </div>

              {/* Coupon Input */}
              <div className="form-control mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Promo Code (Z4CODE)"
                    className="input input-bordered w-full pl-10 pr-20 text-sm focus:border-primary focus:outline-none uppercase"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={isCouponApplied}
                  />
                  <FaGift className="absolute left-3 z-10 top-3 text-base-content/40" />
                  <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isCouponApplied}
                    className="absolute right-1 top-1 bottom-1 z-1 btn btn-sm btn-ghost text-primary text-xs"
                  >
                    {isCouponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full rounded-xl shadow-lg hover:shadow-primary/30 text-white font-bold h-12"
              >
                {loading ? <LoadingSpinner /> : (
                  <span className="flex items-center gap-2">
                    <FaLock size={14} /> Proceed to Pay
                  </span>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest opacity-50 font-bold">
                <FaShieldAlt /> Secure Encrypted Payment
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
export default BookingForm;