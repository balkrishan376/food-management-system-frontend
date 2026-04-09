import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, HeartHandshake, Package } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      // Validate role
      if (user.role !== role) {
        logout();
        setError(`Role mismatch! This account is registered as a ${user.role}.`);
        setLoading(false);
        return;
      }
      
      if (user.role === 'donor') navigate('/donor-dashboard');
      else if (user.role === 'receiver') navigate('/receiver-dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 bg-gradient-to-br from-green-50 to-teal-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl flex max-w-5xl w-full overflow-hidden border border-gray-100">
        
        {/* Left Side: Visual Brand */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 to-teal-700 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-300 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Welcome back to <br/>
              <span className="text-green-200">SustainaBite</span>
            </h2>
            <p className="text-teal-50 text-lg max-w-sm leading-relaxed">
              Log in to continue making a difference. Every meal saved is a step toward a zero-waste future.
            </p>
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4 opacity-80">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <HeartHandshake className="text-white h-5 w-5" />
              </div>
              <p className="font-medium">Connect Donors & NGOs</p>
            </div>
            <div className="flex items-center space-x-3 opacity-80">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Package className="text-white h-5 w-5" />
              </div>
              <p className="font-medium">Rescue Quality Surplus Food</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 border-l border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500">Access your {role === 'donor' ? 'Sender' : 'Receiver'} dashboard.</p>
          </div>

          {/* Elegant Role Toggle */}
          <div className="flex bg-gray-100 p-1.5 rounded-full mb-8 relative shadow-inner">
            <button
              type="button"
              onClick={() => setRole('donor')}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-full transition-all duration-300 flex justify-center items-center ${
                role === 'donor' 
                  ? 'bg-white text-green-700 shadow-sm ring-1 ring-black/5 transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sender (Donor)
            </button>
            <button
              type="button"
              onClick={() => setRole('receiver')}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-full transition-all duration-300 flex justify-center items-center ${
                role === 'receiver' 
                  ? 'bg-white text-teal-700 shadow-sm ring-1 ring-black/5 transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Receiver (NGO)
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email" required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password" required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent shadow shadow-green-500/30 rounded-xl text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-base font-bold transition-all transform hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:hover:transform-none"
            >
              {loading ? 'Authenticating...' : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-green-600 hover:text-green-500 transition-colors">
              Create an account <ArrowRight className="inline w-4 h-4 ml-0.5 align-text-bottom"/>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
