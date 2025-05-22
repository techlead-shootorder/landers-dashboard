'use client';
import React from 'react'
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import ChooseTemplateStep from "../../components/InputSteps/ChooseTemplateStep/ChooseTemplateStep";
import HeroBasicDetailsStep from "../../components/InputSteps/HeroSection/HeroBasicDetailsStep"
import HeroSectionStep from "../../components/InputSteps/HeroSection/HeroSection";
import HeroForm from "../../components/InputSteps/HeroSection/HeroForm";
import AboutUs from "../../components/InputSteps/AboutUs/AboutUs";
import Services from "../../components/InputSteps/Services/Services";
import UspGroup from "../../components/InputSteps/UspGroup/UspGroup";
import TimelineStep from "../../components/InputSteps/Timeline/TimelineStep";
import TestimonialsCTA from "../../components/InputSteps/Testimonials&CTA/TestimonialsCTA";
import FaqAndInsta from "../../components/InputSteps/FAQ&Insta/FaqAndInsta";
import SeoAndLegal from "../../components/InputSteps/SeoAndLegal/SeoAndLegal";
import ThankYou from "../../components/InputSteps/ThankYou/ThankYou";
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';

const page = () => {
    const params = useParams();
    const pageId = params.pageId;// or params['page_id']

    // Current step tracker
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 10;

    // Loading state
    const [isLoading, setIsLoading] = useState(true);
    const [updateLoader, setUpdateLoader] = useState(false);

    // Consolidated form data for all steps
    const [formData, setFormData] = useState({});

    // this effect is for fetching single page data from the Id
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/getSinglePageData?id=${pageId}`);
                const result = await response.json();

                if (result.success) {
                    // toast.success(result.message || 'Data fetched successfully');
                    console.log("testing data", result.data.data);
                    setFormData(result.data.data);
                } else {
                    toast.error(result.message || 'Failed to fetch data');
                }
            } catch (error) {
                toast.error('Network error occurred');
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (pageId) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [pageId])

    // Handle form data changes from any step
    const updateFormData = (newData) => {
        setFormData(newData);
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

    // Loading component
    const LoadingSpinner = () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">GET SET GOOOOOOO!!!</p>
            </div>
        </div>
    );

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Render the current step component
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ChooseTemplateStep
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}

                    />
                );
            case 2:
                return (
                    <HeroSectionStep
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                    />
                );
            case 3:
                return (
                    <AboutUs
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                    />
                );
            case 4:
                return (
                    <Services
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                    />
                );
            case 5:
                return (
                    <TestimonialsCTA
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                    />
                );
            case 6:
                return (
                    <FaqAndInsta
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                        pageId={pageId}
                    />
                );
            case 7:
                return (
                    <SeoAndLegal
                        formData={formData}
                        updateFormData={updateFormData}
                        goToNextStep={goToNextStep}
                        goToPrevStep={goToPrevStep}
                    />
                );
            case 8:
                return (
                    <ThankYou
                        formData={formData}
                        goToPrevStep={goToPrevStep}
                    />
                );
            default:
                return <div>Step {currentStep} not implemented yet</div>;
        }
    };

    const handleUpdateData = async (state) => {
        try {
            setUpdateLoader(true);
            const response = await fetch(`/api/updateData?id=${pageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            console.log("Update Successful:", data);
            setUpdateLoader(false);
            toast.success("Data saved successfully");
            return true;
        } catch (error) {
            console.error("Error updating data:", error.message);
            setUpdateLoader(false);
            toast.error("Something went wrong while saving data");
            return false;
        }
    };

    const handleNext = async () => {
    const success = await handleUpdateData(formData);
    if (success) {
        goToNextStep();
    }
};

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Main content - Changes based on current step */}
            <main className="flex-grow">
                <div className="">
                    {renderCurrentStep()}
                </div>
            </main>


            {/* Navigation Buttons */}
            <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
                {currentStep != 1 && <button
                    type="button"
                    onClick={goToPrevStep}
                    className="border border-rose-500 text-rose-500 px-8 py-2 rounded-md font-medium hover:bg-rose-50 transition-colors duration-200"
                >
                    Previous
                </button>}
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={updateLoader}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
                >
                     {updateLoader ? <Loader2 className="w-4 h-4 animate-spin"  /> : "Next" }
                </button>
                {/* <button
              type="button"
              onClick={() => handleUpdateData(formData)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
            >
              SAVE
            </button> */}
            </div>

        </div>
    )
}

export default page