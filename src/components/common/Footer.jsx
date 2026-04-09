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
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-6 inline-block"
            >
              SustainaBite
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              Bridging the gap between surplus food and those in need. Join our community of donors and NGOs to eliminate food wastage and build a more sustainable future for everyone.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                title="Follow on Twitter"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                title="Connect on LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
                title="View Source on GitHub"
              >
                git
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-green-500/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-green-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 transition-all duration-300"></span>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-green-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 transition-all duration-300"></span>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-green-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 transition-all duration-300"></span>
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-green-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 mr-0 transition-all duration-300"></span>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-teal-500/30 pb-2 inline-block">Get Involved</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/register" className="text-gray-400 hover:text-teal-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 transition-all duration-300"></span>
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-teal-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 transition-all duration-300"></span>
                  Register as NGO
                </Link>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-teal-400 transition-all text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 transition-all duration-300"></span>
                  Volunteer With Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-emerald-500/30 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4 text-sm text-gray-400 text-left">
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">📞</span>
                <a href="tel:+915551234567" className="hover:text-white transition-colors">
                  +91 55512 34567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">✉️</span>
                <a href="mailto:support@sustainabite.org" className="hover:text-white transition-colors">
                  support@sustainabite.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-emerald-400">📍</span>
                <a
                  href="https://maps.google.com/?q=Gamma+1,+Greater+Noida,+Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  Gamma 1, Greater Noida,<br/>Uttar Pradesh, India
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
