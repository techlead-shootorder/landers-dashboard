import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FieldCreationModal = ({ isOpen, onClose, onSave }) => {
  const [fieldData, setFieldData] = useState({
    type: '',
    inputLabel: '',
    inputType: '',
    status: 'active',
    dropdownItems: []
  });
  
  const [newDropdownItem, setNewDropdownItem] = useState('');
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);
  
  if (!isOpen && !isAnimating) return null;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value
    });
  };
  
  const handleAddDropdownItem = () => {
    if (newDropdownItem.trim()) {
      setFieldData({
        ...fieldData,
        dropdownItems: [...fieldData.dropdownItems, newDropdownItem.trim()]
      });
      setNewDropdownItem('');
    }
  };
  
  const handleRemoveDropdownItem = (index) => {
    const updatedItems = [...fieldData.dropdownItems];
    updatedItems.splice(index, 1);
    setFieldData({
      ...fieldData,
      dropdownItems: updatedItems
    });
  };
  
  const handleSave = () => {
    onSave(fieldData);
    setFieldData({
      type: '',
      inputLabel: '',
      inputType: '',
      status: 'active',
      dropdownItems: []
    });
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
      <div className={`bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
          <h3 className="text-lg font-medium text-white">Create New Field</h3>
          <button
            onClick={handleCloseWithAnimation}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <div className="relative">
                <select
                  name="type"
                  value={fieldData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="" disabled>Select an item...</option>
                 <option value="fullname">Full Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="message">Message</option>
                  <option value="date">Date</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Input Label */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Input Label</label>
              <input
                type="text"
                name="inputLabel"
                value={fieldData.inputLabel}
                onChange={handleInputChange}
                placeholder="Enter the title of the label"
                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Input Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Input Type</label>
              <div className="relative">
                <select
                  name="inputType"
                  value={fieldData.inputType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="" disabled>Select an item...</option>
                  <option value="input">Input</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="textarea">Textarea</option>
                 
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    checked={fieldData.status === 'active'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-700 focus:ring-purple-500"
                  />
                  <label htmlFor="active" className="ml-2 text-sm text-gray-300">Active</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    checked={fieldData.status === 'inactive'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-700 focus:ring-purple-500"
                  />
                  <label htmlFor="inactive" className="ml-2 text-sm text-gray-300">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dropdown List - Only show if type is dropdown */}
          {fieldData.type === 'dropdown' && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Dropdown List</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={newDropdownItem}
                  onChange={(e) => setNewDropdownItem(e.target.value)}
                  placeholder="Add dropdown item"
                  className="flex-1 p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-l-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddDropdownItem}
                  className="px-4 py-2 bg-purple-600 text-white font-medium rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-2 bg-[#1A1F2E] border border-gray-700 rounded-md p-2 min-h-20 max-h-40 overflow-y-auto">
                {fieldData.dropdownItems.length === 0 ? (
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    <span className="mr-2">ℹ️</span> No items
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {fieldData.dropdownItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                        <span className="text-white">{item}</span>
                        <button 
                          onClick={() => handleRemoveDropdownItem(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
          <button
            onClick={handleCloseWithAnimation}
            className="mr-3 px-4 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-900 hover:bg-opacity-20 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Create New
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldCreationModal;