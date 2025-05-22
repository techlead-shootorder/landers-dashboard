import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const UspCreationModal = ({ isOpen, onClose, onSave, editData = null }) => {
  const [uspData, setUspData] = useState({
    usp_heading: '',
    usp_content: '',
    usp_icon: '',
    usp_icon_url: '',
    cover: false
  });
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      
      // If editData is provided, populate the form for editing
      if (editData) {
        setUspData({
          usp_heading: editData.usp_heading || '',
          usp_content: editData.usp_content || '',
          usp_icon: editData.usp_icon || '',
          usp_icon_url: editData.usp_icon_url || '',
          cover: editData.cover || false
        });
        setIsEditMode(true);
      } else {
        // Reset form for create mode
        setUspData({
          usp_heading: '',
          usp_content: '',
          usp_icon: '',
          usp_icon_url: '',
          cover: false
        });
        setIsEditMode(false);
      }
    }
  }, [isOpen, editData]);
  
  if (!isOpen && !isAnimating) return null;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUspData({
      ...uspData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSave = () => {
    onSave(uspData, isEditMode);
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
       <div className=' bg-black absolute top-0 left-0 w-full h-full opacity-70'></div>
      <div className={`bg-white h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-lg font-medium text-gray-800">
            {isEditMode ? 'Edit USP' : 'Create New USP'}
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
            {/* USP Heading */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">USP Heading</label>
              <input
                type="text"
                name="usp_heading"
                value={uspData.usp_heading}
                onChange={handleInputChange}
                placeholder="Enter USP heading"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* USP Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">USP Content</label>
              <textarea
                name="usp_content"
                value={uspData.usp_content}
                onChange={handleInputChange}
                placeholder="Enter USP content"
                rows="4"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* USP Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">USP Icon</label>
              <input
                type="text"
                name="usp_icon"
                value={uspData.usp_icon}
                onChange={handleInputChange}
                placeholder="Enter icon name"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* USP Icon URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">USP Icon URL</label>
              <input
                type="text"
                name="usp_icon_url"
                value={uspData.usp_icon_url}
                onChange={handleInputChange}
                placeholder="Enter USP icon URL"
                className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            {/* Cover Input (Checkbox) */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="cover"
                  checked={uspData.cover}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">Cover USP</span>
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
            {isEditMode ? 'Update USP' : 'Create USP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UspCreationModal;