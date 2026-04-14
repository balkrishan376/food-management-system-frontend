import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    contactNumber: '',
    organization: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Pass coordinates as 0 for initial registration mock, in real life use browser geolocator
      const user = await register({ ...formData, latitude: 0, longitude: 0 });
      if (user.role === 'donor') navigate('/donor-dashboard');
      else if (user.role === 'receiver') navigate('/receiver-dashboard');
      else navigate('/');
    } catch (err) {
      if (err.message && err.message.includes('timed out')) {
        setError('The server is starting up (cold start). Please wait 30 seconds and try again.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Registration failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 bg-gradient-to-tr from-green-50 to-teal-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl flex max-w-5xl w-full overflow-hidden border border-gray-100 flex-row-reverse">
        
        {/* Right Side: Visual Brand (Reversed for Register page to add visual interest) */}
        <div className="hidden lg:flex w-5/12 bg-gray-900 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-green-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-teal-500 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 mt-10">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Movement.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-sm leading-relaxed">
              Create an account and start managing surplus food efficiently. It is absolutely free to use.
            </p>
          </div>
          <div className="relative z-10 mb-8 space-y-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="text-green-400 h-6 w-6 flex-shrink-0" />
              <p className="text-gray-300 text-sm font-medium">Verified local network of NGOs and restaurants</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="text-green-400 h-6 w-6 flex-shrink-0" />
              <p className="text-gray-300 text-sm font-medium">Real-time alerts via robust geographical matching</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="text-green-400 h-6 w-6 flex-shrink-0" />
              <p className="text-gray-300 text-sm font-medium">Secure, traceable surplus food processing</p>
            </div>
          </div>
        </div>

        {/* Left Side: Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-10 lg:px-14 lg:py-12 border-r border-gray-100 relative">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an account</h2>
            <p className="text-gray-500 font-medium">Enter your details to register as a {formData.role === 'donor' ? 'Sender' : 'Receiver'}.</p>
          </div>

          {/* Elegant Role Toggle */}
          <div className="flex bg-gray-100 p-1.5 rounded-full mb-8 relative shadow-inner max-w-md">
            <button
              type="button"
              onClick={() => handleRoleToggle('donor')}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-full transition-all duration-300 flex justify-center items-center ${
                formData.role === 'donor' 
                  ? 'bg-white text-green-700 shadow-sm ring-1 ring-black/5 transform scale-[1.02]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sender (Donor)
            </button>
            <button
              type="button"
              onClick={() => handleRoleToggle('receiver')}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-full transition-all duration-300 flex justify-center items-center ${
                formData.role === 'receiver' 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text" name="name" required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                    placeholder="John Doe"
                    onChange={handleChange} value={formData.name}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text" name="contactNumber" required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                    placeholder="(555) 123-4567"
                    onChange={handleChange} value={formData.contactNumber}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email" name="email" required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                  placeholder="john@example.com"
                  onChange={handleChange} value={formData.email}
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
                  type="password" name="password" required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                  placeholder="••••••••"
                  onChange={handleChange} value={formData.password}
                />
              </div>
            </div>

            {/* Conditionally rendered based on Receiver role */}
            <div className={`transition-all duration-300 overflow-hidden ${formData.role === 'receiver' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 mt-1">Organization Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text" name="organization"
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 hover:bg-white focus:bg-white transition-colors sm:text-sm font-medium"
                  placeholder="City Food Bank (Optional)"
                  onChange={handleChange} value={formData.organization}
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent shadow shadow-gray-900/20 rounded-xl text-white bg-gray-900 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-base font-bold transition-all transform hover:-translate-y-0.5 mt-8 disabled:opacity-70 disabled:hover:transform-none"
            >
              {loading ? 'Processing...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 font-medium pb-2">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-green-600 hover:text-green-500 transition-colors">
              Log in instead <ArrowRight className="inline w-4 h-4 ml-0.5 align-text-bottom"/>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
