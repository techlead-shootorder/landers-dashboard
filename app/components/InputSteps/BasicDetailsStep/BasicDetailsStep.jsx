'use client';

import { useState } from "react";

const BasicDetailsStep = ({ formData, updateFormData, goToNextStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    companyName: formData.companyName || "",
    funnelName: formData.funnelName || "",
    domain: formData.domain || "",
    phone: formData.phone || "",
    whatsapp: formData.whatsapp || "",
    email: formData.email || "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
  };

  // Handle next button click
  const handleNext = () => {
    // Update parent form data
    updateFormData(localFormData);
    // Go to next step
    goToNextStep();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Step Title */}
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Basic Details</h2>
      </div>

      {/* Tip Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-blue-700">
          Tip: Filling out these details accurately will help create a more effective landing page for your business.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        {/* Basic Group */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={localFormData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="funnelName" className="block text-sm font-medium text-gray-700 mb-1">
                Funnel Name
              </label>
              <input
                type="text"
                id="funnelName"
                name="funnelName"
                value={localFormData.funnelName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
              Domain
            </label>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://
              </span>
              <input
                type="text"
                id="domain"
                name="domain"
                value={localFormData.domain}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="yourdomain.com"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              (Slug will be created automatically if funnel name is entered)
            </p>
          </div>
        </div>

        {/* Contact Group */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={localFormData.whatsapp}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <div>
            {/* No Prev button on first step */}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsStep;