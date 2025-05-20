import React from 'react'
import { X } from "lucide-react";

// CTA Modal Component
const CTAModal = ({ isCtaModalOpen, editingIndex, closeCtaModal, ctaFormData, handleCtaFormChange, saveCta }) => {
    if (!isCtaModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
            <div className="bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out translate-x-0">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
                    <h3 className="text-lg font-medium text-white">
                        {editingIndex >= 0 ? "Edit CTA" : "Create New CTA"}
                    </h3>
                    <button
                        onClick={closeCtaModal}
                        className="text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CTA Type</label>
                        <div className="relative">
                            <select
                                name="type"
                                value={ctaFormData.type}
                                onChange={handleCtaFormChange}
                                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
                            >
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                                <option value="tertiary">Tertiary</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CTA</label>
                        <div className="relative">
                            <select
                                name="action"
                                value={ctaFormData.action}
                                onChange={handleCtaFormChange}
                                className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent appearance-none"
                            >
                                <option value="" disabled>Select an action...</option>
                                <option value="form">Form</option>
                                <option value="call">Call</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="email">Email</option>
                                <option value="outbound">Outbound Click</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={ctaFormData.name}
                            onChange={handleCtaFormChange}
                            placeholder="CTA name"
                            className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
                    <button
                        onClick={closeCtaModal}
                        className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-900 hover:bg-opacity-20 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveCta}
                        className="px-4 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        {editingIndex >= 0 ? "Save Changes" : "Create New"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CTAModal