import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/auth-context';
import { useContext } from 'react';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import Profile from './pages/Profile';

import Footer from './components/common/Footer';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route 
                path="/donor-dashboard" 
                element={
                  <PrivateRoute allowedRoles={['donor']}>
                    <DonorDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/receiver-dashboard" 
                element={
                  <PrivateRoute allowedRoles={['receiver']}>
                    <ReceiverDashboard />
                  </PrivateRoute>
                } 
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute allowedRoles={['donor', 'receiver', 'admin']}>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
