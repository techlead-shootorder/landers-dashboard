'use client';

import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FloorPlanComponent from "../FloorPlan/FloorPlanComponent";
import GallerySection from "../GallerySection/GallerySection"

const AddOn = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData, insertAndNavigateToSection, setCurrentStep }) => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentSection, setCurrentSection] = useState('addon'); // 'addon' or section id

    // Define all available add-on sections
    const availableAddOns = [
        {
            id: 'gallery',
            title: 'Gallery',
            description: 'Showcase your work with a beautiful image gallery. Perfect for displaying portfolio items.',
            stepNumber: 9,
            isNew: true
        },
        {
            id: 'floor_plan',
            title: 'Floor Plan',
            description: 'Display detailed floor plans and layouts. Great for real estate and architecture businesses.',
            stepNumber: 9,
            isNew: false
        },
        {
            id: 'timeline',
            title: 'Timeline',
            description: 'Show your company history, project milestones, or process steps in a timeline format.',
            stepNumber: 9,
            isNew: false
        },
        {
            id: 'pricing',
            title: 'Pricing',
            description: 'Present your pricing plans and packages in an organized, easy-to-compare format.',
            stepNumber: 9,
            isNew: false
        },
        {
            id: 'team',
            title: 'Team',
            description: 'Introduce your team members with photos, roles, and brief descriptions.',
            stepNumber: 9,
            isNew: false
        },
        {
            id: 'location',
            title: 'Location',
            description: 'Show your business location with maps and contact information.',
            stepNumber: 9,
            isNew: false
        }
    ];

    // Filter out sections that are already added
    const getAvailableAddOns = () => {
        return availableAddOns.filter(addon => {
            return !formData.addedSections?.includes(addon.id);
        });
    };

    // Handle card selection and immediately open the section
    const handleCardSelect = (cardId) => {
        setSelectedCard(cardId);
        // Immediately open the selected section
        setCurrentSection(cardId);
    };

    // Handle add button click
    const handleAdd = async () => {
        if (!selectedCard) {
            toast.error('Please select a section to add');
            return;
        }

        const selectedAddOn = availableAddOns.find(addon => addon.id === selectedCard);
        
        if (selectedAddOn) {
            // Update formData to include this new section
            const updatedFormData = {
                ...formData,
                addedSections: [...(formData.addedSections || []), selectedCard],
                // Initialize empty data for the new section
                [selectedCard]: {
                    title: '',
                    description: '',
                }
            };

            // Update the form data first
            updateFormData(updatedFormData);

            try {
                // Save the updated data to the backend
                const response = await fetch(`/api/updateData?id=${formData.pageId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFormData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                toast.success(`${selectedAddOn.title} section added successfully!`);
                
                // Navigate to the newly added section
                insertAndNavigateToSection(selectedCard);
                
            } catch (error) {
                console.error("Error saving data:", error.message);
                toast.error("Something went wrong while saving data");
            }
        }
    };

    // Handle skip button click
    const handleSkip = () => {
        goToNextStep();
    };

    // Handle going back to add-on selection
    const goBackToAddOn = () => {
        setCurrentSection('addon');
        setSelectedCard(null);
    };

    const availableCards = getAvailableAddOns();

    // Render different sections based on currentSection
    if (currentSection === 'floor_plan') {
        return (
            <FloorPlanComponent 
                formData={formData}
                updateFormData={updateFormData}
                goBackToAddOn={goBackToAddOn}
                handleUploadData={handleUploadData}
                setCurrentStep={setCurrentStep}
            />
        );
    }
    else if (currentSection === 'gallery') {
        return (
            <GallerySection 
                formData={formData}
                updateFormData={updateFormData}
                goBackToAddOn={goBackToAddOn}
                handleUploadData={handleUploadData}
                setCurrentStep={setCurrentStep}
            />
        );
    }

    // Default Add-On selection view
    return (
        <div className="flex flex-col h-[88vh]">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Laying the First Brick of Your Funnel
                        </h1>
                        <div className="bg-blue-100 px-4 py-2 rounded-full inline-block">
                            <span className="text-blue-800 text-sm font-medium">4/10</span>
                        </div>
                    </div>

                    <div className="flex items-start mb-8">
                        <Info className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac orci scelerisque, viverra elit vel, gravida lorem. Fusce vel diam nec magna facilisis malesuada.
                        </p>
                    </div>
                </div>

                <div className="w-2/3 bg-white p-12 pb-24 overflow-y-auto relative">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add-On</h2>
                        <p className="text-gray-600 mb-8">Choose additional sections to enhance your funnel</p>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {availableCards.map((card) => (
                                <div
                                    key={card.id}
                                    onClick={() => handleCardSelect(card.id)}
                                    className={`relative bg-gray-100 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        selectedCard === card.id 
                                            ? 'ring-2 ring-rose-500 bg-rose-50' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    {/* New badge */}
                                    {card.isNew && (
                                        <div className="absolute top-3 right-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        </div>
                                    )}

                                    {/* Card content */}
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>

                                    {/* Selection indicator */}
                                    {selectedCard === card.id && (
                                        <div className="absolute inset-0 bg-rose-500 bg-opacity-10 rounded-lg pointer-events-none"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {availableCards.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">All available sections have been added to your funnel!</p>
                            </div>
                        )}
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
                            onClick={handleSkip}
                            className="border border-gray-400 text-gray-600 px-8 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200"
                        >
                            Skip
                        </button>
                        <button
                            type="button"
                            onClick={handleAdd}
                            disabled={!selectedCard || availableCards.length === 0}
                            className={`px-8 py-2 rounded-md font-medium transition-colors duration-200 ${
                                selectedCard && availableCards.length > 0
                                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {availableCards.length === 0 ? 'Continue' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOn;

