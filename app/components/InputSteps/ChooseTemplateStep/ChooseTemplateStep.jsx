'use client';

import { useState, useRef } from "react";
import { InfoIcon, X, Loader2 } from "lucide-react";
import { LuUpload } from "react-icons/lu";
import { toast } from 'react-hot-toast';

const ChooseTemplateStep = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData }) => {
  console.log("current form data", formData);

  // Refs for file inputs
  const faviconInputRef = useRef(null);
  const logoInputRef = useRef(null);

  // Upload loading states
  const [uploadLoading, setUploadLoading] = useState({
    favicon: false,
    logo: false
  });

  // Validation states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Image preview states
  const [previews, setPreviews] = useState({
    favicon: formData.favicon ? 
      (typeof formData.favicon === 'string' ? 
        `https://app.shootorder.com/assets/${formData.favicon}` : 
        URL.createObjectURL(formData.favicon)) : null,
    logo: formData.logo ? 
      (typeof formData.logo === 'string' ? 
        `https://app.shootorder.com/assets/${formData.logo}` : 
        URL.createObjectURL(formData.logo)) : null,
  });

  // Template options
  const templates = [
    { id: 1, name: "Theme 1", image: "/api/placeholder/300/200", description: "A clean, minimal design perfect for professional services" },
    { id: 2, name: "Theme 2", image: "/api/placeholder/300/200", description: "Bold and vibrant, ideal for creative businesses" },
    { id: 3, name: "Theme 3", image: "/api/placeholder/300/200", description: "Elegant and sophisticated layout for premium brands" },
  ];

  // Validation function
  const validateForm = () => {
    const errors = [];
    
    if (!formData.theme) {
      errors.push('Please select a template theme');
      toast.error('Please select a template theme');
      
    }
    
    if (!formData.logo && !previews.logo) {
      errors.push('Logo is required - please upload your company logo');
      toast.error('Logo is required - please upload your company logo');
    }
    
    if (!formData.favicon && !previews.favicon) {
      errors.push('Favicon is required - please upload your website favicon');
       toast.error('Favicon is required - please upload your website favicon');
    }
    
    return errors;
  };

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    updateFormData({
      ...formData,
      theme: templateId
    });
    
    // Clear error when user makes selection
    if (error) setError('');
  };

  // Handle color change
  const handleColorChange = (e) => {
    updateFormData({
      ...formData,
      theme_color: e.target.value
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

      // Clear error when user uploads required image
      if (error) setError('');
      
      // Success notification could be added here
      console.log(`${fieldName} uploaded successfully`);

    } catch (error) {
      console.error(`Error uploading ${fieldName}:`, error);
      alert(`Failed to upload ${fieldName}. Please try again.`);
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
    if (fieldName === 'favicon') faviconInputRef.current.value = null;
    if (fieldName === 'logo') logoInputRef.current.value = null;

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

  // Handle next button click with validation
  const handleNext = () => {
    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    // If validation passes, proceed to next step
    setSuccess('Template configuration completed successfully!');
    toast.success('Template configuration completed successfully!');
    
    // Small delay to show success message
    setTimeout(() => {
      handleUploadData();
    }, 500);
    
  };

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between fixed h-[88vh] overflow-hidden">
          {/* Empty div for spacing */}
          <div></div>
          
          {/* Centered heading */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Choose Your Template
            </h1>
          </div>

          {/* Tooltip at bottom */}
          <div className="flex items-start">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Tip: Select a template that best represents your brand. You can customize colors and content in the next steps.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 relative overflow-y-auto ml-[33.333333%]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Choose Template</h2>

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

          {/* Template Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Available Templates <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">Select a template for your landing page</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`
                    relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all
                    ${formData.theme == template.id
                      ? 'border-rose-500 shadow-lg transform scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {/* Template Preview Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Template Info */}
                  <div className="p-4 bg-white">
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  </div>

                  {/* Selection Indicator */}
                  {formData.theme == template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {formData.theme && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Template selected: {templates.find(t => t.id === formData.theme)?.name}
              </p>
            )}
          </div>

          {/* Color Theme Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Theme Color</h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                id="theme_color"
                value={formData.theme_color || "#3B82F6"}
                onChange={handleColorChange}
                className="w-12 h-12 border-0 rounded-md cursor-pointer"
              />
              <div>
                <p className="text-gray-700">Selected Color: <span className="font-medium">{formData.theme_color || "#3B82F6"}</span></p>
                <p className="text-sm text-gray-500">This color will be used as the primary color throughout your landing page.</p>
              </div>
            </div>
          </div>

          {/* Image upload section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Upload Brand Assets <span className="text-red-500">*</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">Both logo and favicon are required for your landing page</p>
            <div className="grid grid-cols-2 gap-6">
              {/* Favicon upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon <span className="text-red-500">*</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">Small icon that appears in browser tabs</p>
                <div className="flex flex-col">
                  {previews.favicon ? (
                    <div className="relative mb-2">
                      <img
                        src={previews.favicon}
                        alt="Favicon preview"
                        className="w-32 h-32 object-contain border rounded bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('favicon')}
                        className="absolute -top-2 left-[117] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        disabled={uploadLoading.favicon}
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs text-green-600 mt-2">✓ Favicon uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        onClick={() => faviconInputRef.current.click()}
                        disabled={uploadLoading.favicon}
                        className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 disabled:bg-rose-300 disabled:cursor-not-allowed"
                      >
                        {uploadLoading.favicon ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LuUpload className="font-bold" />
                        )}
                        {uploadLoading.favicon ? 'Uploading...' : 'Upload Favicon'}
                      </button>
                      <p className="text-xs text-red-500">Required: Please upload a favicon</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={faviconInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'favicon')}
                    disabled={uploadLoading.favicon}
                  />
                </div>
              </div>

              {/* Logo upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Logo <span className="text-red-500">*</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">Your company logo for the landing page</p>
                <div className="flex flex-col">
                  {previews.logo ? (
                    <div className="relative mb-2">
                      <img
                        src={previews.logo}
                        alt="Logo preview"
                        className="w-32 h-32 object-contain border rounded bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('logo')}
                        className="absolute -top-2 left-[117] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        disabled={uploadLoading.logo}
                      >
                        <X size={16} />
                      </button>
                      <p className="text-xs text-green-600 mt-2">✓ Logo uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        onClick={() => logoInputRef.current.click()}
                        disabled={uploadLoading.logo}
                        className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 disabled:bg-rose-300 disabled:cursor-not-allowed"
                      >
                        {uploadLoading.logo ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <LuUpload className="font-bold" />
                        )}
                        {uploadLoading.logo ? 'Uploading...' : 'Upload Logo'}
                      </button>
                      <p className="text-xs text-red-500">Required: Please upload your logo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    disabled={uploadLoading.logo}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Validation Summary */}
          {/* <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Completion Status:</h4>
            <div className="space-y-1 text-sm">
              <div className={`flex items-center gap-2 ${formData.theme ? 'text-green-600' : 'text-red-500'}`}>
                <span>{formData.theme ? '✓' : '✗'}</span>
                <span>Template Selected</span>
              </div>
              <div className={`flex items-center gap-2 ${(formData.logo || previews.logo) ? 'text-green-600' : 'text-red-500'}`}>
                <span>{(formData.logo || previews.logo) ? '✓' : '✗'}</span>
                <span>Logo Uploaded</span>
              </div>
              <div className={`flex items-center gap-2 ${(formData.favicon || previews.favicon) ? 'text-green-600' : 'text-red-500'}`}>
                <span>{(formData.favicon || previews.favicon) ? '✓' : '✗'}</span>
                <span>Favicon Uploaded</span>
              </div>
            </div>
          </div> */}

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
          
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

export default ChooseTemplateStep;