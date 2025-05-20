import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FeaturedGroupCreationModal = ({ isOpen, onClose, onSave, editData = null }) => {
  const [featuredData, setFeaturedData] = useState({
    heading: '',
    content: '',
    icon: '',
    iconUrl: '',
    hasCover: false
  });
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // If editData is provided, populate the form for editing
      if (editData) {
        setFeaturedData(editData);
        setIsEditMode(true);
      } else {
        // Reset form for create mode
        setFeaturedData({
          heading: '',
          content: '',
          icon: '',
          iconUrl: '',
          hasCover: false
        });
        setIsEditMode(false);
      }
    }
  }, [isOpen, editData]);
  
  if (!isOpen && !isAnimating) return null;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeaturedData({
      ...featuredData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSave = () => {
    onSave(featuredData, isEditMode);
    handleCloseWithAnimation();
  };
  
  const handleCloseWithAnimation = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium text-gray-800">
            {isEditMode ? 'Edit Featured Item' : 'Create New Featured Item'}
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
            {/* Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Heading</label>
              <input
                type="text"
                name="heading"
                value={featuredData.heading}
                onChange={handleInputChange}
                placeholder="Enter featured heading"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Content</label>
              <textarea
                name="content"
                value={featuredData.content}
                onChange={handleInputChange}
                placeholder="Enter featured content"
                rows="4"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Icon</label>
              <input
                type="text"
                name="icon"
                value={featuredData.icon}
                onChange={handleInputChange}
                placeholder="Enter icon name"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Icon URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Icon URL</label>
              <input
                type="text"
                name="iconUrl"
                value={featuredData.iconUrl}
                onChange={handleInputChange}
                placeholder="Enter featured icon URL"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Cover Input (Checkbox) */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasCover"
                  checked={featuredData.hasCover}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">Has Cover</span>
              </label>
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
            {isEditMode ? 'Update Featured Item' : 'Create Featured Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGroupCreationModal;