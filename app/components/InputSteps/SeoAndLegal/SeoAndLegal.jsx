'use client';

import { InfoIcon } from "lucide-react";
import { toast } from "react-hot-toast"; // You'll need to install react-hot-toast

const SeoAndLegal = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData }) => {
    // Handle input changes for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        updateFormData({
            ...formData,
            [name]: checked
        });
    };

    // Validate required fields
    const validateRequiredFields = () => {
        const requiredFields = [
            { field: 'seo_title', label: 'SEO Title' },
            { field: 'seo_meta_description', label: 'SEO Meta Description' },
            { field: 'copyright_text', label: 'Copyright Text' }
        ];

        const missingFields = [];

        requiredFields.forEach(({ field, label }) => {
            if (!formData[field] || formData[field].trim() === '') {
                missingFields.push(label);
            }
        });

        return missingFields;
    };

    // Handle next button click with validation
    const handleNext = () => {
        const missingFields = validateRequiredFields();
        
        if (missingFields.length > 0) {
            // Show error toast with missing fields
            toast.error(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            return;
        }

        // All validations passed
        console.log("formdata in seo", formData);
        handleUploadData();
    };

    // Visit landing page function
    const visitLandingPage = () => {
        // Implementation for visiting landing page
        console.log("Visiting landing page");
        // Add navigation logic here
    };

    return (
        <div className="flex flex-col h-[88vh]">
            {/* Left sidebar for title and tooltip */}
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Laying the First Brick of Your Funnel
                        </h1>
                    </div>

                    <div className="flex items-start mb-8">
                        <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac orci scelerisque, viverra elit vel, gravida lorem. Fusce vel diam nec magna facilisis malesuada.
                        </p>
                    </div>
                </div>

                {/* Main content area - Added pb-24 to create space for fixed navigation */}
                <div className="w-2/3 bg-white p-12 pb-24 overflow-y-auto relative">
                    {/* SEO Group Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">SEO Group</h2>

                        {/* SEO Inputs */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    SEO Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="seo_title"
                                    value={formData.seo_title || ""}
                                    onChange={handleInputChange}
                                    placeholder="Elodent - Dental Implants Offer"
                                    className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                        !formData.seo_title || formData.seo_title.trim() === ''
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                    }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    SEO Meta Description <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="seo_meta_description"
                                    value={formData.seo_meta_description || ""}
                                    onChange={handleInputChange}
                                    placeholder="Elodent - Dental Implants Offer"
                                    className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                        !formData.seo_meta_description || formData.seo_meta_description.trim() === ''
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* GTM ID */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GTM ID
                                </label>
                                <input
                                    type="text"
                                    name="gtm_id"
                                    value={formData.gtm_id || ""}
                                    onChange={handleInputChange}
                                    placeholder="GTM-XXXXXXX"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                                />
                            </div>
                            <div></div>
                        </div>
                    </div>

                    {/* Legal Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Legal</h2>

                        {/* Copyright and Disclaimer */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Copyright Text <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="copyright_text"
                                    value={formData.copyright_text || ""}
                                    onChange={handleInputChange}
                                    placeholder="© 2024 Company Name. All rights reserved."
                                    className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                        !formData.copyright_text || formData.copyright_text.trim() === ''
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                    }`}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Disclaimer
                                </label>
                                <input
                                    type="text"
                                    name="disclaimer"
                                    value={formData.disclaimer || ""}
                                    onChange={handleInputChange}
                                    placeholder="Enter disclaimer text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                                />
                            </div>
                        </div>

                        {/* Cookie */}
                        <div className="mb-6">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <input
                                    type="checkbox"
                                    name="cookie"
                                    checked={formData.cookie || false}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 h-5 w-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                                />
                                Cookie
                            </label>
                        </div>

                        {/* Fixed Navigation Bar at Bottom */}
                        <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
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
                                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeoAndLegal;