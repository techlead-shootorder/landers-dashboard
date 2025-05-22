'use client';

import { InfoIcon, X } from "lucide-react";

const ChooseTemplateStep = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  console.log("current form data", formData);

  // Template options
  const templates = [
    { id: 1, name: "Theme 1", image: "/api/placeholder/300/200", description: "A clean, minimal design perfect for professional services" },
    { id: 2, name: "Theme 2", image: "/api/placeholder/300/200", description: "Bold and vibrant, ideal for creative businesses" },
    { id: 3, name: "Theme 3", image: "/api/placeholder/300/200", description: "Elegant and sophisticated layout for premium brands" },
  ];

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    updateFormData({
      ...formData,
      theme: templateId
    });
  };

  // Handle color change
  const handleColorChange = (e) => {
    updateFormData({
      ...formData,
      theme_color: e.target.value
    });
  };

  // Handle next button click
  const handleNext = () => {
 
    if (formData.theme) {
    //   // Go to next step
      goToNextStep();
    }
  };

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Template
            </h1>
          </div>

          <div className="flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Tip: Select a template that best represents your brand. You can customize colors and content in the next steps.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Choose Template</h2>

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
                    ${formData.theme === template.id
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
                  {formData.theme === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
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

          {/* Navigation Buttons */}
           {/* <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
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
              disabled={!formData.theme}
              className={`px-8 py-2 rounded-md font-medium transition-colors duration-200 ${formData.theme
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplateStep;