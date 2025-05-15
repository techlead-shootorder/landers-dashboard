'use client';

import { useState } from "react";
import { InfoIcon } from "lucide-react";

const ImageUploadStep = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for images
  const [localFormData, setLocalFormData] = useState({
    banner: formData.banner || "",
    mobile_banner: formData.mobile_banner || "",
    background_opacity: formData.background_opacity || 0.4,
    offer_bar: formData.offer_bar || "",
    rating_site: formData.rating_site || "google",
    rating_profile_link: formData.rating_profile_link || ""
  });

  // Rating site options
  const ratingSites = [
    { value: "google", label: "Google" },
    { value: "glassdoor", label: "Glassdoor" },
    { value: "justdial", label: "JustDial" },
    { value: "facebook", label: "Facebook" },
    { value: "yelp", label: "Yelp" }
  ];

  // Handle text input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  // For numeric inputs, convert string to number
  if (name === "background_opacity") {
    setLocalFormData({
      ...localFormData,
      [name]: parseFloat(value)
    });
  } else {
    setLocalFormData({
      ...localFormData,
      [name]: value
    });
  }
};

  // Handle image upload
  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        // Simulate the API call and response for now
        // In real implementation, this would be an actual fetch call
        // For now, just create a random ID to simulate a successful upload
        const randomId = Math.random().toString(36).substring(2, 10);

        // Update the state with the new image ID
        setLocalFormData({
          ...localFormData,
          [field]: randomId
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
      }
    }
  };

  // Handle image removal
  const handleRemoveImage = (field) => {
    setLocalFormData({
      ...localFormData,
      [field]: ""
    });
  };

  // Handle next button click
  const handleNext = () => {
    // Update parent form data
    updateFormData(localFormData);
    // Go to next step
    goToNextStep();
  };

  // Get image preview URL based on image ID
  const getImageUrl = (imageId) => {
    return imageId ? `https://app.shootorder.com/assets/${imageId}` : null;
  };

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Set Up Your Landing Page Images
            </h1>
          </div>

          <div className="flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              High quality images make your landing page more engaging. Use professional photos that represent your brand well and ensure they're optimized for both desktop and mobile viewing.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Images & Offers</h2>

          <div className="space-y-8">
            {/* Desktop Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desktop Banner
              </label>
              <div className="w-full h-48 bg-gray-100 border rounded-md flex items-center justify-center overflow-hidden mb-4">
                {localFormData.banner ? (
                  <div className="relative w-full h-full">
                    <img
                      src={getImageUrl(localFormData.banner)}
                      alt="Desktop Banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/800/400"; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        onClick={() => handleRemoveImage('banner')}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500">No image uploaded</span>
                )}
              </div>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  className="hidden"
                  id="bannerInput"
                />
                <label
                  htmlFor="bannerInput"
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 cursor-pointer transition"
                >
                  Upload Image
                </label>
                {localFormData.banner && (
                  <p className="text-sm text-gray-500 flex items-center">
                    ID: {localFormData.banner}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Banner
              </label>
              <div className="w-full max-w-xs h-64 bg-gray-100 border rounded-md flex items-center justify-center overflow-hidden mb-4">
                {localFormData.mobile_banner ? (
                  <div className="relative w-full h-full">
                    <img
                      src={getImageUrl(localFormData.mobile_banner)}
                      alt="Mobile Banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/400/600"; // Fallback image
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        onClick={() => handleRemoveImage('mobile_banner')}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500">No image uploaded</span>
                )}
              </div>
              <div className="flex gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'mobile_banner')}
                  className="hidden"
                  id="mobileBannerInput"
                />
                <label
                  htmlFor="mobileBannerInput"
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 cursor-pointer transition"
                >
                  Upload Image
                </label>
                {localFormData.mobile_banner && (
                  <p className="text-sm text-gray-500 flex items-center">
                    ID: {localFormData.mobile_banner}
                  </p>
                )}
              </div>
            </div>

            {/* Background Opacity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Opacity
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="background_opacity"
                  name="background_opacity"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localFormData.background_opacity}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <span className="text-sm text-gray-700">
                  {parseFloat(localFormData.background_opacity).toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Adjust the opacity of your banner background
              </p>
            </div>

            {/* Offer Bar Text Input */}
            <div>
              <label htmlFor="offer_bar" className="block text-sm font-medium text-gray-700 mb-1">
                Offer Bar
              </label>
              <input
                type="text"
                id="offer_bar"
                name="offer_bar"
                value={localFormData.offer_bar}
                onChange={handleInputChange}
                placeholder="Enter your special offer text here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will appear as a promotional banner at the top of your page
              </p>
            </div>

            {/* Ratings Section */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Ratings & Reviews</h3>

              {/* Rating Site Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="rating_site">
                  Rating Platform
                </label>
                <select
                  id="rating_site"
                  name="rating_site"
                  value={localFormData.rating_site}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                >
                  {ratingSites.map((site) => (
                    <option key={site.value} value={site.value}>
                      {site.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Profile Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="rating_profile_link">
                  Rating Profile URL
                </label>
                <input
                  type="url"
                  id="rating_profile_link"
                  name="rating_profile_link"
                  value={localFormData.rating_profile_link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Link to your profile on the selected rating platform
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-12 space-x-4">
            <button
              type="button"
              onClick={goToPrevStep}
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

export default ImageUploadStep;