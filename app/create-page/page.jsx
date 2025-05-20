'use client';

import { useState, useEffect, useRef } from "react";
import BasicDetailsStep from "../components/InputSteps/BasicDetailsStep/BasicDetailsStep";
import ChooseTemplateStep from "../components/InputSteps/ChooseTemplateStep/ChooseTemplateStep";
import HeroBasicDetailsStep from "../components/InputSteps/HeroSection/HeroBasicDetailsStep"
import HeroSectionStep from "../components/InputSteps/HeroSection/HeroSection";
import HeroForm from "../components/InputSteps/HeroSection/HeroForm";
import AboutUs from "../components/InputSteps/AboutUs/AboutUs";
import Services from "../components/InputSteps/Services/Services";
import UspGroup from "../components/InputSteps/UspGroup/UspGroup";
import TimelineStep from "../components/InputSteps/Timeline/TimelineStep";
import TestimonialsCTA from "../components/InputSteps/Testimonials&CTA/TestimonialsCTA";
import FaqAndInsta from "../components/InputSteps/FAQ&Insta/FaqAndInsta";
import SeoAndLegal from "../components/InputSteps/SeoAndLegal/SeoAndLegal";
// Import other step components as you create them
// ...and so on

const CreatePage = () => {
  // Current step tracker
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Animated progress state
  const [animatedProgress, setAnimatedProgress] = useState((1 / totalSteps) * 100);
  const animationRef = useRef(null);

  // Consolidated form data for all steps
  const [formData, setFormData] = useState({
    // Basic Details (Step 1)
    companyName: "",
    funnelName: "",
    domain: "",
    phone: "",
    whatsapp: "",
    email: "",
    // Add fields for other steps as you create them
  });

  // Animation effect for smooth progress
  useEffect(() => {
    const targetProgress = (currentStep / totalSteps) * 100;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Animation function to gradually update progress
    const animateProgress = () => {
      setAnimatedProgress(prev => {
        // Calculate new progress value
        if (Math.abs(prev - targetProgress) < 0.5) {
          // If we're very close to target, just set it directly
          return targetProgress;
        }

        // Otherwise move towards target with easing
        const newValue = prev + (targetProgress - prev) * 0.1;

        // Continue animation if we haven't reached target
        if (Math.abs(newValue - targetProgress) > 0.1) {
          animationRef.current = requestAnimationFrame(animateProgress);
        }

        return newValue;
      });
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animateProgress);

    // Cleanup on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentStep, totalSteps]);

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
      case 3:
        return (
          <HeroSectionStep
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
          />
        );
      case 4:
        return (
          <AboutUs
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}

          />
        );
      case 5:
        return (
          <Services
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}

          />
        );
      case 6:
        return (
          <TestimonialsCTA
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}

          />
        );
      case 7:
        return (
          <FaqAndInsta
            formData={formData}
            updateFormData={updateFormData}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}

          />
        );
      case 8:
        return (
          <SeoAndLegal
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
    <div className="min-h-screen flex flex-col relative">
      {/* Header - Same across all steps */}
      {/* testing */}
      {/* <header className="bg-white shadow-sm border-b sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Create Landing Page</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{`${animatedProgress.toFixed(0)}%`}</span>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-green-500 transition-transform duration-300" 
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${animatedProgress >= 25 ? '100% 0%' : `${50 + (animatedProgress/25) * 50}% 0%`}${animatedProgress >= 50 ? ', 100% 100%' : ''}${animatedProgress >= 75 ? ', 0% 100%' : ''}${animatedProgress >= 100 ? ', 0% 0%' : ''})`,
                  }}
                ></div>
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center text-green-600">
                  <span className="text-xs font-medium">{`${currentStep}/${totalSteps}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content - Changes based on current step */}
      <main className="flex-grow">
        <div className="">
          {renderCurrentStep()}
        </div>
      </main>

      {/* Footer - Same across all steps */}
      {/* <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            Your Landing Page Creator • © {new Date().getFullYear()}
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default CreatePage;