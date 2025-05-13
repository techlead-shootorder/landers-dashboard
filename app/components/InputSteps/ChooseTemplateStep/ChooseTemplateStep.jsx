'use client';

import { useState, useEffect } from "react";

const ChooseTemplateStep = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for template selection
  const [selectedTemplate, setSelectedTemplate] = useState(formData.selectedTemplate || null);
  const [selectedColor, setSelectedColor] = useState(formData.themeColor || "#3B82F6"); // Default blue

  // Template options
  const templates = [
    { id: 1, name: "Theme 1", image: "/api/placeholder/300/200", description: "A clean, minimal design perfect for professional services" },
    { id: 2, name: "Theme 2", image: "/api/placeholder/300/200", description: "Bold and vibrant, ideal for creative businesses" },
    { id: 3, name: "Theme 3", image: "/api/placeholder/300/200", description: "Elegant and sophisticated layout for premium brands" },
  ];

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  // Handle color change
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  // Handle next button click
  const handleNext = () => {
    if (selectedTemplate) {
      // Update parent form data
      updateFormData({
        selectedTemplate,
        themeColor: selectedColor
      });
      // Go to next step
      goToNextStep();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Step Title */}
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Choose Template</h2>
      </div>

      {/* Tip Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-blue-700">
          Tip: Select a template that best represents your brand. You can customize colors and content in the next steps.
        </p>
      </div>

      {/* Template Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`
                relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all
                ${selectedTemplate === template.id 
                  ? 'border-blue-500 shadow-lg transform scale-105' 
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
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Color Theme Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Theme Color</h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            id="themeColor"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-12 h-12 border-0 rounded-md cursor-pointer"
          />
          <div>
            <p className="text-gray-700">Selected Color: <span className="font-medium">{selectedColor}</span></p>
            <p className="text-sm text-gray-500">This color will be used as the primary color throughout your landing page.</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={goToPrevStep}
          className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedTemplate}
          className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
            selectedTemplate
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChooseTemplateStep;