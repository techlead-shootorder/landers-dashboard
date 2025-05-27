'use client';

import { useState } from "react";
import { InfoIcon, Trash } from "lucide-react";
import ServiceCreationModal from "./component/ServiceCreationModal";
import UspCreationModal from "./component/UspCreationModal";
import FeaturedGroupCreationModal from "./component/FeaturedGroupCreationModal";

const TabContent = ({ 
  activeTab, 
  formData, 
  handleInputChange,
  handleOpenServiceModal,
  handleDeleteService,
  handleOpenUspModal,
  handleDeleteUsp,
  handleOpenFeaturedModal,
  handleDeleteFeatured
}) => {
  if (activeTab === 'services') {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Services</h2>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Services Section Heading */}
            <div>
              <label htmlFor="services_section_heading" className="block text-sm font-medium text-gray-700 mb-1">
                Services Section Heading
              </label>
              <input
                type="text"
                id="services_section_heading"
                name="services_section_heading"
                value={formData.services_section_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Services Heading"
              />
            </div>

            {/* Services Section Sub Heading */}
            <div>
              <label htmlFor="services_section_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                Services Section Sub Heading
              </label>
              <input
                type="text"
                id="services_section_sub_heading"
                name="services_section_sub_heading"
                value={formData.services_section_sub_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Services Sub-Heading"
              />
            </div>
          </div>

          {/* Service list */}
          {(formData.services || []).length > 0 && (
            <div className="mt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Created Services</h3>
              <div className="grid grid-cols-3 gap-2">
                {(formData.services || []).map((service, index) => (
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
    );
  }

  if (activeTab === 'usp') {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">USP Group</h2>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* USP Group Heading */}
            <div>
              <label htmlFor="usp_section_heading" className="block text-sm font-medium text-gray-700 mb-1">
                USP Section Heading
              </label>
              <input
                type="text"
                id="usp_section_heading"
                name="usp_section_heading"
                value={formData.usp_section_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="USP Heading"
              />
            </div>

            {/* USP Group Sub Heading */}
            <div>
              <label htmlFor="usp_section_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                USP Section Sub Heading
              </label>
              <input
                type="text"
                id="usp_section_sub_heading"
                name="usp_section_sub_heading"
                value={formData.usp_section_sub_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="USP Sub-Heading"
              />
            </div>
          </div>

          {/* USP items list */}
          {(formData.usp || []).length > 0 && (
            <div className="mt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Created USPs</h3>
              <div className="grid grid-cols-3 gap-2">
                {(formData.usp || []).map((uspItem, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleOpenUspModal(uspItem, index)}
                  >
                    <span className="font-medium text-gray-800">{uspItem.usp_heading}</span>
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
    );
  }

  if (activeTab === 'featured') {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Featured Group</h2>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Featured Group Heading */}
            <div>
              <label htmlFor="features_section_heading" className="block text-sm font-medium text-gray-700 mb-1">
                Features Section Heading
              </label>
              <input
                type="text"
                id="features_section_heading"
                name="features_section_heading"
                value={formData.features_section_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Features Heading"
              />
            </div>

            {/* Featured Group Sub Heading */}
            <div>
              <label htmlFor="features_section_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                Features Section Sub Heading
              </label>
              <input
                type="text"
                id="features_section_sub_heading"
                name="features_section_sub_heading"
                value={formData.features_section_sub_heading || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Features Sub-Heading"
              />
            </div>
          </div>

          {/* Featured items list */}
          {(formData.features || []).length > 0 && (
            <div className="mt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Created Features</h3>
              <div className="grid grid-cols-3 gap-2">
                {(formData.features || []).map((feature, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleOpenFeaturedModal(feature, index)}
                  >
                    <span className="font-medium text-gray-800">{feature.usp_heading}</span>
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
            Create Feature
          </button>
        </div>
      </div>
    );
  }

  return null;
};

const Services = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState('services');
  
  // States for modals
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [uspModalOpen, setUspModalOpen] = useState(false);
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);

  const [editingService, setEditingService] = useState(null);
  const [editingUsp, setEditingUsp] = useState(null);
  const [editingFeatured, setEditingFeatured] = useState(null);

  // Tab configuration
  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'usp', label: 'USP Group' },
    { id: 'featured', label: 'Featured Group' }
  ];

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
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

  // SERVICE SAVE HANDLER
  const handleSaveService = (serviceData, isEditMode) => {
    const currentServices = formData.services || [];
    
    // Add cover property if it doesn't exist
    const serviceWithCover = {
      ...serviceData,
      cover: serviceData.cover !== undefined ? serviceData.cover : false
    };

    if (isEditMode && editingService !== null && typeof editingService.index === 'number') {
      const updatedServices = [...currentServices];
      updatedServices[editingService.index] = serviceWithCover;
      updateFormData({
        ...formData,
        services: updatedServices
      });
    } else {
      const updatedServices = [...currentServices, serviceWithCover];
      updateFormData({
        ...formData,
        services: updatedServices
      });
    }
    handleCloseServiceModal();
  };

  // USP SAVE HANDLER
  const handleSaveUsp = (uspData, isEditMode) => {
    const currentUsp = formData.usp || [];
    
    // Add cover property if it doesn't exist
    const uspWithCover = {
      ...uspData,
      cover: uspData.cover !== undefined ? uspData.cover : false
    };

    if (isEditMode && editingUsp !== null && typeof editingUsp.index === 'number') {
      const updatedUsp = [...currentUsp];
      updatedUsp[editingUsp.index] = uspWithCover;
      updateFormData({
        ...formData,
        usp: updatedUsp
      });
    } else {
      const updatedUsp = [...currentUsp, uspWithCover];
      updateFormData({
        ...formData,
        usp: updatedUsp
      });
    }
    handleCloseUspModal();
  };

  // FEATURED SAVE HANDLER
  const handleSaveFeatured = (featuredData, isEditMode) => {
    const currentFeatures = formData.features || [];
    
    // Add cover property if it doesn't exist
    const featuredWithCover = {
      ...featuredData,
      cover: featuredData.cover !== undefined ? featuredData.cover : false
    };

    if (isEditMode && editingFeatured !== null && typeof editingFeatured.index === 'number') {
      const updatedFeatures = [...currentFeatures];
      updatedFeatures[editingFeatured.index] = featuredWithCover;
      updateFormData({
        ...formData,
        features: updatedFeatures
      });
    } else {
      const updatedFeatures = [...currentFeatures, featuredWithCover];
      updateFormData({
        ...formData,
        features: updatedFeatures
      });
    }
    handleCloseFeaturedModal();
  };

  const handleCloseServiceModal = () => {
    setServiceModalOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (index, event) => {
    event.stopPropagation();
    const currentServices = formData.services || [];
    const updatedServices = [...currentServices];
    updatedServices.splice(index, 1);
    updateFormData({
      ...formData,
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
    const currentUsp = formData.usp || [];
    const updatedUsp = [...currentUsp];
    updatedUsp.splice(index, 1);
    updateFormData({
      ...formData,
      usp: updatedUsp
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
    const currentFeatures = formData.features || [];
    const updatedFeatures = [...currentFeatures];
    updatedFeatures.splice(index, 1);
    updateFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  // Navigation handlers
  const handleNext = () => {
    handleUploadData();
  };

  const handlePrevious = () => {
    goToPrevStep();
  };

  return (
    <div className="flex flex-col h-full">
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
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-rose-500 text-rose-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <TabContent
              activeTab={activeTab}
              formData={formData}
              handleInputChange={handleInputChange}
              handleOpenServiceModal={handleOpenServiceModal}
              handleDeleteService={handleDeleteService}
              handleOpenUspModal={handleOpenUspModal}
              handleDeleteUsp={handleDeleteUsp}
              handleOpenFeaturedModal={handleOpenFeaturedModal}
              handleDeleteFeatured={handleDeleteFeatured}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
         <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
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

      {/* Service Creation Modal */}
      {serviceModalOpen && (
        <ServiceCreationModal
          isOpen={serviceModalOpen}
          onClose={handleCloseServiceModal}
          onSave={handleSaveService}
          editData={editingService}
        />
      )}

      {/* USP Creation Modal */}
      {uspModalOpen && (
        <UspCreationModal
          isOpen={uspModalOpen}
          onClose={handleCloseUspModal}
          onSave={handleSaveUsp}
          editData={editingUsp}
        />
      )}

      {/* Featured Group Creation Modal */}
      {featuredModalOpen && (
        <FeaturedGroupCreationModal
          isOpen={featuredModalOpen}
          onClose={handleCloseFeaturedModal}
          onSave={handleSaveFeatured}
          editData={editingFeatured}
        />
      )}
    </div>
  );
};

export default Services;