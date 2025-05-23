import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddressCreationModal = ({ isOpen, onClose, onSave, editData = null }) => {
  const [addressData, setAddressData] = useState({
    address: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    google_map_url: ''
  });
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // If editData is provided, populate the form for editing
      if (editData) {
        setAddressData({
          address: editData.address || '',
          city: editData.city || '',
          state: editData.state || '',
          phone: editData.phone || '',
          email: editData.email || '',
          google_map_url: editData.google_map_url || ''
        });
        setIsEditMode(true);
      } else {
        // Reset form for create mode
        setAddressData({
          address: '',
          city: '',
          state: '',
          phone: '',
          email: '',
          google_map_url: ''
        });
        setIsEditMode(false);
      }
    }
  }, [isOpen, editData]);
  
  if (!isOpen && !isAnimating) return null;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    // Basic validation
    if (!addressData.address.trim()) {
      alert('Address is required');
      return;
    }
    if (!addressData.city.trim()) {
      alert('City is required');
      return;
    }
    if (!addressData.state.trim()) {
      alert('State is required');
      return;
    }
    
    onSave(addressData, isEditMode);
    handleCloseWithAnimation();
  };
  
  const handleCloseWithAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  return (
    <div className={`fixed inset-0 flex items-start justify-end z-50 transition-opacity duration-300`}>
      <div className='bg-black absolute top-0 left-0 w-full h-full opacity-70'></div>
      <div className={`bg-white h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium text-gray-800">
            {isEditMode ? 'Edit Address' : 'Create New Address'}
          </h3>
          <button
            onClick={handleCloseWithAnimation}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={addressData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
                rows="3"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={addressData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={addressData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Google Map URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Map URL</label>
              <input
                type="url"
                name="google_map_url"
                value={addressData.google_map_url}
                onChange={handleInputChange}
                placeholder="Enter Google Maps URL"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
          <button
            onClick={handleCloseWithAnimation}
            className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-50 transition-colors duration-200 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 transition-colors duration-200 focus:outline-none"
          >
            {isEditMode ? 'Update Address' : 'Create Address'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCreationModal;