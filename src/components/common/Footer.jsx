import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-4 inline-block"
            >
              SustainaBite
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Bridging the gap between surplus food and those in need. Join our mission to eliminate food wastage and build a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/sustainabite"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/sustainabite"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Get Involved</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Register as NGO
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Volunteer With Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="tel:+915551234567" className="hover:text-white transition-colors">
                  📞 +91 55512 34567
                </a>
              </li>
              <li>
                <a href="mailto:support@sustainabite.org" className="hover:text-white transition-colors">
                  ✉️ support@sustainabite.org
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Gamma+1,+Greater+Noida,+Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  📍 Gamma 1, Greater Noida, Uttar Pradesh
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SustainaBite. All rights reserved.</p>
          <p className="flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" /> for a better planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
