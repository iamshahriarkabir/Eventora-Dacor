import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  // 1. Social Links Data Configuration
  const socialLinks = [
    { 
      icon: FaFacebookF, 
      link: "https://facebook.com", 
    },
    { 
      icon: FaInstagram, 
      link: "https://instagram.com", 
    },
    { 
      icon: FaTwitter, 
      link: "https://twitter.com",   
    },
    { 
      icon: FaLinkedinIn, 
      link: "https://linkedin.com",  
    },
  ];

  return (
    <footer className="bg-base-200 text-base-content pt-20 pb-10 border-t border-base-300">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-3xl font-serif font-bold leading-none tracking-tight">
                Eventora
              </span>
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-primary uppercase">
                Decor
              </span>
            </Link>
            <p className="opacity-70 leading-relaxed text-sm">
              Crafting immersive environments for life's most celebrated moments. 
              Modern styling meets timeless elegance.
            </p>

            {/* Social Icons Loop */}
            <div className="flex gap-3">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-base-100 border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-serif">Company</h4>
            <ul className="space-y-4 opacity-70 text-sm font-medium">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-primary transition-colors">
                  Our Professionals
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-serif">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="opacity-70">
                  Level 4, Gulshan Avenue, <br /> Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span className="opacity-70">+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span className="opacity-70">hello@eventora.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-serif">Newsletter</h4>
            <p className="opacity-70 text-sm mb-4">
              Subscribe for design trends and exclusive offers.
            </p>
            <div className="join w-full shadow-sm">
              <input
                className="input input-bordered join-item w-full text-sm bg-base-100 focus:outline-none focus:border-primary"
                placeholder="Email address"
              />
              <button className="btn btn-primary join-item text-white">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-base-300 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center opacity-60 text-sm font-medium">
          <p>
            &copy; {new Date().getFullYear()} Eventora Decor. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;