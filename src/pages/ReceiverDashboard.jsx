import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { MapPin, RefreshCw } from 'lucide-react';

const getUploadsBaseUrl = () => {
  const apiBaseUrl = api.defaults.baseURL || '/api';
  return apiBaseUrl.replace(/\/api$/, '');
};

const ReceiverDashboard = () => {
  const [nearbyDonations, setNearbyDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState('');

  const knownIdsRef = useRef(new Set());
  const audioRef = useRef(new Audio('/alert.ogg'));

  // Fetch coordinates (simulating user's device location)
  const fetchNearby = async (isPolling = false) => {
    try {
      if (!isPolling) {
        setLoading(true);
        setError('');
      }
      
      // Simulating a static location in the center of mapping for demo
      const lat = 28.6139;
      const lng = 77.2090;
      
      const { data } = await api.get(`/donations/nearby?lat=${lat}&lng=${lng}&radius=50`);
      
      if (isPolling) {
        const currentIds = data.data.map(d => d._id);
        const hasNew = currentIds.some(id => !knownIdsRef.current.has(id));
        if (hasNew) {
          // Play notification sound continuously for exactly 5 seconds
          try {
            audioRef.current.loop = true;
            audioRef.current.play().catch(e => console.log('Audio autoplay blocked by browser:', e));
            
            // Stop after 5 seconds
            setTimeout(() => {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }, 5000);
          } catch (err) {
            console.log('Audio err', err);
          }
        }
      }
      
      // Update our recognized memory pool so we don't 'ding' for the same objects
      knownIdsRef.current = new Set(data.data.map(d => d._id));
      
      setNearbyDonations(data.data);
    } catch (err) {
      if (!isPolling) {
        const errMsg = err.response?.data?.message || err.message || 'Network error';
        setError('Failed to fetch nearby donations: ' + errMsg);
      }
      console.error(err);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const { data } = await api.get('/donations/claimed');
      setClaimedDonations(data);
    } catch (err) {
      console.error('Failed to fetch claimed history', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchNearby();
    fetchHistory();
    
    // Background polling for real-time notification alerts
    const interval = setInterval(() => {
      fetchNearby(true);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClaim = async (id) => {
    try {
      await api.patch(`/donations/${id}/claim`);
      fetchNearby(); // Refresh list after claim
      fetchHistory(); // Refresh history after claim
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to claim donation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Available Donations Nearby</h1>
        <button
          onClick={() => fetchNearby()}
          className="flex items-center px-4 py-2 bg-green-100 text-green-700 font-medium rounded-md hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Refresh Feed
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {loading ? (
        <p className="text-gray-500">Scanning for food nearby...</p>
      ) : nearbyDonations.length === 0 ? (
        <p className="text-gray-500">No available food donations locally at the moment. Check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyDonations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    {donation.imageUrl && (
                      <div className="mb-4 w-full h-48 overflow-hidden rounded-lg border border-gray-100">
                        <img src={`${getUploadsBaseUrl()}${donation.imageUrl}`} alt="Donation" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {donation.category === 'Food' ? (
                        <>{donation.foodType === 'veg' ? '🟢 Veg' : donation.foodType === 'non-veg' ? '🔴 Non-Veg' : '🟡 Both Mix'} Food</>
                      ) : (
                        `📦 ${donation.category}`
                      )}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-2">Quantity: {donation.quantity}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-2">
                  {donation.description || 'No specific description provided.'}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <span className="truncate">{donation.address}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-500">
                  <p><strong>Donor:</strong> {donation.donorId?.name || 'Unknown'}</p>
                  <p><strong>Contact:</strong> {donation.donorId?.contactNumber || 'N/A'}</p>
                  <p className="mt-1 text-red-500 text-xs">
                    Expires: {new Date(donation.expiryTime).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleClaim(donation._id)}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History Section */}
      <div className="mt-16 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Claimed History</h2>
        {historyLoading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : claimedDonations.length === 0 ? (
          <p className="text-gray-500">You haven't claimed any donations yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food & Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Claimed</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claimedDonations.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category === 'Food' || !item.category ? (
                        <div className="text-sm font-medium text-gray-900 capitalize">{item.foodType} Food</div>
                      ) : (
                        <div className="text-sm font-medium text-gray-900 capitalize">{item.category}</div>
                      )}
                      <div className="text-sm text-gray-500">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.donorId?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{item.donorId?.contactNumber || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{item.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverDashboard;
