'use client';

import { useState } from "react";
import { InfoIcon } from "lucide-react";

const Services = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    servicesHeading: formData.servicesHeading || "",
    servicesSectionSubHeading: formData.servicesSectionSubHeading || "",
    services: formData.services || {
      dentalImplants: formData.services?.dentalImplants || false,
      fullTeethReplacement: formData.services?.fullTeethReplacement || false,
      dentalBraces: formData.services?.dentalBraces || false,
      toothJewellery: formData.services?.toothJewellery || false
    },
    floorPlanHeading: formData.floorPlanHeading || "",
    floorPlanSummary: formData.floorPlanSummary || ""
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData({
      ...localFormData,
      services: {
        ...localFormData.services,
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Services</h2>
          
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Services Section Heading */}
              <div>
                <label htmlFor="servicesHeading" className="block text-sm font-medium text-gray-700 mb-1">
                  Services Section Heading
                </label>
                <input
                  type="text"
                  id="servicesHeading"
                  name="servicesHeading"
                  value={localFormData.servicesHeading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Eledent - Dental Implants Offer"
                />
              </div>
              
              {/* Services Section Sub Heading */}
              <div>
                <label htmlFor="servicesSectionSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                  Services Section Sub Heading
                </label>
                <input
                  type="text"
                  id="servicesSectionSubHeading"
                  name="servicesSectionSubHeading"
                  value={localFormData.servicesSectionSubHeading}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Eledent - Dental Implants Offer"
                />
              </div>
            </div>
            
            {/* Services Checkboxes */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Services</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dentalImplants"
                    name="dentalImplants"
                    checked={localFormData.services.dentalImplants}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="dentalImplants" className="ml-2 block text-sm text-gray-700">
                    Dental Implants
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="fullTeethReplacement"
                    name="fullTeethReplacement"
                    checked={localFormData.services.fullTeethReplacement}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="fullTeethReplacement" className="ml-2 block text-sm text-gray-700">
                    Full Teeth Replacement
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dentalBraces"
                    name="dentalBraces"
                    checked={localFormData.services.dentalBraces}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="dentalBraces" className="ml-2 block text-sm text-gray-700">
                    Dental Braces
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="toothJewellery"
                    name="toothJewellery"
                    checked={localFormData.services.toothJewellery}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="toothJewellery" className="ml-2 block text-sm text-gray-700">
                    Tooth Jewellery
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floor Plan Section */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-8">Floor Plan</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Floor Plan Heading */}
            <div>
              <label htmlFor="floorPlanHeading" className="block text-sm font-medium text-gray-700 mb-1">
                Fp Heading
              </label>
              <input
                type="text"
                id="floorPlanHeading"
                name="floorPlanHeading"
                value={localFormData.floorPlanHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eledent - Dental Implants Offer"
              />
            </div>
            
            {/* Floor Plan Summary */}
            <div>
              <label htmlFor="floorPlanSummary" className="block text-sm font-medium text-gray-700 mb-1">
                Fp Summary
              </label>
              <input
                type="text"
                id="floorPlanSummary"
                name="floorPlanSummary"
                value={localFormData.floorPlanSummary}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Eledent - Dental Implants Offer"
              />
            </div>
          </div>
          
          {/* FpTab Section */}
          <div className="mt-6 mb-10">
            <p className="text-sm font-medium text-gray-700 mb-3">FpTab</p>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Create New
            </button>
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

export default Services;