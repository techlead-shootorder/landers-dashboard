'use client';

import { useState } from "react";
import { InfoIcon, Trash2, X } from "lucide-react";
import TestimonialModal from "./components/TestimonialModal";
import CTAModal from "./components/CTAModal";

const TestimonialsCTA = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  // Local state for testimonials and CTAs
  const [localFormData, setLocalFormData] = useState({
    testimonials: formData.testimonials || [],
    ctas: formData.ctas || []
  });

  // State for testimonial switch
  const [testimonialSwitchOn, setTestimonialSwitchOn] = useState(false);
  
  // State for modals
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isCtaModalOpen, setIsCtaModalOpen] = useState(false);
  
  // State for text input value
  const [testimonialText, setTestimonialText] = useState("");
  
  // State for modal forms
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    identifier: "",
    testimonial: ""
  });
  
  const [ctaFormData, setCtaFormData] = useState({
    type: "primary",
    action: "",
    name: ""
  });
  
  // State for editing
  const [editingIndex, setEditingIndex] = useState(-1);
  
  // Toggle testimonial switch
  const toggleTestimonialSwitch = () => {
    setTestimonialSwitchOn(!testimonialSwitchOn);
  };
  
  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialText(value);
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
      identifier: "",
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
      type: "primary",
      action: "",
      name: ""
    });
    setEditingIndex(-1);
  };
  
  // Save testimonial
  const saveTestimonial = () => {
    const newTestimonials = [...localFormData.testimonials];
    
    if (editingIndex >= 0) {
      // Edit existing testimonial
      newTestimonials[editingIndex] = { ...testimonialFormData };
    } else {
      // Add new testimonial
      newTestimonials.push({ ...testimonialFormData });
    }
    
    setLocalFormData({
      ...localFormData,
      testimonials: newTestimonials
    });
    
    closeTestimonialModal();
  };
  
  // Save CTA
  const saveCta = () => {
    const newCtas = [...localFormData.ctas];
    
    if (editingIndex >= 0) {
      // Edit existing CTA
      newCtas[editingIndex] = { ...ctaFormData };
    } else {
      // Add new CTA
      newCtas.push({ ...ctaFormData });
    }
    
    setLocalFormData({
      ...localFormData,
      ctas: newCtas
    });
    
    closeCtaModal();
  };
  
  // Edit testimonial
  const editTestimonial = (index) => {
    setTestimonialFormData({
      ...localFormData.testimonials[index]
    });
    setEditingIndex(index);
    setIsTestimonialModalOpen(true);
  };
  
  // Edit CTA
  const editCta = (index) => {
    setCtaFormData({
      ...localFormData.ctas[index]
    });
    setEditingIndex(index);
    setIsCtaModalOpen(true);
  };
  
  // Delete testimonial
  const deleteTestimonial = (index) => {
    const newTestimonials = [...localFormData.testimonials];
    newTestimonials.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      testimonials: newTestimonials
    });
  };
  
  // Delete CTA
  const deleteCta = (index) => {
    const newCtas = [...localFormData.ctas];
    newCtas.splice(index, 1);
    setLocalFormData({
      ...localFormData,
      ctas: newCtas
    });
  };
  
  // Handle next button click
  const handleNext = () => {
    // Update parent form data
    updateFormData(localFormData);
    // Go to next step
    goToNextStep();
  };

  // Testimonial Modal Component
  // const TestimonialModal = ({isTestimonialModalOpen, editingIndex, closeTestimonialModal, saveTestimonial, testimonialFormData, handleTestimonialFormChange}) => {
  //   if (!isTestimonialModalOpen) return null;
    
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
  //       <div className="bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out translate-x-0">
  //         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
  //           <h3 className="text-lg font-medium text-white">
  //             {editingIndex >= 0 ? "Edit Testimonial" : "Create New Testimonial"}
  //           </h3>
  //           <button
  //             onClick={closeTestimonialModal}
  //             className="text-gray-400 hover:text-white"
  //           >
  //             <X size={20} />
  //           </button>
  //         </div>
          
  //         <div className="p-6 space-y-6">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
  //             <input
  //               type="text"
  //               name="name"
  //               value={testimonialFormData.name}
  //               onChange={handleTestimonialFormChange}
  //               placeholder="Client name"
  //               className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
  //             />
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">Identifier</label>
  //             <input
  //               type="text"
  //               name="identifier"
  //               value={testimonialFormData.identifier}
  //               onChange={handleTestimonialFormChange}
  //               placeholder="Company or position"
  //               className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
  //             />
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial</label>
  //             <textarea
  //               name="testimonial"
  //               value={testimonialFormData.testimonial}
  //               onChange={handleTestimonialFormChange}
  //               placeholder="Client testimonial"
  //               rows={4}
  //               className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
  //             />
  //           </div>
  //         </div>
          
  //         <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
  //           <button
  //             onClick={closeTestimonialModal}
  //             className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-900 hover:bg-opacity-20 focus:outline-none"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={saveTestimonial}
  //             className="px-4 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  //           >
  //             {editingIndex >= 0 ? "Save Changes" : "Create New"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  
  // CTA Modal Component
  // const CTAModal = ({isCtaModalOpen, editingIndex, closeCtaModal, ctaFormData, handleCtaFormChange, saveCta}) => {
  //   if (!isCtaModalOpen) return null;
    
  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
  //       <div className="bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out translate-x-0">
  //         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
  //           <h3 className="text-lg font-medium text-white">
  //             {editingIndex >= 0 ? "Edit CTA" : "Create New CTA"}
  //           </h3>
  //           <button
  //             onClick={closeCtaModal}
  //             className="text-gray-400 hover:text-white"
  //           >
  //             <X size={20} />
  //           </button>
  //         </div>
          
  //         <div className="p-6 space-y-6">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">CTA Type</label>
  //             <div className="relative">
  //               <select
  //                 name="type"
  //                 value={ctaFormData.type}
  //                 onChange={handleCtaFormChange}
  //                 className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
  //               >
  //                 <option value="primary">Primary</option>
  //                 <option value="secondary">Secondary</option>
  //                 <option value="tertiary">Tertiary</option>
  //               </select>
  //               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
  //                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  //                 </svg>
  //               </div>
  //             </div>
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">CTA</label>
  //             <div className="relative">
  //               <select
  //                 name="action"
  //                 value={ctaFormData.action}
  //                 onChange={handleCtaFormChange}
  //                 className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
  //               >
  //                 <option value="" disabled>Select an action...</option>
  //                 <option value="form">Form</option>
  //                 <option value="call">Call</option>
  //                 <option value="whatsapp">WhatsApp</option>
  //                 <option value="email">Email</option>
  //                 <option value="outbound">Outbound Click</option>
  //               </select>
  //               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
  //                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  //                 </svg>
  //               </div>
  //             </div>
  //           </div>
            
  //           <div>
  //             <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
  //             <input
  //               type="text"
  //               name="name"
  //               value={ctaFormData.name}
  //               onChange={handleCtaFormChange}
  //               placeholder="CTA name"
  //               className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
  //             />
  //           </div>
  //         </div>
          
  //         <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
  //           <button
  //             onClick={closeCtaModal}
  //             className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-900 hover:bg-opacity-20 focus:outline-none"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={saveCta}
  //             className="px-4 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  //           >
  //             {editingIndex >= 0 ? "Save Changes" : "Create New"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

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
          {/* Testimonials Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Testimonials</h2>
            
            {/* Heading & Sub Heading inputs */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Heading
                </label>
                <input
                  type="text"
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
            
            {/* Testimonial Selector Switch */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonials Selector
              </label>
              <div 
                className={`relative w-12 h-6 rounded-full cursor-pointer ${testimonialSwitchOn ? 'bg-rose-500' : 'bg-gray-300'}`}
                onClick={toggleTestimonialSwitch}
              >
                <div 
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${testimonialSwitchOn ? 'transform translate-x-7' : 'transform translate-x-1'}`}
                ></div>
              </div>
            </div>
            
            {/* Testimonial Text Input or Button based on switch */}
            {!testimonialSwitchOn ? (
              <div className="mb-6">
                <input
                  type="text"
                  name="testimonialText"
                  value={testimonialText}
                  onChange={handleInputChange}
                  placeholder="Enter testimonial text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            ) : (
              <div className="mb-6">
                <button
                  onClick={openTestimonialModal}
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
                >
                  Create New
                </button>
              </div>
            )}
            
            {/* Testimonial Grid Display */}
            {testimonialSwitchOn && localFormData.testimonials.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {localFormData.testimonials.map((testimonial, index) => (
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
                    <p className="text-gray-500 text-sm mt-1">{testimonial.identifier}</p>
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
              <button
                onClick={openCtaModal}
                className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
              >
                Create New
              </button>
            </div>
            
            {/* CTA Display */}
            {localFormData.ctas.length > 0 && (
              <div className="space-y-4 mt-6">
                {localFormData.ctas.map((cta, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => editCta(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        cta.type === 'primary' ? 'bg-rose-100 text-rose-800' : 
                        cta.type === 'secondary' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {cta.type}
                      </span>
                      <span className="font-medium text-gray-800">{cta.name}</span>
                      <span className="text-gray-500 text-sm">({cta.action})</span>
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
      <TestimonialModal isTestimonialModalOpen={isTestimonialModalOpen} editingIndex={editingIndex} closeTestimonialModal={closeTestimonialModal} saveTestimonial={saveTestimonial} testimonialFormData={testimonialFormData} handleTestimonialFormChange={handleTestimonialFormChange}/>
      <CTAModal isCtaModalOpen={isCtaModalOpen} editingIndex={editingIndex} closeCtaModal={closeCtaModal} ctaFormData={ctaFormData} handleCtaFormChange={handleCtaFormChange} saveCta={saveCta} />
    </div>
  );
};

export default TestimonialsCTA;