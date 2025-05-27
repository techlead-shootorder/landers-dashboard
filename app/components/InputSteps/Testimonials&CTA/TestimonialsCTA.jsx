'use client';

import { useState } from "react";
import { InfoIcon, Trash2, X } from "lucide-react";
import TestimonialModal from "./components/TestimonialModal";
import CTAModal from "./components/CTAModal";
import { toast } from 'react-hot-toast';


const TestimonialsCTA = ({ formData, updateFormData, goToNextStep, goToPrevStep, handleUploadData }) => {
  // State for modals
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);
  
  // State for editing
  const [editingIndex, setEditingIndex] = useState(-1);
  
  // State for validation errors
  const [validationErrors, setValidationErrors] = useState([]);
  
  // State for testimonial form
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    testimonial: ""
  });
  
  // State for CTA form
  const [ctaFormData, setCtaFormData] = useState({
    cta_type: "Primary",
    cta: "",
    Name: ""
  });
  
  // Validation function
  const validateForm = () => {
    const errors = [];
    
    // 1. Heading is mandatory
    if (!formData.testimonial_section_heading?.trim()) {
      errors.push("Testimonial section heading is required");
      toast.error("Testimonial section heading is required");
    }
    
    // 2. Manual toggle validation
    if (formData.testimonial_selector) {
      // If manual is ON - at least 5 testimonials required
      const testimonials = formData.testimonials || [];
      if (testimonials.length < 5) {
        errors.push("At least 5 testimonials are required when manual mode is enabled");
         toast.error("At least 5 testimonials are required when manual mode is enabled");
      }
      
      // Check each testimonial has required fields
      testimonials.forEach((testimonial, index) => {
        if (!testimonial.name?.trim()) {
          errors.push(`Testimonial ${index + 1}: Name is required`);
          toast.error(`Testimonial ${index + 1}: Name is required`);
        }
        if (!testimonial.testimonial?.trim()) {
          errors.push(`Testimonial ${index + 1}: Testimonial text is required`);
          toast.error(`Testimonial ${index + 1}: Testimonial text is required`);
        }
      });
    } else {
      // If manual is OFF - Google Place ID is mandatory
      if (!formData.google_place_id?.trim()) {
        errors.push("Google Place ID is required when automatic testimonials are enabled");
        toast.error("Google Place ID is required when automatic testimonials are enabled");
      }
    }
    
    // 3. At least 1 CTA is mandatory
    const ctas = formData.cta_selector || [];
    if (ctas.length < 1) {
      errors.push("At least 1 CTA (Call-to-Action) is required");
      toast.error("At least 1 CTA (Call-to-Action) is required");
    }
    
    // Check each CTA has required fields
    ctas.forEach((cta, index) => {
      if (!cta.cta?.trim()) {
        errors.push(`CTA ${index + 1}: Action type is required`);
         toast.error(`CTA ${index + 1}: Action type is required`);
      }
      if (!cta.Name?.trim()) {
        errors.push(`CTA ${index + 1}: Name is required`);
         toast.error(`CTA ${index + 1}: Name is required`);
      }
    });
    
    return errors;
  };
  
  // Validate testimonial form before saving
  const validateTestimonialForm = () => {
    const errors = [];
    
    if (!testimonialFormData.name?.trim()) {
      errors.push("Name is required");
      toast.error("Name is required");
    }
    
    if (!testimonialFormData.testimonial?.trim()) {
      errors.push("Testimonial text is required");
      toast.error("Testimonial text is required");
    }
    
    return errors;
  };
  
  // Validate CTA form before saving
  const validateCtaForm = () => {
    const errors = [];
    
    if (!ctaFormData.cta?.trim()) {
      errors.push("CTA action type is required");
      toast.error("CTA action type is required");
    }
    
    if (!ctaFormData.Name?.trim()) {
      errors.push("CTA name is required");
      toast.error("CTA name is required");
    }
    
    return errors;
  };
  
  // Toggle testimonial switch
  const toggleTestimonialSwitch = () => {
    const newSwitchState = !formData.testimonial_selector;
    updateFormData({
      ...formData,
      testimonial_selector: newSwitchState
    });
    
    // Clear validation errors when switching modes
    setValidationErrors([]);
  };
  
  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };
  
  // Handle testimonial modal input changes
  const handleTestimonialFormChange = (e) => {
    const { name, value } = e.target;
    setTestimonialFormData({
      ...testimonialFormData,
      [name]: value
    });
  };
  
  // Handle CTA modal input changes
  const handleCtaFormChange = (e) => {
    const { name, value } = e.target;
    setCtaFormData({
      ...ctaFormData,
      [name]: value
    });
  };
  
  // Open testimonial modal
  const openTestimonialModal = () => {
    setIsTestimonialModalOpen(true);
  };
  
  // Close testimonial modal
  const closeTestimonialModal = () => {
    setIsTestimonialModalOpen(false);
    setTestimonialFormData({
      name: "",
      testimonial: ""
    });
    setEditingIndex(-1);
  };
  
  // Open CTA modal
  const openCtaModal = () => {
    setIsCtaModalOpen(true);
  };
  
  // Close CTA modal
  const closeCtaModal = () => {
    setIsCtaModalOpen(false);
    setCtaFormData({
      cta_type: "Primary",
      cta: "",
      Name: ""
    });
    setEditingIndex(-1);
  };
  
  // Save testimonial with validation
  const saveTestimonial = () => {
    const testimonialErrors = validateTestimonialForm();
    
    if (testimonialErrors.length > 0) {
      // alert(testimonialErrors.join('\n'));
      return;
    }
    
    const newTestimonials = [...(formData.testimonials || [])];
    
    if (editingIndex >= 0) {
      // Edit existing testimonial
      newTestimonials[editingIndex] = { ...testimonialFormData };
    } else {
      // Add new testimonial
      newTestimonials.push({ ...testimonialFormData });
    }
    
    updateFormData({
      ...formData,
      testimonials: newTestimonials
    });
    
    closeTestimonialModal();
    
    // Clear validation errors if they exist
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };
  
  // Save CTA with validation
  const saveCta = () => {
    const ctaErrors = validateCtaForm();
    
    if (ctaErrors.length > 0) {
      // toast.error(ctaErrors.join('\n'));
      return;
    }
    
    const newCtas = [...(formData.cta_selector || [])];
    
    if (editingIndex >= 0) {
      // Edit existing CTA
      newCtas[editingIndex] = { ...ctaFormData };
    } else {
      // Add new CTA
      newCtas.push({ ...ctaFormData });
    }
    
    updateFormData({
      ...formData,
      cta_selector: newCtas
    });
    
    closeCtaModal();
    
    // Clear validation errors if they exist
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };
  
  // Edit testimonial
  const editTestimonial = (index) => {
    setTestimonialFormData({
      ...formData.testimonials[index]
    });
    setEditingIndex(index);
    setIsTestimonialModalOpen(true);
  };
  
  // Edit CTA
  const editCta = (index) => {
    setCtaFormData({
      ...formData.cta_selector[index]
    });
    setEditingIndex(index);
    setIsCtaModalOpen(true);
  };
  
  // Delete testimonial
  const deleteTestimonial = (index) => {
    const newTestimonials = [...(formData.testimonials || [])];
    newTestimonials.splice(index, 1);
    updateFormData({
      ...formData,
      testimonials: newTestimonials
    });
  };
  
  // Delete CTA
  const deleteCta = (index) => {
    const newCtas = [...(formData.cta_selector || [])];
    newCtas.splice(index, 1);
    updateFormData({
      ...formData,
      cta_selector: newCtas
    });
  };

  const handleNext = () => {
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
    
    // console.log("formData in testimonial", formData);
    handleUploadData()
  }

  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Set Up Testimonials & CTA
            </h1>
          </div>

          <div className="flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Testimonials build trust with potential customers. CTAs (Calls to Action) guide visitors to take the next step. Use clear, compelling language for both.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 overflow-y-auto">
          {/* Validation Errors Display */}
          {/* {validationErrors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-red-800 font-medium mb-2">Please fix the following errors:</h4>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )} */}
          
          {/* Testimonials Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Testimonials</h2>
            
            {/* Heading & Sub Heading inputs */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="testimonial_section_heading"
                  value={formData.testimonial_section_heading || ""}
                  onChange={handleInputChange}
                  placeholder="Elodent - Dental Implants Offer"
                  className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                    !formData.testimonial_section_heading?.trim() && validationErrors.length > 0
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                />
                {!formData.testimonial_section_heading?.trim() && validationErrors.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">This field is required</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Heading
                </label>
                <input
                  type="text"
                  name="testimonial_section_sub_heading"
                  value={formData.testimonial_section_sub_heading || ""}
                  onChange={handleInputChange}
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
            
            {/* Testimonial Selector Switch */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manual
              </label>
              <div 
                className={`relative w-12 h-6 rounded-full cursor-pointer ${formData.testimonial_selector ? 'bg-rose-500' : 'bg-gray-300'}`}
                onClick={toggleTestimonialSwitch}
              >
                <div 
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${formData.testimonial_selector ? 'transform translate-x-7' : 'transform translate-x-1'}`}
                ></div>
              </div>
            </div>
            
            {/* Testimonial Text Input or Button based on switch */}
            {!formData.testimonial_selector ? (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Place Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="google_place_id"
                  value={formData.google_place_id || ""}
                  onChange={handleInputChange}
                  placeholder="Google Place Id"
                  className={`w-full px-4 py-3 border rounded-md focus:ring-rose-500 focus:border-rose-500 ${
                    !formData.google_place_id?.trim() && validationErrors.length > 0
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  }`}
                />
                {!formData.google_place_id?.trim() && validationErrors.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">Google Place ID is required for automatic testimonials</p>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={openTestimonialModal}
                    className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
                  >
                    Create New
                  </button>
                  <div className="text-sm text-gray-600">
                    {formData.testimonials?.length || 0} of 5 required testimonials
                    {formData.testimonials?.length >= 5 && (
                      <span className="text-green-600 ml-2">✓ Complete</span>
                    )}
                  </div>
                </div>
                
                {/* Show requirement warning */}
                {formData.testimonials?.length < 5 && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 text-sm">
                      <span className="font-medium">Note:</span> You need at least 5 testimonials in manual mode. 
                      Currently you have {formData.testimonials?.length || 0} testimonial(s).
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Testimonial Grid Display */}
            {formData.testimonial_selector && formData.testimonials && formData.testimonials.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {formData.testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 p-4 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => editTestimonial(index)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTestimonial(index);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 truncate">{testimonial.testimonial}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* CTA Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">CTA</h2>
            
            {/* Create New CTA Button */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={openCtaModal}
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
                >
                  Create New
                </button>
                <div className="text-sm text-gray-600">
                  {formData.cta_selector?.length || 0} CTA(s) created
                  {formData.cta_selector?.length >= 1 && (
                    <span className="text-green-600 ml-2">✓ Complete</span>
                  )}
                </div>
              </div>
              
              {/* Show requirement warning */}
              {(!formData.cta_selector || formData.cta_selector.length === 0) && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    <span className="font-medium">Required:</span> You need at least 1 CTA (Call-to-Action) button for your landing page.
                  </p>
                </div>
              )}
            </div>
            
            {/* CTA Display */}
            {formData.cta_selector && formData.cta_selector.length > 0 && (
              <div className="space-y-4 mt-6 mb-10">
                {formData.cta_selector.map((cta, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => editCta(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        cta.cta_type === 'Primary' ? 'bg-rose-100 text-rose-800' : 
                        cta.cta_type === 'Secondary' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {cta.cta_type}
                      </span>
                      <span className="font-medium text-gray-800">{cta.Name}</span>
                      <span className="text-gray-500 text-sm">({cta.cta})</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCta(index);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
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
      
      {/* Render Modals */}
      <TestimonialModal 
        isTestimonialModalOpen={isTestimonialModalOpen} 
        editingIndex={editingIndex} 
        closeTestimonialModal={closeTestimonialModal} 
        saveTestimonial={saveTestimonial} 
        testimonialFormData={testimonialFormData} 
        handleTestimonialFormChange={handleTestimonialFormChange}
      />
      <CTAModal 
        isCtaModalOpen={isCtaModalOpen} 
        editingIndex={editingIndex} 
        closeCtaModal={closeCtaModal} 
        ctaFormData={ctaFormData} 
        handleCtaFormChange={handleCtaFormChange} 
        saveCta={saveCta} 
      />
    </div>
  );
};

export default TestimonialsCTA;