'use client';

import { useState } from "react";
import { InfoIcon } from "lucide-react";

const HeroForm = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    userAccessToken: formData.userAccessToken || "",
    formHeading: formData.formHeading || "",
    formSubHeading: formData.formSubHeading || "",
    thankYouHeading: formData.thankYouHeading || "",
    thankYouDescription: formData.thankYouDescription || "",
    formType: formData.formType || "default",
    customFields: formData.customFields || {
      email: true,
      phone: true,
      location: false
    },
    highlights: formData.highlights || {
      option1: true,
      option2: true,
      option3: false
    }
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  // Handle radio changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  // Handle checkbox changes for custom fields
  const handleCustomFieldChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData({
      ...localFormData,
      customFields: {
        ...localFormData.customFields,
        [name]: checked
      }
    });
  };

  // Handle checkbox changes for highlights 
  const handleHighlightChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData({
      ...localFormData,
      highlights: {
        ...localFormData.highlights,
        [name]: checked
      }
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
        <div className="w-2/3 bg-white p-12 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Hero Form</h2>
            {/* <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-sm font-medium text-blue-600">2/10</span>
              <div className="ml-2 w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
            </div> */}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* User Access Token field */}
            <div>
              <label htmlFor="userAccessToken" className="block text-sm font-medium text-gray-700 mb-1">
                User Access Token
              </label>
              <input
                type="text"
                id="userAccessToken"
                name="userAccessToken"
                value={localFormData.userAccessToken}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eledent - Dental Implants Offer"
              />
            </div>
            
            {/* Form Heading field */}
            <div>
              <label htmlFor="formHeading" className="block text-sm font-medium text-gray-700 mb-1">
                Form Heading
              </label>
              <input
                type="text"
                id="formHeading"
                name="formHeading"
                value={localFormData.formHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eledent - Dental Implants Offer"
              />
            </div>
            
            {/* Form Sub Heading field */}
            <div>
              <label htmlFor="formSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                Form Sub Heading
              </label>
              <input
                type="text"
                id="formSubHeading"
                name="formSubHeading"
                value={localFormData.formSubHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="enquiry.eledenthospitals.com"
              />
            </div>
            
            {/* Thank you Heading field */}
            <div>
              <label htmlFor="thankYouHeading" className="block text-sm font-medium text-gray-700 mb-1">
                Thank you Heading
              </label>
              <input
                type="text"
                id="thankYouHeading"
                name="thankYouHeading"
                value={localFormData.thankYouHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="dental-implants-offers"
              />
            </div>
            
            {/* Thank you Description field */}
            <div className="col-span-1">
              <label htmlFor="thankYouDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Thank you Description
              </label>
              <input
                type="text"
                id="thankYouDescription"
                name="thankYouDescription"
                value={localFormData.thankYouDescription}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="enquiry.eledenthospitals.com"
              />
            </div>
            
            {/* Form Type radio group */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Form Type
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="formType"
                    value="default"
                    checked={localFormData.formType === "default"}
                    onChange={handleRadioChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Default</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="formType"
                    value="custom"
                    checked={localFormData.formType === "custom"}
                    onChange={handleRadioChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Custom</span>
                </label>
              </div>
            </div>

            {/* Custom fields checkboxes */}
            <div className="col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Custom
              </label>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="email"
                    checked={localFormData.customFields.email}
                    onChange={handleCustomFieldChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="phone"
                    checked={localFormData.customFields.phone}
                    onChange={handleCustomFieldChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Phone</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="location"
                    checked={localFormData.customFields.location}
                    onChange={handleCustomFieldChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Location</span>
                </label>
              </div>
            </div>

            {/* Highlights */}
            <div className="col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Highlights
              </label>
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="option1"
                    checked={localFormData.highlights.option1}
                    onChange={handleHighlightChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">$</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="option2"
                    checked={localFormData.highlights.option2}
                    onChange={handleHighlightChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">2500</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="option3"
                    checked={localFormData.highlights.option3}
                    onChange={handleHighlightChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">2222222</span>
                </label>
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

export default HeroForm;