
'use client';

import { useState } from "react";
import { Info, Upload } from "lucide-react";

const UspGroup = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling - matching the parent component's structure
  const [localFormData, setLocalFormData] = useState({
    sectionHeading: formData.sectionHeading || "",
    subHeading: formData.subHeading || "",
    offerText: formData.offerText || "",
    affordableTreatment: formData.affordableTreatment || true,
    qualifiedDentist: formData.qualifiedDentist || true,
    worldClassInfrastructure: formData.worldClassInfrastructure || true,
    stateOfTheArt: formData.stateOfTheArt || false
  });

  // Handle input changes
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
      [name]: checked
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
  const handlePrev = () => {
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
            <Info className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac orci condimentum, viverra elit vel, gravida lorem. Fusce vel diam nec magna facilisis malesuada
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">USP Group</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* USP Section Heading field */}
            <div>
              <label htmlFor="sectionHeading" className="block text-sm font-medium text-gray-700 mb-1">
                USP Section Heading
              </label>
              <input
                type="text"
                id="sectionHeading"
                name="sectionHeading"
                value={formData.sectionHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="USP Section Heading"
              />
            </div>
            
            {/* USP Section Sub Heading field */}
            <div>
              <label htmlFor="subHeading" className="block text-sm font-medium text-gray-700 mb-1">
                USP Section Sub Heading
              </label>
              <input
                type="text"
                id="subHeading"
                name="subHeading"
                value={formData.subHeading}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="USP Section Sub Heading"
              />
            </div>
          </div>

         

          {/* USP Label */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              USP
            </label>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="affordableTreatment"
                name="affordableTreatment"
                checked={localFormData.affordableTreatment}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="affordableTreatment" className="ml-2 text-sm text-gray-700">
                Affordable Treatment
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="qualifiedDentist"
                name="qualifiedDentist"
                checked={localFormData.qualifiedDentist}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="qualifiedDentist" className="ml-2 text-sm text-gray-700">
                Highly Qualified Dentist
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="worldClassInfrastructure"
                name="worldClassInfrastructure"
                checked={localFormData.worldClassInfrastructure}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="worldClassInfrastructure" className="ml-2 text-sm text-gray-700">
                World-Class Infrastructure
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="stateOfTheArt"
                name="stateOfTheArt"
                checked={localFormData.stateOfTheArt}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="stateOfTheArt" className="ml-2 text-sm text-gray-700">
                State Of-the-Art Technology
              </label>
            </div>
          </div>

          {/* Create Now Button */}
          <div className="mt-6">
            <button
              type="button"
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
            >
              Create New
            </button>
          </div>

          {/* Gallery Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h3>
            
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex items-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
              
              <button
                type="button"
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Add Existing
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-12 space-x-4">
            <button
              type="button"
              onClick={handlePrev}
              className="border border-rose-500 text-rose-500 px-8 py-2 rounded-md font-medium hover:bg-red-50 transition-colors duration-200"
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

export default UspGroup;