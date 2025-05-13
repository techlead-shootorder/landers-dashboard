'use client';

import { useState } from "react";
import BasicDetailsStep from "../components/InputSteps/BasicDetailsStep/BasicDetailsStep";
import ChooseTemplateStep from "../components/InputSteps/ChooseTemplateStep/ChooseTemplateStep";
// Import other step components as you create them
// ...and so on

const CreatePage = () => {
  // Current step tracker
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  
  // Consolidated form data for all steps
  const [formData, setFormData] = useState({
    // Basic Details (Step 1)
    companyName: "",
    funnelName: "",
    domain: "",
    phone: "",
    whatsapp: "",
    email: "",
    // Template Selection (Step 2)
    selectedTemplate: null,
    themeColor: "#3B82F6",
    // Add fields for other steps as you create them
  });

  // Handle form data changes from any step
  const updateFormData = (newData) => {
    setFormData({
      ...formData,
      ...newData
    });
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigate to previous step
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <ChooseTemplateStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
          />
        );
      // Add cases for other steps as you create them
      default:
        return <div>Step {currentStep} not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Same across all steps */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Create Landing Page</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{`${progressPercentage.toFixed(0)}%`}</span>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-blue-500" 
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                    transform: `rotate(${progressPercentage * 3.6}deg)`,
                    transformOrigin: 'center',
                  }}
                ></div>
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium">{`${currentStep}/${totalSteps}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Changes based on current step */}
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Footer - Same across all steps */}
      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Your Landing Page Creator • © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreatePage;