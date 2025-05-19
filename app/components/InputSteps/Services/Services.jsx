'use client';

import { useState } from "react";
import { InfoIcon, Trash } from "lucide-react";
import ServiceCreationModal from "./component/ServiceCreationModal";
import UspCreationModal from "./component/UspCreationModal";
import FeaturedGroupCreationModal from "./component/FeaturedGroupCreationModal";

const Services = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for form handling
  const [localFormData, setLocalFormData] = useState({
    // Services section
    servicesHeading: formData.servicesHeading || "",
    servicesSectionSubHeading: formData.servicesSectionSubHeading || "",
    services: formData.services || [],

    // USP Group section
    uspGroupHeading: formData.uspGroupHeading || "",
    uspGroupSubHeading: formData.uspGroupSubHeading || "",
    uspItems: formData.uspItems || [],

    // Featured Group section
    featuredGroupHeading: formData.featuredGroupHeading || "",
    featuredGroupSubHeading: formData.featuredGroupSubHeading || "",
    featuredItems: formData.featuredItems || [],

    // Floor Plan section (from original code)
    floorPlanHeading: formData.floorPlanHeading || "",
    floorPlanSummary: formData.floorPlanSummary || ""
  });

  // States for modals
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [uspModalOpen, setUspModalOpen] = useState(false);
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);

  const [editingService, setEditingService] = useState(null);
  const [editingUsp, setEditingUsp] = useState(null);
  const [editingFeatured, setEditingFeatured] = useState(null);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value
    });
  };

  // SERVICE MODAL HANDLERS
  const handleOpenServiceModal = (service = null, index = null) => {
    if (service) {
      setEditingService({ ...service, index });
    } else {
      setEditingService(null);
    }
    setServiceModalOpen(true);
  };


  // Fixed SERVICE SAVE HANDLER
  const handleSaveService = (serviceData, isEditMode) => {
    if (isEditMode && editingService !== null && typeof editingService.index === 'number') {
      const updatedServices = [...localFormData.services];
      updatedServices[editingService.index] = serviceData;
      setLocalFormData({
        ...localFormData,
        services: updatedServices
      });
    } else {
      const updatedServices = [...localFormData.services, serviceData];
      setLocalFormData({
        ...localFormData,
        services: updatedServices
      });
    }
    handleCloseServiceModal(); // Add this line to close modal after saving
  };

  // Fixed USP SAVE HANDLER
  const handleSaveUsp = (uspData, isEditMode) => {
    if (isEditMode && editingUsp !== null && typeof editingUsp.index === 'number') {
      const updatedUsps = [...localFormData.uspItems];
      updatedUsps[editingUsp.index] = uspData;
      setLocalFormData({
        ...localFormData,
        uspItems: updatedUsps
      });
    } else {
      const updatedUsps = [...localFormData.uspItems, uspData];
      setLocalFormData({
        ...localFormData,
        uspItems: updatedUsps
      });
    }
    handleCloseUspModal(); // Add this line to close modal after saving
  };

  // Fixed FEATURED SAVE HANDLER
  const handleSaveFeatured = (featuredData, isEditMode) => {
    if (isEditMode && editingFeatured !== null && typeof editingFeatured.index === 'number') {
      const updatedFeatured = [...localFormData.featuredItems];
      updatedFeatured[editingFeatured.index] = featuredData;
      setLocalFormData({
        ...localFormData,
        featuredItems: updatedFeatured
      });
    } else {
      const updatedFeatured = [...localFormData.featuredItems, featuredData];
      setLocalFormData({
        ...localFormData,
        featuredItems: updatedFeatured
      });
    }
    handleCloseFeaturedModal(); // Add this line to close modal after saving
  };

  const handleCloseServiceModal = () => {
    setServiceModalOpen(false);
    setEditingService(null);
  };


  const handleDeleteService = (index, event) => {
    event.stopPropagation();
    const updatedServices = [...localFormData.services];
    updatedServices.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      services: updatedServices
    });
  };

  // USP MODAL HANDLERS
  const handleOpenUspModal = (usp = null, index = null) => {
    if (usp) {
      setEditingUsp({ ...usp, index });
    } else {
      setEditingUsp(null);
    }
    setUspModalOpen(true);
  };

  const handleCloseUspModal = () => {
    setUspModalOpen(false);
    setEditingUsp(null);
  };

  const handleDeleteUsp = (index, event) => {
    event.stopPropagation();
    const updatedUsps = [...localFormData.uspItems];
    updatedUsps.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      uspItems: updatedUsps
    });
  };

  // FEATURED GROUP MODAL HANDLERS
  const handleOpenFeaturedModal = (featured = null, index = null) => {
    if (featured) {
      setEditingFeatured({ ...featured, index });
    } else {
      setEditingFeatured(null);
    }
    setFeaturedModalOpen(true);
  };

  const handleCloseFeaturedModal = () => {
    setFeaturedModalOpen(false);
    setEditingFeatured(null);
  };

  const handleDeleteFeatured = (index, event) => {
    event.stopPropagation();
    const updatedFeatured = [...localFormData.featuredItems];
    updatedFeatured.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      featuredItems: updatedFeatured
    });
  };

  // Navigation handlers
  const handleNext = () => {
    updateFormData(localFormData);
    goToNextStep();
  };

  const handlePrevious = () => {
    updateFormData(localFormData);
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
          <div>
            {/* SERVICES SECTION */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">Services</h2>

              <div className="mb-4">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Services Section Heading */}
                  <div>
                    <label htmlFor="servicesHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      Services Section Heading
                    </label>
                    <input
                      type="text"
                      id="servicesHeading"
                      name="servicesHeading"
                      value={localFormData.servicesHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Services Heading"
                    />
                  </div>

                  {/* Services Section Sub Heading */}
                  <div>
                    <label htmlFor="servicesSectionSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      Services Section Sub Heading
                    </label>
                    <input
                      type="text"
                      id="servicesSectionSubHeading"
                      name="servicesSectionSubHeading"
                      value={localFormData.servicesSectionSubHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Services Sub-Heading"
                    />
                  </div>
                </div>

                {/* Service list */}
                {localFormData.services.length > 0 && (
                  <div className="mt-4 mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Created Services</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {localFormData.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleOpenServiceModal(service, index)}
                        >
                          <span className="font-medium text-gray-800">{service.title}</span>
                          <button
                            onClick={(e) => handleDeleteService(index, e)}
                            className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Create Services Button */}
              <div className="mb-10">
                <button
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  onClick={() => handleOpenServiceModal()}
                >
                  Create Services
                </button>
              </div>
            </div>

            {/* USP GROUP SECTION */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">USP Group</h2>

              <div className="mb-4">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* USP Group Heading */}
                  <div>
                    <label htmlFor="uspGroupHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      USP Group Heading
                    </label>
                    <input
                      type="text"
                      id="uspGroupHeading"
                      name="uspGroupHeading"
                      value={localFormData.uspGroupHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="USP Heading"
                    />
                  </div>

                  {/* USP Group Sub Heading */}
                  <div>
                    <label htmlFor="uspGroupSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      USP Group Sub Heading
                    </label>
                    <input
                      type="text"
                      id="uspGroupSubHeading"
                      name="uspGroupSubHeading"
                      value={localFormData.uspGroupSubHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="USP Sub-Heading"
                    />
                  </div>
                </div>

                {/* USP items list */}
                {localFormData.uspItems.length > 0 && (
                  <div className="mt-4 mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Created USPs</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {localFormData.uspItems.map((usp, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleOpenUspModal(usp, index)}
                        >
                          <span className="font-medium text-gray-800">{usp.heading}</span>
                          <button
                            onClick={(e) => handleDeleteUsp(index, e)}
                            className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Create USP Button */}
              <div className="mb-10">
                <button
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  onClick={() => handleOpenUspModal()}
                >
                  Create USP
                </button>
              </div>
            </div>

            {/* FEATURED GROUP SECTION */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">Featured Group</h2>

              <div className="mb-4">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Featured Group Heading */}
                  <div>
                    <label htmlFor="featuredGroupHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Group Heading
                    </label>
                    <input
                      type="text"
                      id="featuredGroupHeading"
                      name="featuredGroupHeading"
                      value={localFormData.featuredGroupHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Featured Heading"
                    />
                  </div>

                  {/* Featured Group Sub Heading */}
                  <div>
                    <label htmlFor="featuredGroupSubHeading" className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Group Sub Heading
                    </label>
                    <input
                      type="text"
                      id="featuredGroupSubHeading"
                      name="featuredGroupSubHeading"
                      value={localFormData.featuredGroupSubHeading}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Featured Sub-Heading"
                    />
                  </div>
                </div>

                {/* Featured items list */}
                {localFormData.featuredItems.length > 0 && (
                  <div className="mt-4 mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Created Featured Items</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {localFormData.featuredItems.map((featured, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => handleOpenFeaturedModal(featured, index)}
                        >
                          <span className="font-medium text-gray-800">{featured.heading}</span>
                          <button
                            onClick={(e) => handleDeleteFeatured(index, e)}
                            className="text-gray-600 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Create Featured Button */}
              <div className="mb-10">
                <button
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  onClick={() => handleOpenFeaturedModal()}
                >
                  Create Featured Item
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

      {/* Service Creation Modal */}
      <ServiceCreationModal
        isOpen={serviceModalOpen}
        onClose={handleCloseServiceModal}
        onSave={handleSaveService}
        editData={editingService}
      />

      {/* USP Creation Modal */}
      <UspCreationModal
        isOpen={uspModalOpen}
        onClose={handleCloseUspModal}
        onSave={handleSaveUsp}
        editData={editingUsp}
      />

      {/* Featured Group Creation Modal */}
      <FeaturedGroupCreationModal
        isOpen={featuredModalOpen}
        onClose={handleCloseFeaturedModal}
        onSave={handleSaveFeatured}
        editData={editingFeatured}
      />
    </div>
  );
};

export default Services;