import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a decorator?",
      answer:
        "Booking is easy! Simply browse our services, choose your preferred decorator, select a date, and proceed to payment. You will receive a confirmation email instantly.",
    },
    {
      question: "Can I customize the event packages?",
      answer:
        "Yes, absolutely! Most of our decorators offer customizable packages. You can discuss specific requirements directly with them after booking or request a custom quote.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a full refund if you cancel at least 7 days before the event. Cancellations made within 48 hours of the event may be subject to a 50% cancellation fee.",
    },
    {
      question: "Do you offer services outside the city?",
      answer:
        "Currently, we operate within the major metropolitan areas. However, some premium decorators may agree to travel for an additional fee. Check the service details for location info.",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/60">
            Everything you need to know about Eventora bookings.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              key={index}
              className="collapse collapse-plus bg-base-200 rounded-xl hover:bg-base-200/80 transition-colors"
            >
              <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
              <div className="collapse-title text-lg font-bold font-serif">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;