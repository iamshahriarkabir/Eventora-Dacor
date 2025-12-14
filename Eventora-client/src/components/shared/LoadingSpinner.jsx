import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      {/* Container for Animation */}
      <div className="relative flex items-center justify-center">
        
        {/* 1. Outer Rotating Ring (Gradient) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-t-primary border-r-transparent border-b-secondary border-l-transparent"
        />

        {/* 2. Inner Pulsing Circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-12 h-12 bg-base-200 rounded-full flex items-center justify-center shadow-inner"
        >
           {/* Brand Logo "E" */}
           <span className="text-xl font-serif font-bold text-primary">E</span>
        </motion.div>
      </div>

      {/* 3. Brand Name Text (Fading) */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-serif font-bold tracking-widest text-base-content uppercase">
          Eventora
        </h3>
        <p className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase">
          Loading
        </p>
      </motion.div>
    </div>
  );
};
export default LoadingSpinner;