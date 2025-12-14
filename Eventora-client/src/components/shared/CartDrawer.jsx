import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../hooks/useCart";
import { FaTimes, FaTrash, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const CartDrawer = () => {
  // Access global cart state
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } =
    useCart();

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. BACKDROP OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* 2. SLIDE-IN DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-base-100 shadow-2xl border-l border-base-content/5 flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-base-content/5 flex justify-between items-center bg-base-100/80 backdrop-blur-xl sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-serif font-bold">
                  Your Shortlist
                </h2>
                <p className="text-xs text-base-content/60 uppercase tracking-widest mt-1">
                  {cart.length} {cart.length === 1 ? "Item" : "Items"} Selected
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-circle btn-ghost hover:bg-base-200 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* BODY (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
                    <FaArrowRight className="text-xl -rotate-45" />
                  </div>
                  <p className="font-serif text-xl">
                    Your collection is empty.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn btn-link no-underline text-secondary mt-2"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    key={item._id}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.service_name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base-content leading-tight">
                          {item.service_name}
                        </h4>
                        <p className="text-xs text-base-content/50 mt-1">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-secondary">
                          ${item.cost}
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-error cursor-pointer  transition-colors flex items-center gap-1"
                          title="Remove"
                        >
                          <FaTrash size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER (FIXED) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-base-content/5 bg-base-100 z-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-base-content/60">
                    Estimated Total
                  </span>
                  <span className="text-3xl font-serif font-bold text-primary">
                    ${cartTotal}
                  </span>
                </div>
                <Link
                  to="/cart" // Or checkout directly if we had a multi-item checkout
                  onClick={() => setIsCartOpen(false)}
                  className="btn btn-primary w-full rounded-full text-lg shadow-lg hover:shadow-primary/30 text-white"
                >
                  Proceed to Review <FaArrowRight />
                </Link>
                <p className="text-xs text-center text-base-content/40 mt-3">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
