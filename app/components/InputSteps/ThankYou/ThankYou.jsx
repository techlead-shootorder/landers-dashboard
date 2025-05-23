'use client';

import { InfoIcon } from "lucide-react";

const ThankYou = ({formData, goToPrevStep, pageId}) => {

    console.log("form DAta in thankyou", formData );
    // Visit landing page function
    const visitLandingPage = () => {
        // Implementation for visiting landing page
        console.log("Visiting landing page");
        // Add navigation logic here
    };

    // Handle edit button click
    const handleEdit = () => {
        console.log("Edit clicked");
        // Add edit navigation logic here
    };

    // Handle preview button click
    const handlePreview = () => {
        window.location.href = `https://landers.co.in/${formData.slug}`;
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

                {/* Main content area - Thank You section */}
                <div className="w-2/3 bg-white p-12 pb-24 overflow-y-auto relative flex flex-col items-center justify-center">
                    <div className="text-center max-w-lg">
                        {/* Thank You Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="border-2 border-gray-800 p-4 inline-block">
                                <div className="text-2xl font-bold">THANK</div>
                                <div className="text-2xl font-bold">YOU</div>
                                <div className="flex justify-center">
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-800 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="text-xl">...</div>
                            </div>
                        </div>

                        {/* Thank You Text */}
                        <h2 className="text-5xl font-bold text-gray-700 mb-6">Thank you !</h2>
                        
                        <p className="text-gray-600 mb-8">
                            We're thrilled to have you on this journey.<br />
                            Your funnel setup is complete, and you're now one step closer to growing your brand and reaching your goals.<br />
                            Everything you need to build, launch, and scale is right at your fingertips — and we're here to support you every step of the way.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={handlePreview}
                                className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                                Preview
                            </button>
                            <button
                                onClick={handleEdit}
                                className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Fixed Navigation Bar at Bottom */}
                    {/* <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 shadow-lg py-4 px-12 z-20">
                        <div className="flex justify-between max-w-full">
                            <div>
                                <button
                                    onClick={visitLandingPage}
                                    className="border border-gray-300 text-gray-700 px-8 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Visit Landing Page
                                </button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ThankYou;