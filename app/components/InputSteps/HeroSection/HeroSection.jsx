'use client';

import { useState, useRef } from "react";
import { InfoIcon, X } from "lucide-react";
import { LuUpload } from "react-icons/lu";

const HeroSectionStep = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    heading: formData.heading || "",
    subHeading: formData.subHeading || "",
    logoLink: formData.logoLink || "",
    barOffer: formData.barOffer || "",
    ratingProfileLink: formData.ratingProfileLink || "",
    themeColor: formData.themeColor || "#E33C0C",
    backgroundOpacity: formData.backgroundOpacity || 0.3,
    rating: formData.rating || 4,
    ratingSite: formData.ratingSite || "Google",
    favicon: formData.favicon || null,
    logo: formData.logo || null,
    banner: formData.banner || null,
    mobileBanner: formData.mobileBanner || null,
  });

  // Refs for file inputs
  const faviconInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const mobileBannerInputRef = useRef(null);

  // Image preview states
  const [previews, setPreviews] = useState({
    favicon: formData.favicon ? URL.createObjectURL(formData.favicon) : null,
    logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
    banner: formData.banner ? URL.createObjectURL(formData.banner) : null,
    mobileBanner: formData.mobileBanner ? URL.createObjectURL(formData.mobileBanner) : null,
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  // Handle range input changes
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: parseFloat(value),
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
    if (fieldName === 'favicon') faviconInputRef.current.value = null;
    if (fieldName === 'logo') logoInputRef.current.value = null;
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
    // Update parent form data before going back
    updateFormData(localFormData);
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
        <div className="w-2/3 bg-white p-12 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Hero Section</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Heading field */}
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                value={localFormData.heading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Catchy main headline"
              />
            </div>
            
            {/* Sub Heading field */}
            <div>
              <label htmlFor="subHeading" className="block text-sm font-medium text-gray-700 mb-1">
                Sub Heading
              </label>
              <input
                type="text"
                id="subHeading"
                name="subHeading"
                value={localFormData.subHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Supportive subtext here"
              />
            </div>
            
            {/* Logo Link field */}
            <div>
              <label htmlFor="logoLink" className="block text-sm font-medium text-gray-700 mb-1">
                Logo Link
              </label>
              <input
                type="text"
                id="logoLink"
                name="logoLink"
                value={localFormData.logoLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste home page URL"
              />
            </div>
            
            {/* Bar Offer field */}
            <div>
              <label htmlFor="barOffer" className="block text-sm font-medium text-gray-700 mb-1">
                Bar Offer
              </label>
              <input
                type="text"
                id="barOffer"
                name="barOffer"
                value={localFormData.barOffer}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short offer"
              />
            </div>
            
            {/* Rating Profile Link field */}
            <div>
              <label htmlFor="ratingProfileLink" className="block text-sm font-medium text-gray-700 mb-1">
                Rating Profile Link
              </label>
              <input
                type="text"
                id="ratingProfileLink"
                name="ratingProfileLink"
                value={localFormData.ratingProfileLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add rating link"
              />
            </div>
            
            {/* Theme Color field */}
            <div>
              <label htmlFor="themeColor" className="block text-sm font-medium text-gray-700 mb-1">
                Theme color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  id="themeColor"
                  name="themeColor"
                  value={localFormData.themeColor}
                  onChange={handleInputChange}
                  className="h-10 w-12 border-0 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={localFormData.themeColor.toUpperCase()}
                  onChange={handleInputChange}
                  name="themeColor"
                  className="ml-2 flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Range inputs */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            {/* Background Opacity slider */}
            <div>
              <label htmlFor="backgroundOpacity" className="block text-sm font-medium text-gray-700 mb-1">
                Background Opacity
              </label>
              <input
                type="range"
                id="backgroundOpacity"
                name="backgroundOpacity"
                min="0"
                max="1"
                step="0.1"
                value={localFormData.backgroundOpacity}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Rating slider */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="range"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.5"
                value={localFormData.rating}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Rating Site dropdown */}
          <div className="mt-6">
            <label htmlFor="ratingSite" className="block text-sm font-medium text-gray-700 mb-1">
              Rating Site
            </label>
            <select
              id="ratingSite"
              name="ratingSite"
              value={localFormData.ratingSite}
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

          {/* Image upload section */}
          <div className="mt-10 grid grid-cols-4 gap-4">
            {/* Favicon upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Favicon</p>
              <div className="flex flex-col">
                {previews.favicon ? (
                  <div className="relative mb-2">
                    <img 
                      src={previews.favicon} 
                      alt="Favicon preview" 
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button 
                      onClick={() => handleRemoveImage('favicon')}
                      className="absolute -top-2 right-[35%] bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => faviconInputRef.current.click()}
                    className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2"
                  >
                    <LuUpload className="font-bold"/>
                    Upload Document
                  </button>
                )}
                <input 
                  type="file"
                  ref={faviconInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'favicon')}
                />
              </div>
            </div>

            {/* Logo upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Logo</p>
              <div className="flex flex-col">
                {previews.logo ? (
                  <div className="relative mb-2">
                    <img 
                      src={previews.logo} 
                      alt="Logo preview" 
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button 
                      onClick={() => handleRemoveImage('logo')}
                      className="absolute -top-2 right-[35%] bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => logoInputRef.current.click()}
                    className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2"
                  >
                    <LuUpload className="font-bold"/>
                    Upload Document
                  </button>
                )}
                <input 
                  type="file"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logo')}
                />
              </div>
            </div>
            
            {/* Banner upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Banner</p>
              <div className="flex flex-col">
                {previews.banner ? (
                  <div className="relative mb-2">
                    <img 
                      src={previews.banner} 
                      alt="Banner preview" 
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button 
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
            
            {/* Mobile Banner upload */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Mobile Banner</p>
              <div className="flex flex-col">
                {previews.mobileBanner ? (
                  <div className="relative mb-2">
                    <img 
                      src={previews.mobileBanner} 
                      alt="Mobile Banner preview" 
                      className="w-32 h-32 object-contain border rounded"
                    />
                    <button 
                      onClick={() => handleRemoveImage('mobileBanner')}
                      className="absolute -top-2 right-[35%] bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => mobileBannerInputRef.current.click()}
                    className="flex items-center gap-2 text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 w-fit"
                  >
                    <LuUpload className="font-bold"/>
                    Upload Document
                  </button>
                )}
                <input 
                  type="file"
                  ref={mobileBannerInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'mobileBanner')}
                />
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

export default HeroSectionStep;