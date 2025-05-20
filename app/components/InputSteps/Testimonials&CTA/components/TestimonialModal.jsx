import React from 'react'
import { X } from "lucide-react";

 // Testimonial Modal Component
  const TestimonialModal = ({isTestimonialModalOpen, editingIndex, closeTestimonialModal, saveTestimonial, testimonialFormData, handleTestimonialFormChange}) => {
    if (!isTestimonialModalOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
        <div className="bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out translate-x-0">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
            <h3 className="text-lg font-medium text-white">
              {editingIndex >= 0 ? "Edit Testimonial" : "Create New Testimonial"}
            </h3>
            <button
              onClick={closeTestimonialModal}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={testimonialFormData.name}
                onChange={handleTestimonialFormChange}
                placeholder="Client name"
                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Identifier</label>
              <input
                type="text"
                name="identifier"
                value={testimonialFormData.identifier}
                onChange={handleTestimonialFormChange}
                placeholder="Company or position"
                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial</label>
              <textarea
                name="testimonial"
                value={testimonialFormData.testimonial}
                onChange={handleTestimonialFormChange}
                placeholder="Client testimonial"
                rows={4}
                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
            <button
              onClick={closeTestimonialModal}
              className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-900 hover:bg-opacity-20 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={saveTestimonial}
              className="px-4 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {editingIndex >= 0 ? "Save Changes" : "Create New"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialModal;