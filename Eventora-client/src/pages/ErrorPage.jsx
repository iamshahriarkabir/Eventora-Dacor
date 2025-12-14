import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-6 relative overflow-hidden">
      {/* Background Texture */}
      <h1 className="text-[15rem] md:text-[20rem] font-serif font-bold opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        404
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Space Not Found
        </h2>
        <p className="text-lg text-base-content/60 max-w-md mx-auto mb-8">
          The page you are looking for has been moved or does not exist in our
          catalog.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-lg rounded-full px-10 shadow-xl"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};
export default ErrorPage;
