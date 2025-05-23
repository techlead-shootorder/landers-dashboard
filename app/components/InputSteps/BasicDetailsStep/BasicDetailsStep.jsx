'use client';

import { useState } from "react";
import { InfoIcon, Loader2, Trash } from "lucide-react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import AddressCreationModal from "./component/AddressCreationModal";

const BasicDetailsStep = ({ formData, updateFormData, goToNextStep }) => {
  // Local state for form handling with updated key names
  const [localFormData, setLocalFormData] = useState({
    name: formData.name || "",
    company_name: formData.company_name || "",
    domain: formData.domain || "",
    slug: formData.slug || "",
    email: formData.email || "",
    phone: formData.phone || "",
    whatsapp_number: formData.whatsapp_number || "",
    address_section_heading: formData.address_section_heading || "",
    address_section_sub_heading: formData.address_section_sub_heading || "",
    addresses: formData.addresses || [],
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Address modal states
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  // ADDRESS MODAL HANDLERS
  const handleOpenAddressModal = (address = null, index = null) => {
    if (address) {
      setEditingAddress({ ...address, index });
    } else {
      setEditingAddress(null);
    }
    setAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setAddressModalOpen(false);
    setEditingAddress(null);
  };

  // ADDRESS SAVE HANDLER
  const handleSaveAddress = (addressData, isEditMode) => {
    const currentAddresses = localFormData.addresses || [];

    if (isEditMode && editingAddress !== null && typeof editingAddress.index === 'number') {
      const updatedAddresses = [...currentAddresses];
      updatedAddresses[editingAddress.index] = addressData;
      setLocalFormData({
        ...localFormData,
        addresses: updatedAddresses
      });
    } else {
      const updatedAddresses = [...currentAddresses, addressData];
      setLocalFormData({
        ...localFormData,
        addresses: updatedAddresses
      });
    }
    handleCloseAddressModal();
  };

  const handleDeleteAddress = (index, event) => {
    event.stopPropagation();
    const currentAddresses = localFormData.addresses || [];
    const updatedAddresses = [...currentAddresses];
    updatedAddresses.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      addresses: updatedAddresses
    });
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];
    
    if (!localFormData.name.trim()) {
      errors.push('Name is required');
    }
    
    if (!localFormData.company_name.trim()) {
      errors.push('Company Name is required');
    }
    
    if (!localFormData.email.trim()) {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(localFormData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  };

  // Handle API call to create landing page
  const createLandingPage = async (formData) => {
    try {
      const response = await fetch('/api/createLandingPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create landing page');
      }
      toast.success('Page created Successfully! Redirecting....')
      return result;
    } catch (error) {
      toast.error('Error in Creating Page')
      throw error;
    }
  };

  // Handle next button click
  const handleNext = async () => {
    // Clear previous messages
    
    setError('');
    setSuccess('');

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsLoading(true);

    try {
      // Call API to create landing page
      const result = await createLandingPage(localFormData);
      
      // Update parent form data with the response data
      const updatedFormData = {
        ...localFormData,
        apiResponse: result.data.data, // Store full API response for later use
      };
      
      updateFormData(updatedFormData);
      
      setSuccess('Landing page created successfully! Redirecting......');

      console.log("resuld response", result.data);
      
      // Small delay to show success message
      setTimeout(() => {
        
         router.push(`/create-page/${result.data.data.id}`);
         
        // goToNextStep();
      }, 1000);

    } catch (error) {
      console.error('Error creating landing page:', error);
      setError(error.message || 'Failed to create landing page. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="relative w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div className="flex items-center h-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 absolute top-[300]">
              Laying the First Brick of Your Funnel
            </h1>
          </div>
          
          <div className="absolute bottom-4 flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac orci condimentum, viverra elit vel, gravida lorem. Fusce vel diam nec magna facilisis malesuada
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 relative overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Details</h2>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={localFormData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Name"
                required
              />
            </div>
            
            {/* Company Name field */}
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={localFormData.company_name}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Company"
                required
              />
            </div>
            
            {/* Domain field */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                Domain
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                value={localFormData.domain}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="https://example.com"
              />
            </div>
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="email@example.com"
                required
              />
            </div>
            
            {/* Phone field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={localFormData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="1234567890"
              />
            </div>
            
            {/* WhatsApp field */}
            <div>
              <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp_number"
                name="whatsapp_number"
                value={localFormData.whatsapp_number}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* ADDRESS SECTION */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Address Section</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Address Section Heading */}
              <div>
                <label htmlFor="address_section_heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Section Heading
                </label>
                <input
                  type="text"
                  id="address_section_heading"
                  name="address_section_heading"
                  value={localFormData.address_section_heading}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Address Heading"
                />
              </div>

              {/* Address Section Sub Heading */}
              <div>
                <label htmlFor="address_section_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Section Sub Heading
                </label>
                <input
                  type="text"
                  id="address_section_sub_heading"
                  name="address_section_sub_heading"
                  value={localFormData.address_section_sub_heading}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Address Sub-Heading"
                />
              </div>
            </div>

            {/* Address list */}
            {(localFormData.addresses || []).length > 0 && (
              <div className="mt-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Created Addresses</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(localFormData.addresses || []).map((address, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => handleOpenAddressModal(address, index)}
                    >
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{address.address}</span>
                        <p className="text-sm text-gray-600">{address.city}, {address.state}</p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteAddress(index, e)}
                        className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Address Button */}
            <div className="mb-6">
              <button
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => handleOpenAddressModal()}
                disabled={isLoading}
              >
                Create Address
              </button>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>

      {/* Address Creation Modal */}
      {addressModalOpen && (
        <AddressCreationModal
          isOpen={addressModalOpen}
          onClose={handleCloseAddressModal}
          onSave={handleSaveAddress}
          editData={editingAddress}
        />
      )}
    </div>
  );
};

export default BasicDetailsStep;