'use client';

import { useState, useRef } from "react";
import { InfoIcon, X } from "lucide-react";
import { LuUpload } from "react-icons/lu";

const AboutUs = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    aboutUsHeading: formData.aboutUsHeading || "",
    aboutUsSubHeading: formData.aboutUsSubHeading || "",
    aboutUsContent: formData.aboutUsContent || "",
    embedCode: formData.embedCode || "",
    banner: formData.banner || null,
    mobileBanner: formData.mobileBanner || null,
  });

  const bannerInputRef = useRef(null);
  const mobileBannerInputRef = useRef(null);

  const [previews, setPreviews] = useState({
    banner: formData.banner ? URL.createObjectURL(formData.banner) : null,
    mobileBanner: formData.mobileBanner ? URL.createObjectURL(formData.mobileBanner) : null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Update local form data with file
      setLocalFormData({
        ...localFormData,
        [fieldName]: file,
      });
      
      // Create and store preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews({
        ...previews,
        [fieldName]: previewUrl,
      });
    }
  };

  // Handle removing uploaded images
  const handleRemoveImage = (fieldName) => {
    // Revoke the object URL to avoid memory leaks
    if (previews[fieldName]) {
      URL.revokeObjectURL(previews[fieldName]);
    }
    
    // Reset the file input
    if (fieldName === 'banner') bannerInputRef.current.value = null;
    if (fieldName === 'mobileBanner') mobileBannerInputRef.current.value = null;
    
    // Update states
    setLocalFormData({
      ...localFormData,
      [fieldName]: null,
    });
    
    setPreviews({
      ...previews,
      [fieldName]: null,
    });
  };

  // Handle next button click
  const handleNext = () => {
    // Update parent form data
    updateFormData(localFormData);
    // Go to next step
    goToNextStep();
  };

  // Handle previous button click
  const handlePrevious = () => {
    // Update parent form data
    updateFormData(localFormData);
    // Go to previous step
    goToPrevStep();
  };

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
        <div className="w-2/3 bg-white p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">About Us</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* About Us Heading field */}
            <div className="flex gap-6">
              <div className="w-1/2">
                <label htmlFor="aboutUsHeading" className="block text-sm font-medium text-gray-700 mb-1">
                  About Us Heading
                </label>
                <input
                  type="text"
                  id="aboutUsHeading"
                  name="aboutUsHeading"
                  value={localFormData.aboutUsHeading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="About Us Heading"
                />
              </div>
              
              {/* About Us Sub Heading field */}
              <div className="w-1/2">
                <label htmlFor="aboutUsSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                  About Us Sub Heading
                </label>
                <input
                  type="text"
                  id="aboutUsSubHeading"
                  name="aboutUsSubHeading"
                  value={localFormData.aboutUsSubHeading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="About Us Sub Heading"
                />
              </div>
            </div>
            
            {/* About Us Content field */}
            <div>
              <label htmlFor="aboutUsContent" className="block text-sm font-medium text-gray-700 mb-1">
                About Us Content
              </label>
              <input
                type="text"
                id="aboutUsContent"
                name="aboutUsContent"
                value={localFormData.aboutUsContent}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="enquiry.eledenthosipatals.com"
              />
            </div>
            
            {/* Embed Code field */}
            <div>
              <label htmlFor="embedCode" className="block text-sm font-medium text-gray-700 mb-1">
                Embed Code
              </label>
              <textarea
                id="embedCode"
                name="embedCode"
                value={localFormData.embedCode}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste embed code here"
              />
            </div>
            
            {/* About uploads section */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* About image upload */}
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">About Us</p>
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
                        className="absolute -top-2 right-[35%] bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={() => bannerInputRef.current.click()}
                      className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2"
                    >
                      <LuUpload className="font-bold"/>
                      Upload Document
                    </button>
                  )}
                  <input 
                    type="file"
                    ref={bannerInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'banner')}
                  />
                </div>
              </div>
              
              
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-end mt-12 space-x-4">
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

export default AboutUs;