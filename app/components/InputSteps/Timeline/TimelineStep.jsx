'use client';

import { useState } from "react";
import { InfoIcon } from "lucide-react";

const TimelineStep = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
    // Local state for form handling
    const [localFormData, setLocalFormData] = useState({
        timelineHeading1: formData.timelineHeading1 || "",
        timelineSummary1: formData.timelineSummary1 || "",
        timelineHeading2: formData.timelineHeading2 || "",
        timelineItems: formData.timelineItems || [],
        featuredSectionHeading: formData.featuredSectionHeading || "",
        featuredSectionSubHeading: formData.featuredSectionSubHeading || "",
        features: formData.features || []
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-8">Timeline</h2>

                    <div className="relative">
                        {/* Progress Indicator */}
                        <div className="absolute right-0 top-0">
                            <div className="flex items-center">
                                <div className="rounded-full w-12 h-12 border-4 border-blue-500 bg-white flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">2/10</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* First Timeline Section */}
                            <div className="mb-8">
                                <h3 className="text-base font-medium text-gray-800 mb-2">Timeline Heading</h3>
                                <input
                                    type="text"
                                    id="timelineHeading1"
                                    name="timelineHeading1"
                                    value={localFormData.timelineHeading1}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Eledent - Dental Implants Offer"
                                />
                            </div>

                            {/* Timeline Summary */}
                            <div className="mb-8">
                                <h3 className="text-base font-medium text-gray-800 mb-2">Timeline Summary</h3>
                                <input
                                    type="text"
                                    id="timelineSummary1"
                                    name="timelineSummary1"
                                    value={localFormData.timelineSummary1}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Eledent - Dental Implants Offer"
                                />
                            </div>
                        </div>

                        {/* Second Timeline Section */}
                        <div className="mb-4">
                            <h3 className="text-base font-medium text-gray-800 mb-2">Timeline Heading</h3>
                        </div>

                        {/* Add Timeline Item Button */}
                        <div className="mb-8">
                            <button
                                type="button"
                                className="bg-rose-600 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200"
                            >
                                Add a timeline item
                            </button>
                        </div>

                        {/* Featured Group Section */}
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Group</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Featured Section Heading */}
                            <div className="mb-8">
                                <h3 className="text-base font-medium text-gray-800 mb-2">Featured Section Heading</h3>
                                <input
                                    type="text"
                                    id="featuredSectionHeading"
                                    name="featuredSectionHeading"
                                    value={localFormData.featuredSectionHeading}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Eledent - Dental Implants Offer"
                                />
                            </div>

                            {/* Featured Section Sub Heading */}
                            <div className="mb-8">
                                <h3 className="text-base font-medium text-gray-800 mb-2">Featured Section Sub Heading</h3>
                                <input
                                    type="text"
                                    id="featuredSectionSubHeading"
                                    name="featuredSectionSubHeading"
                                    value={localFormData.featuredSectionSubHeading}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Eledent - Dental Implants Offer"
                                />
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mb-4">
                            <h3 className="text-base font-medium text-gray-800 mb-2">Features</h3>
                        </div>

                        {/* Create New Feature Button */}
                        <div className="mb-8">
                            <button
                                type="button"
                                className="bg-rose-600 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200"
                            >
                                Create New
                            </button>
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

export default TimelineStep;
