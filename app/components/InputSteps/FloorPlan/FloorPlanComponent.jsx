import { Info, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Floor Plan Component
const FloorPlanComponent = ({ formData, updateFormData, goBackToAddOn, handleUploadData }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [activeSubTab, setActiveSubTab] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);

    // Initialize floor plan data if not exists
    const floorPlanData = {
        fp_heading: formData.fp_heading,
        fp_summary: formData.fp_summary,
        fp_tabs: formData.fp_tabs || []
    };

    // Validation function
    const validateForm = () => {
        const errors = [];
        
        // 1. FP Heading is mandatory
        if (!floorPlanData.fp_heading?.trim()) {
            errors.push("Floor Plan heading is required");
            toast.error("Floor Plan heading is required");
        }
        
        // 2. At least one main tab is required
        if (!floorPlanData.fp_tabs || floorPlanData.fp_tabs.length === 0) {
            errors.push("At least one main tab is required");
            toast.error("At least one main tab is required");
        } else {
            // 3. Check each tab has required fields and at least one sub tab
            floorPlanData.fp_tabs.forEach((tab, tabIndex) => {
                if (!tab.fp_tab_name?.trim()) {
                    errors.push(`Tab ${tabIndex + 1}: Tab name is required`);
                    toast.error(`Tab ${tabIndex + 1}: Tab name is required`);
                }
                
                // Each tab must have at least one sub tab
                if (!tab.fp_sub_tabs || tab.fp_sub_tabs.length === 0) {
                    errors.push(`Tab ${tabIndex + 1}: At least one sub tab is required`);
                    toast.error(`Tab ${tabIndex + 1}: At least one sub tab is required`);
                } else {
                    // Check each sub tab has required fields
                    tab.fp_sub_tabs.forEach((subTab, subTabIndex) => {
                        if (!subTab.fp_subtab_heading?.trim()) {
                            errors.push(`Tab ${tabIndex + 1}, Sub Tab ${subTabIndex + 1}: Sub tab heading is required`);
                            toast.error(`Tab ${tabIndex + 1}, Sub Tab ${subTabIndex + 1}: Sub tab heading is required`);
                        }
                    });
                }
            });
        }
        
        return errors;
    };

    const handleInputChange = (field, value) => {
        const updatedFloorPlan = {
            ...floorPlanData,
            [field]: value
        };
        
        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const handleTabChange = (tabIndex, field, value) => {
        const updatedTabs = [...floorPlanData.fp_tabs];
        updatedTabs[tabIndex] = {
            ...updatedTabs[tabIndex],
            [field]: value
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const handleSubTabChange = (tabIndex, subTabIndex, field, value) => {
        const updatedTabs = [...floorPlanData.fp_tabs];
        const updatedSubTabs = [...updatedTabs[tabIndex].fp_sub_tabs];
        
        updatedSubTabs[subTabIndex] = {
            ...updatedSubTabs[subTabIndex],
            [field]: value
        };

        updatedTabs[tabIndex] = {
            ...updatedTabs[tabIndex],
            fp_sub_tabs: updatedSubTabs
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        // Clear validation errors when user starts typing
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const addNewTab = () => {
        const newTab = {
            fp_tab_name: '',
            fp_sub_tabs: []
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: [...floorPlanData.fp_tabs, newTab]
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        // Clear validation errors when adding new tab
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const removeTab = (tabIndex) => {
        const updatedTabs = floorPlanData.fp_tabs.filter((_, index) => index !== tabIndex);
        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        if (activeTab >= updatedTabs.length && updatedTabs.length > 0) {
            setActiveTab(updatedTabs.length - 1);
        }
    };

    const addNewSubTab = (tabIndex) => {
        const newSubTab = {
            fp_subtab_heading: '',
            fp_subtab_image: [{ fp_sub_tab_image_link: '' }],
            fp_subtab_summary: ''
        };

        const updatedTabs = [...floorPlanData.fp_tabs];
        updatedTabs[tabIndex] = {
            ...updatedTabs[tabIndex],
            fp_sub_tabs: [...(updatedTabs[tabIndex].fp_sub_tabs || []), newSubTab]
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });

        // Clear validation errors when adding new sub tab
        if (validationErrors.length > 0) {
            setValidationErrors([]);
        }
    };

    const removeSubTab = (tabIndex, subTabIndex) => {
        const updatedTabs = [...floorPlanData.fp_tabs];
        updatedTabs[tabIndex] = {
            ...updatedTabs[tabIndex],
            fp_sub_tabs: updatedTabs[tabIndex].fp_sub_tabs.filter((_, index) => index !== subTabIndex)
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });
    };

    const handleImageChange = (tabIndex, subTabIndex, imageIndex, value) => {
        const updatedTabs = [...floorPlanData.fp_tabs];
        const updatedImages = [...updatedTabs[tabIndex].fp_sub_tabs[subTabIndex].fp_subtab_image];
        updatedImages[imageIndex] = { fp_sub_tab_image_link: value };

        updatedTabs[tabIndex].fp_sub_tabs[subTabIndex] = {
            ...updatedTabs[tabIndex].fp_sub_tabs[subTabIndex],
            fp_subtab_image: updatedImages
        };

        const updatedFloorPlan = {
            ...floorPlanData,
            fp_tabs: updatedTabs
        };

        updateFormData({
            ...formData,
            ...updatedFloorPlan
        });
    };

    // Handle save with validation
    const handleSave = async () => {
        console.log("Testing form data in floor plans", formData);
        
        // Validate the entire form before proceeding
        const errors = validateForm();
        
        if (errors.length > 0) {
            setValidationErrors(errors);
            // Scroll to top to show errors
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        // Clear any existing errors
        setValidationErrors([]);
        
        const success = await handleUploadData(true);
    };

    return (
        <div className="flex flex-col h-[88vh]">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Laying the First Brick of Your Funnel
                        </h1>
                        <div className="bg-blue-100 px-4 py-2 rounded-full inline-block">
                            <span className="text-blue-800 text-sm font-medium">2/10</span>
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
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Floor Plan</h2>
                        <p className="text-gray-600 mb-8">Configure your floor plan sections</p>

                        {/* Main Heading and Summary */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fp Heading <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={floorPlanData.fp_heading || ''}
                                    onChange={(e) => handleInputChange('fp_heading', e.target.value)}
                                    placeholder="Master Plan"
                                    className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                        !floorPlanData.fp_heading?.trim() && validationErrors.length > 0
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                    }`}
                                />
                                {!floorPlanData.fp_heading?.trim() && validationErrors.length > 0 && (
                                    <p className="text-red-500 text-xs mt-1">This field is required</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fp Summary
                                </label>
                                <input
                                    type="text"
                                    value={floorPlanData.fp_summary || ''}
                                    onChange={(e) => handleInputChange('fp_summary', e.target.value)}
                                    placeholder="Summary (optional)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                                />
                            </div>
                        </div>

                        {/* FpTab Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">FpTab</h3>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={addNewTab}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create New
                                    </button>
                                    <div className="text-sm text-gray-600 flex items-center">
                                        {floorPlanData.fp_tabs?.length || 0} tab(s) created
                                        {floorPlanData.fp_tabs?.length >= 1 && (
                                            <span className="text-green-600 ml-2">✓</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Show requirement warning */}
                            {(!floorPlanData.fp_tabs || floorPlanData.fp_tabs.length === 0) && (
                                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-yellow-800 text-sm">
                                        <span className="font-medium">Required:</span> You need at least one main tab with at least one sub tab.
                                    </p>
                                </div>
                            )}

                            {/* Tab Navigation */}
                            {floorPlanData?.fp_tabs?.length > 0 && (
                                <div className="flex gap-2 mb-6 border-b">
                                    {floorPlanData.fp_tabs.map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(index)}
                                            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                                                activeTab === index
                                                    ? 'border-rose-500 text-rose-500'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            {tab.fp_tab_name || `Tab ${index + 1}`}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Tab Content */}
                            {floorPlanData.fp_tabs.length > 0 && floorPlanData.fp_tabs[activeTab] && (
                                <div className="space-y-6">
                                    {/* Tab Name */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tab Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={floorPlanData.fp_tabs[activeTab].fp_tab_name || ''}
                                                onChange={(e) => handleTabChange(activeTab, 'fp_tab_name', e.target.value)}
                                                placeholder="Enter tab name"
                                                className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                                    !floorPlanData.fp_tabs[activeTab].fp_tab_name?.trim() && validationErrors.length > 0
                                                        ? 'border-red-300 bg-red-50'
                                                        : 'border-gray-300'
                                                }`}
                                            />
                                            {!floorPlanData.fp_tabs[activeTab].fp_tab_name?.trim() && validationErrors.length > 0 && (
                                                <p className="text-red-500 text-xs mt-1">Tab name is required</p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTab(activeTab)}
                                            className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-md"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sub Tabs */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-medium text-gray-800">Sub Tabs</h4>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => addNewSubTab(activeTab)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                    Add Sub Tab
                                                </button>
                                                <div className="text-sm text-gray-600">
                                                    {floorPlanData.fp_tabs[activeTab].fp_sub_tabs?.length || 0} sub tab(s)
                                                    {floorPlanData.fp_tabs[activeTab].fp_sub_tabs?.length >= 1 && (
                                                        <span className="text-green-600 ml-2">✓</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Show sub tab requirement warning */}
                                        {(!floorPlanData.fp_tabs[activeTab].fp_sub_tabs || floorPlanData.fp_tabs[activeTab].fp_sub_tabs.length === 0) && (
                                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                                <p className="text-yellow-800 text-sm">
                                                    <span className="font-medium">Required:</span> This tab needs at least one sub tab.
                                                </p>
                                            </div>
                                        )}

                                        {floorPlanData.fp_tabs[activeTab].fp_sub_tabs?.map((subTab, subIndex) => (
                                            <div key={subIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h5 className="font-medium text-gray-700">Sub Tab {subIndex + 1}</h5>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSubTab(activeTab, subIndex)}
                                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Sub Tab Heading <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={subTab.fp_subtab_heading || ''}
                                                            onChange={(e) => handleSubTabChange(activeTab, subIndex, 'fp_subtab_heading', e.target.value)}
                                                            placeholder="Enter heading"
                                                            className={`w-full px-3 py-2 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                                                                !subTab.fp_subtab_heading?.trim() && validationErrors.length > 0
                                                                    ? 'border-red-300 bg-red-50'
                                                                    : 'border-gray-300'
                                                            }`}
                                                        />
                                                        {!subTab.fp_subtab_heading?.trim() && validationErrors.length > 0 && (
                                                            <p className="text-red-500 text-xs mt-1">Sub tab heading is required</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Image Link
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={subTab.fp_subtab_image?.[0]?.fp_sub_tab_image_link || ''}
                                                            onChange={(e) => handleImageChange(activeTab, subIndex, 0, e.target.value)}
                                                            placeholder="Enter image URL"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Sub Tab Summary
                                                    </label>
                                                    <textarea
                                                        value={subTab.fp_subtab_summary || ''}
                                                        onChange={(e) => handleSubTabChange(activeTab, subIndex, 'fp_subtab_summary', e.target.value)}
                                                        placeholder="Enter summary (optional)"
                                                        rows={2}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fixed Navigation Bar at Bottom */}
                    <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
                        <button
                            type="button"
                            onClick={goBackToAddOn}
                            className="border border-rose-500 text-rose-500 px-8 py-2 rounded-md font-medium hover:bg-rose-50 transition-colors duration-200"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloorPlanComponent;