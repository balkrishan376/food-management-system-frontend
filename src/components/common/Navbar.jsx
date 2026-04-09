import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { LogOut, UserCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleScroll = (id) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => { window.scrollTo(0, 0); setIsMenuOpen(false); }} className="flex-shrink-0 flex items-center text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              SustainaBite
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleScroll('home')} className="text-gray-600 hover:text-green-600 transition-colors font-medium text-sm lg:text-base">Home</button>
            <button onClick={() => handleScroll('about')} className="text-gray-600 hover:text-green-600 transition-colors font-medium text-sm lg:text-base">About Us</button>

            <button onClick={() => handleScroll('services')} className="text-gray-600 hover:text-green-600 transition-colors font-medium text-sm lg:text-base">Services</button>
            <button onClick={() => handleScroll('contact')} className="text-gray-600 hover:text-green-600 transition-colors font-medium text-sm lg:text-base">Contact</button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="hidden lg:block text-gray-700 font-medium text-sm">Hello, {user.name}</span>
                  <Link
                    to={user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard'}
                    className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors border border-gray-200"
                    title="Update profile"
                  >
                    <UserCircle className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors p-2"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center ml-2">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 border-b border-gray-100 shadow-lg' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
          <button
            onClick={() => handleScroll('home')}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleScroll('about')}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            About Us
          </button>

          <button
            onClick={() => handleScroll('services')}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => handleScroll('contact')}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            Contact
          </button>
          
          <div className="pt-4 pb-3 border-t border-gray-100 mt-2 px-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center py-2">
                  <div className="flex-shrink-0">
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-bold text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Link
                    to={user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard'}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 rounded-xl bg-green-50 text-green-700 font-bold text-sm"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-bold text-sm border border-gray-100"
                  >
                    Profile
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm mt-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-gray-700 font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-green-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
