import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  // 1. Cart Data State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("decoriva-cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Drawer Visibility State (NEW)
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem("decoriva-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service) => {
    const exists = cart.find((item) => item._id === service._id);
    if (exists) {
      toast.error("Item already in shortlist!");
      return;
    }
    setCart([...cart, service]);
    toast.success("Added to shortlist");
    setIsCartOpen(true); // Auto-open drawer on add (Luxury UX)
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    // toast.success("Removed"); // Optional: keep it silent for smoother flow
  };

  const clearCart = () => setCart([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((acc, item) => acc + (item.cost || 0), 0);

  const cartInfo = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    isCartOpen, // Export state
    setIsCartOpen, // Export setter
    toggleCart, // Export toggle
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
