import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import SectionTitle from "../../../components/shared/SectionTitle";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah & David",
    role: "Wedding Clients",
    text: "Absolutely stunning execution. The team at Eventora transformed our venue into a dreamland. Every detail was perfect.",
    rating: 5,
  },
  {
    name: "TechGiant Corp",
    role: "Corporate Partner",
    text: "Professional, punctual, and innovative. They handled our annual summit with such precision. Highly recommended for business events.",
    rating: 5,
  },
  {
    name: "Dr. Farhana Ahmed",
    role: "Private Party",
    text: "My daughter's sweet 16 was magical. The floral arrangements were fresh and the lighting set the perfect mood.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Art Director",
    text: "As a designer myself, I am hard to please. But Eventora's sense of aesthetics and color balance is top-tier.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Background Decor */}
      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div> */}
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          heading="Client Stories"
          subHeading="What People Say"
          center={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16 !px-4"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="bg-base-100 p-8 rounded-2xl shadow-sm border border-base-200 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                  
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-primary/10 text-4xl">
                    <FaQuoteRight />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(review.rating)].map((_, idx) => (
                      <FaStar key={idx} size={14} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base-content/70 italic leading-relaxed mb-6 font-serif">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content text-sm">
                        {review.name}
                      </h4>
                      <p className="text-xs font-sans uppercase tracking-wider text-primary opacity-70">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};
export default Testimonials;