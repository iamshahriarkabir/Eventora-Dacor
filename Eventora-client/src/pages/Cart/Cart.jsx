import { useEffect } from "react";
import useCart from "../../hooks/useCart";
import { Link } from "react-router";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import SectionTitle from "../../components/shared/SectionTitle";

const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    document.title = "Decoriva | My Cart";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionTitle heading="Your Shortlist" subHeading="Review Packages" />

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif opacity-50 mb-6">
              Your cart is empty.
            </h3>
            <Link
              to="/services"
              className="btn btn-primary px-8 rounded-full text-white"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-base-100 border border-base-content/10 rounded-2xl shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.service_name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-xl font-serif font-bold">
                      {item.service_name}
                    </h4>
                    <div className="badge badge-secondary badge-outline my-2">
                      {item.category}
                    </div>
                    <p className="opacity-60 text-sm line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-center sm:text-right">
                    <p className="text-xl font-bold text-primary mb-2">
                      ${item.cost}
                    </p>
                    <div className="flex gap-2 justify-center sm:justify-end">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-sm btn-circle btn-ghost text-error"
                        title="Remove"
                      >
                        <FaTrash />
                      </button>

                      {/* Direct Booking Link for this Item */}
                      <Link
                        to={`/book/${item._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Card */}
            <div className="w-full lg:w-96 h-fit sticky top-28">
              <div className="bg-base-200/50 p-8 rounded-3xl border border-base-content/5">
                <h3 className="text-xl font-bold mb-6">Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm opacity-70">
                    <span>Items</span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-70">
                    <span>Subtotal</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-xl font-bold text-primary">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                </div>

                <p className="text-xs text-center opacity-50 mb-4">
                  *Note: You will need to select dates for each service
                  individually.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
