import { use } from "react";
import { CartContext } from "../providers/CartProvider";

const useCart = () => {
  const context = use(CartContext);
  return context;
};
export default useCart;
