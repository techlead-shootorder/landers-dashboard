'use client';
import { useState, useRef } from "react";
import { InfoIcon, X, Loader2 } from "lucide-react";
import { LuUpload } from "react-icons/lu";
import { toast } from 'react-hot-toast';
import FieldCreationModal from './components/FieldCreationComponents'; // Adjust the path as needed

const HeroSectionStep = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add these state variables near your other useState declarations
  const [currentEditingField, setCurrentEditingField] = useState(null);
  const [editingFieldIndex, setEditingFieldIndex] = useState(-1);

  // Refs for file inputs
  const bannerInputRef = useRef(null);
  const mobileBannerInputRef = useRef(null);

  // Upload loading states
  const [uploadLoading, setUploadLoading] = useState({
    banner: false,
    mobile_banner: false
  });

  // Image preview states
  const [previews, setPreviews] = useState({
    banner: formData.banner ? 
      (typeof formData.banner === 'string' ? 
        `https://app.shootorder.com/assets/${formData.banner}` : 
        URL.createObjectURL(formData.banner)) : null,
    mobile_banner: formData.mobile_banner ? 
      (typeof formData.mobile_banner === 'string' ? 
        `https://app.shootorder.com/assets/${formData.mobile_banner}` : 
        URL.createObjectURL(formData.mobile_banner)) : null,
  });

  // Validation function
  const validateForm = () => {
    const errors = [];
    
    // Hero Section Validation
    if (!formData.heading || formData.heading.trim() === '') {
      errors.push('Heading is required');
      toast.error('Heading is required');
    }
    
    if (!formData.logo_link || formData.logo_link.trim() === '') {
      errors.push('Logo Link is required');
      toast.error('Logo Link is required');
    }
    
    if (!formData.bar_offer || formData.bar_offer.trim() === '') {
      errors.push('Bar Offer is required');
      toast.error('Bar Offer is required');
    }
    
    if (!formData.rating_profile_link || formData.rating_profile_link.trim() === '') {
      errors.push('Rating Profile Link is required');
      toast.error('Rating Profile Link is required');
    }
    
    if (!formData.rating_site || formData.rating_site.trim() === '') {
      errors.push('Rating Site is required');
      toast.error('Rating Site is required');
    }
    
    // Form Section Validation
    const formType = formData.form_type || "default";
    
    if (formType === "custom") {
      const customFields = formData.custom || [];
      if (customFields.length < 3) {
        errors.push('At least 3 custom fields are required for custom form type');
        toast.error('At least 3 custom fields are required for custom form type');
      }
    }
    
    if (!formData.form_heading || formData.form_heading.trim() === '') {
      errors.push('Form Heading is required');
      toast.error('Form Heading is required');
    }
    
    if (!formData.thank_you_heading || formData.thank_you_heading.trim() === '') {
      errors.push('Thank you Heading is required');
      toast.error('Thank you Heading is required');
    }
    
    if (!formData.thank_you_description || formData.thank_you_description.trim() === '') {
      errors.push('Thank you Description is required');
      toast.error('Thank you Description is required');
    }
    
    if (!formData.banner && !previews.banner) {
      errors.push('Banner image is required - please upload a banner');
      toast.error('Banner image is required - please upload a banner');
    }
    
    if (!formData.mobile_banner && !previews.mobile_banner) {
      errors.push('Mobile Banner image is required - please upload a mobile banner');
      toast.error('Mobile Banner image is required - please upload a mobile banner');
    }
    
    return errors;
  };

  // Update your handleOpenModal function to reset editing state
  const handleOpenModal = () => {
    setCurrentEditingField(null);
    setEditingFieldIndex(-1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add this new function to handle editing
  const handleEditField = (field, index) => {
    // Format dropdown_list items to simple array for the modal
    let editField = { ...field };
    if (field.dropdown_list && field.dropdown_list.length > 0) {
      editField.dropdownItems = field.dropdown_list.map(item => item.item_name);
    }

    // Convert field Type to lowercase for the form select element
    if (editField.Type === 'Full Name') editField.Type = 'fullname';
    else if (editField.Type === 'Email') editField.Type = 'email';
    else if (editField.Type === 'Phone') editField.Type = 'phone';
    else if (editField.Type === 'Message') editField.Type = 'message';
    else if (editField.Type === 'Service') editField.Type = 'service';
    else if (editField.Type === 'Product') editField.Type = 'product';
    else if (editField.Type === 'Consent') editField.Type = 'consent';

    setCurrentEditingField(editField);
    setEditingFieldIndex(index);
    setIsModalOpen(true);
  };

  // Modify handleSaveField to handle both new and edited fields
  const handleSaveField = (fieldData) => {
    const currentCustom = formData.custom || [];

    // If editing an existing field
    if (editingFieldIndex >= 0) {
      const updatedCustomFields = [...currentCustom];
      updatedCustomFields[editingFieldIndex] = fieldData;

      updateFormData({
        ...formData,
        custom: updatedCustomFields
      });
    }
    // If adding a new field
    else {
      updateFormData({
        ...formData,
        custom: [...currentCustom, fieldData]
      });
    }

    setIsModalOpen(false);
    setCurrentEditingField(null);
    setEditingFieldIndex(-1);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle radio changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle range input changes
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  // Handle image upload
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(prev => ({
      ...prev,
      [fieldName]: true
    }));

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      console.log(`Upload ${fieldName} result:`, result);

      // Update form data with the image ID
      updateFormData({
        ...formData,
        [fieldName]: result?.data?.id,
      });

      // Set preview URL
      setPreviews(prev => ({
        ...prev,
        [fieldName]: `https://app.shootorder.com/assets/${result?.data?.id}`,
      }));

      // Success notification
      toast.success(`${fieldName === 'banner' ? 'Banner' : 'Mobile Banner'} uploaded successfully`);

    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
      toast.error(`Failed to upload ${fieldName === 'banner' ? 'Banner' : 'Mobile Banner'}. Please try again.`);
    } finally {
      setUploadLoading(prev => ({
        ...prev,
        [fieldName]: false
      }));
    }
  };

  // Handle removing uploaded images
  const handleRemoveImage = (fieldName) => {
    // Revoke the object URL to avoid memory leaks (only if it's a blob URL)
    if (previews[fieldName] && previews[fieldName].startsWith('blob:')) {
      URL.revokeObjectURL(previews[fieldName]);
    }

    // Reset the file input
    if (fieldName === 'banner') bannerInputRef.current.value = null;
    if (fieldName === 'mobile_banner') mobileBannerInputRef.current.value = null;

    // Update states
    updateFormData({
      ...formData,
      [fieldName]: null,
    });

    setPreviews({
      ...previews,
      [fieldName]: null,
    });
  };

  // Handle removing custom field 
  const handleRemoveCustomField = (index) => {
    const currentCustom = formData.custom || [];
    const updatedCustomFields = [...currentCustom];
    updatedCustomFields.splice(index, 1);
    updateFormData({
      ...formData,
      custom: updatedCustomFields
    });
  };

  // Handle next button click with validation
  const handleNext = () => {
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      // Errors are already shown via toast in validateForm function
      return;
    }

    // If validation passes, show success and proceed
    toast.success('Hero section configuration completed successfully!');
    
    // Small delay to show success message
    setTimeout(() => {
      handleUploadData();
    }, 500);
  };

  // Handle previous button click
  const handlePrevious = () => {
    // Go to previous step
    goToPrevStep();
  };

  // Options for rating site dropdown
  const ratingSiteOptions = ["Google", "Just Dial", "Facebook", "Glassdoor", "Fiverr"];

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="relative w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div className="flex items-center h-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
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
        <div className="w-2/3 bg-white p-12 overflow-y-auto relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Hero Section</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Heading field */}
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={formData.heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Catchy main headline"
              />
            </div>

            {/* Sub Heading field */}
            <div>
              <label htmlFor="sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                Sub Heading
              </label>
              <input
                type="text"
                id="sub_heading"
                name="sub_heading"
                value={formData.sub_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Supportive subtext here"
              />
            </div>

            {/* Logo Link field */}
            <div>
              <label htmlFor="logo_link" className="block text-sm font-medium text-gray-700 mb-1">
                Logo Link <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="logo_link"
                name="logo_link"
                value={formData.logo_link || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste home page URL"
              />
            </div>

            {/* Bar Offer field */}
            <div>
              <label htmlFor="bar_offer" className="block text-sm font-medium text-gray-700 mb-1">
                Bar Offer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bar_offer"
                name="bar_offer"
                value={formData.bar_offer || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short offer"
              />
            </div>

            {/* Rating Profile Link field */}
            <div>
              <label htmlFor="rating_profile_link" className="block text-sm font-medium text-gray-700 mb-1">
                Rating Profile Link <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rating_profile_link"
                name="rating_profile_link"
                value={formData.rating_profile_link || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add rating link"
              />
            </div>

            {/* Rating Site dropdown */}
            <div>
              <label htmlFor="rating_site" className="block text-sm font-medium text-gray-700 mb-1">
                Rating Site <span className="text-red-500">*</span>
              </label>
              <select
                id="rating_site"
                name="rating_site"
                value={formData.rating_site || "Google"}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {ratingSiteOptions.map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Range inputs */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            {/* Background Opacity slider */}
            <div>
              <label htmlFor="background_opacity" className="block text-sm font-medium text-gray-700 mb-1">
                Background Opacity
              </label>
              <div className="flex gap-2 items-center">
              <input
                type="range"
                id="background_opacity"
                name="background_opacity"
                min="0"
                max="1"
                step="0.1"
                value={formData.background_opacity || 0.3}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-md text-gray-700 ">{formData.background_opacity}</span>
              </div>
            </div>

            {/* Rating slider */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
               <div className="flex gap-2 items-center">
              <input
                type="range"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.5"
                value={formData.rating || 4}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
               <span className="text-md text-gray-700 ">{formData.rating}</span>
               </div>
            </div>
          </div>

          {/* HERO FORM SECTION */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Hero Form</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/*Grid 1  */}
              <div className="flex flex-col gap-6">
                {/* Form Type radio group */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Form Type
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="form_type"
                        value="default"
                        checked={(formData.form_type || "default") === "default"}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Default</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="form_type"
                        value="custom"
                        checked={(formData.form_type || "default") === "custom"}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Custom</span>
                    </label>
                  </div>
                </div>

                {/* Form Heading field */}
                <div>
                  <label htmlFor="form_heading" className="block text-sm font-medium text-gray-700 mb-1">
                    Form Heading <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="form_heading"
                    name="form_heading"
                    value={formData.form_heading || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Eledent - Dental Implants Offer"
                  />
                </div>

                {/* Form Sub Heading field */}
                <div>
                  <label htmlFor="form_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                    Form Sub Heading
                  </label>
                  <input
                    type="text"
                    id="form_sub_heading"
                    name="form_sub_heading"
                    value={formData.form_sub_heading || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="enquiry.eledenthospitals.com"
                  />
                </div>

                {/* Thank you Heading field */}
                <div>
                  <label htmlFor="thank_you_heading" className="block text-sm font-medium text-gray-700 mb-1">
                    Thank you Heading <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="thank_you_heading"
                    name="thank_you_heading"
                    value={formData.thank_you_heading || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="dental-implants-offers"
                  />
                </div>

                {/* Thank you Description field */}
                <div className="col-span-1">
                  <label htmlFor="thank_you_description" className="block text-sm font-medium text-gray-700 mb-1">
                    Thank you Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="thank_you_description"
                    name="thank_you_description"
                    value={formData.thank_you_description || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="enquiry.eledenthospitals.com"
                  />
                </div>
                
              </div>

              {/* Grid 2 Create Fields - Only show if form type is custom */}
              <div>
                {(formData.form_type || "default") === "custom" && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Fields <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-gray-500 mb-2">At least 3 custom fields are required</p>
                    </div>
                    <button
                      onClick={handleOpenModal}
                      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      Create Field
                    </button>

                    {/* Display the fields that have been created */}
                    {formData.custom && formData.custom.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                          Created Fields ({formData.custom.length}/3 minimum)
                        </h3>
                        <div className="space-y-2">
                          {formData.custom.map((field, index) => (
                            <div
                              key={index}
                              className="p-2 bg-gray-100 rounded border border-gray-300 flex justify-between items-center cursor-pointer"
                              onClick={() => handleEditField(field, index)}
                            >
                              <div>
                                <p className="font-medium">{field.input_label || field.Type}</p>
                                <p className="text-xs text-gray-500">
                                  Type: {field.Type},
                                  Input Type: {field.input_type || "Input"},
                                  Status: {field.status}
                                </p>
                                {field.dropdown_list && field.dropdown_list.length > 0 && (
                                  <div className="mt-1">
                                    <p className="text-xs text-gray-500">Options: {field.dropdown_list.map(item => item.item_name).join(', ')}</p>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveCustomField(index);
                                }}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                        {formData.custom.length < 3 && (
                          <p className="text-xs text-red-500 mt-2">
                            ⚠ You need {3 - formData.custom.length} more field(s) to meet the minimum requirement
                          </p>
                        )}
                        {formData.custom.length >= 3 && (
                          <p className="text-xs text-green-600 mt-2">
                            ✓ Minimum custom fields requirement met
                          </p>
                        )}
                      </div>
                    )}

                    {(!formData.custom || formData.custom.length === 0) && (
                      <p className="text-xs text-red-500 mt-2">
                        Required: Please create at least 3 custom fields
                      </p>
                    )}

                    {/* Add the modal component */}
                    <FieldCreationModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      onSave={handleSaveField}
                      editingField={currentEditingField}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image upload section */}
          <div className="mt-10 grid grid-cols-4 gap-4 mb-10">
            {/* Banner upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Banner <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col">
                {previews.banner ? (
                  <div className="relative mb-2">
                    <img
                      src={previews.banner}
                      alt="Banner preview"
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('banner')}
                      className="absolute -top-2 left-[117] bg-red-500 text-white rounded-full p-1"
                      disabled={uploadLoading.banner}
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-green-600 mt-2">✓ Banner uploaded successfully</p>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current.click()}
                      disabled={uploadLoading.banner}
                      className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 disabled:bg-rose-300 disabled:cursor-not-allowed"
                    >
                      {uploadLoading.banner ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LuUpload className="font-bold" />
                      )}
                      {uploadLoading.banner ? 'Uploading...' : 'Upload'}
                    </button>
                    <p className="text-xs text-red-500">Required: Please upload a banner</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={bannerInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  disabled={uploadLoading.banner}
                />
              </div>
            </div>

            {/* Mobile Banner upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Banner <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-col">
                {previews.mobile_banner ? (
                  <div className="relative mb-2">
                    <img
                      src={previews.mobile_banner}
                      alt="Mobile Banner preview"
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('mobile_banner')}
                      className="absolute -top-2 left-[117] bg-red-500 text-white rounded-full p-1"
                      disabled={uploadLoading.mobile_banner}
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-green-600 mt-2">✓ Mobile Banner uploaded successfully</p>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => mobileBannerInputRef.current.click()}
                      disabled={uploadLoading.mobile_banner}
                      className="flex items-center gap-2 text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 w-fit disabled:bg-rose-300 disabled:cursor-not-allowed"
                    >
                      {uploadLoading.mobile_banner ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LuUpload className="font-bold" />
                      )}
                      {uploadLoading.mobile_banner ? 'Uploading...' : 'Upload'}
                    </button>
                    <p className="text-xs text-red-500">Required: Please upload a mobile banner</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={mobileBannerInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'mobile_banner')}
                  disabled={uploadLoading.mobile_banner}
                />
              </div>
            </div>
          </div>

           {/* Navigation Buttons */}
          <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="border border-rose-500 text-rose-500 px-8 py-2 rounded-md font-medium hover:bg-rose-50 transition-colors duration-200"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionStep;