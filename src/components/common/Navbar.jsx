import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleScroll = (id) => {
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

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex-shrink-0 flex items-center text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              SustainaBite
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleScroll('home')} className="text-gray-600 hover:text-green-600 transition-colors font-medium">Home</button>
            <button onClick={() => handleScroll('about')} className="text-gray-600 hover:text-green-600 transition-colors font-medium">About Us</button>
            <button onClick={() => handleScroll('services')} className="text-gray-600 hover:text-green-600 transition-colors font-medium">Services</button>
            <button onClick={() => handleScroll('contact')} className="text-gray-600 hover:text-green-600 transition-colors font-medium">Contact</button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:block text-gray-700 font-medium">Hello, {user.name}</span>
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
                  className="inline-flex items-center text-red-500 hover:text-red-700 transition-colors"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
