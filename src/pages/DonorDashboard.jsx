import { useState, useEffect } from 'react';
import api from '../services/api';

const DonorDashboard = () => {
  const getInitialExpiry = () => {
    const d = new Date();
    d.setHours(d.getHours() + 4); // Default to 4 hours from now
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    category: 'Food',
    foodType: 'veg',
    quantity: '',
    description: '',
    address: '',
    expiryTime: getInitialExpiry(),
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDonations = async () => {
    try {
      const { data } = await api.get('/donations/my-donations');
      setDonations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const openGoogleMapsPicker = () => {
    const query = formData.address.trim() || 'India';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('category', formData.category);
      if (formData.category === 'Food') {
        data.append('foodType', formData.foodType);
      }
      data.append('quantity', formData.quantity);
      data.append('description', formData.description);
      data.append('address', formData.address);
      data.append('expiryTime', formData.expiryTime);
      data.append('longitude', 77.2090 + (Math.random() * 0.1));
      data.append('latitude', 28.6139 + (Math.random() * 0.1));
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      await api.post('/donations', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFormData({
        category: 'Food',
        foodType: 'veg',
        quantity: '',
        description: '',
        address: '',
        expiryTime: getInitialExpiry(),
      });
      setImageFile(null);
      // Reset file input if needed via ref (skipping for simplicity, user form naturally clears but file input doesn't always, we'll reset state though)
      document.getElementById('imageUpload').value = '';
      
      fetchDonations();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add Food Donation</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Donation Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
                >
                  <option value="Food">Food</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Money">Money</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.category === 'Food' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Food Type</label>
                  <select
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 50 servings, 10 kg"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                  <button
                    type="button"
                    onClick={openGoogleMapsPicker}
                    className="text-xs font-medium text-green-700 hover:text-green-800 underline"
                  >
                    Open Google Maps
                  </button>
                </div>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Paste Google Maps location, landmark, or enter your full address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  You can freely enter your own address, landmark, or paste a location copied from Google Maps.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Time</label>
                <input
                  type="datetime-local"
                  name="expiryTime"
                  required
                  value={formData.expiryTime}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Photo (Optional)</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? 'Submitting...' : 'Post Donation'}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">My Donations</h2>
            
            {donations.length === 0 ? (
              <p className="text-gray-500">You haven't posted any donations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Posted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donations.map((donation) => (
                      <tr key={donation._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {donation.category === 'Food' ? (
                            <div className="text-sm font-medium text-gray-900 capitalize">{donation.foodType} Food</div>
                          ) : (
                            <div className="text-sm font-medium text-gray-900 capitalize">{donation.category}</div>
                          )}
                          <div className="text-sm text-gray-500">{donation.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === 'available' ? 'bg-green-100 text-green-800' :
                            donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(donation.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                          {new Date(donation.expiryTime).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
