'use client';

import { useState } from "react";
import { InfoIcon, Trash2, X } from "lucide-react";
import FAQModal from "./component/FAQModal";
import { toast } from 'react-hot-toast';


const FaqAndInsta = ({ formData, updateFormData, goToNextStep, goToPrevStep, pageId }) => {
  // State for modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  // State for modal forms
  const [faqFormData, setFaqFormData] = useState({
    question: "",
    answer: ""
  });

  // State for editing
  const [editingIndex, setEditingIndex] = useState(-1);

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle FAQ modal input changes
  const handleFaqFormChange = (e) => {
    const { name, value } = e.target;
    setFaqFormData({
      ...faqFormData,
      [name]: value
    });
  };

  // Open FAQ modal
  const openFaqModal = () => {
    setIsFaqModalOpen(true);
  };

  // Close FAQ modal
  const closeFaqModal = () => {
    setIsFaqModalOpen(false);
    setFaqFormData({
      question: "",
      answer: ""
    });
    setEditingIndex(-1);
  };

  // Save FAQ
  const saveFaq = () => {
    const newFaqs = [...(formData.faqs || [])];

    if (editingIndex >= 0) {
      // Edit existing FAQ
      newFaqs[editingIndex] = { ...faqFormData };
    } else {
      // Add new FAQ
      newFaqs.push({ ...faqFormData });
    }

    updateFormData({
      ...formData,
      faqs: newFaqs
    });

    closeFaqModal();
  };

  // Edit FAQ
  const editFaq = (index) => {
    setFaqFormData({
      ...formData.faqs[index]
    });
    setEditingIndex(index);
    setIsFaqModalOpen(true);
  };

  // Delete FAQ
  const deleteFaq = (index) => {
    const newFaqs = [...(formData.faqs || [])];
    newFaqs.splice(index, 1);
    updateFormData({
      ...formData,
      faqs: newFaqs
    });
  };

  function handleNext() {
    // console.log("form data in faq", formData);
    goToNextStep();
  }

  const handleUpdateData = async (state) => {
    try {
      const response = await fetch(`/api/updateData?id=${pageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("Update Successful:", data);
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error updating data:", error.message);
      toast.error("Something went wrong while saving data");
    }
  };


  return (
    <div className="flex flex-col h-[88vh]">
      {/* Left sidebar for title and tooltip */}
      <div className="flex flex-1">
        <div className="w-1/3 bg-pink-50 p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              FAQ
            </h1>
          </div>

          <div className="flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              FAQs help address common questions and concerns your visitors might have.
              Clear, concise answers build trust and improve user experience.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 overflow-y-auto relative">
          {/* Headings Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">FAQ's</h2>

            {/* Heading & Sub Heading inputs */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  name="faq_heading"
                  value={formData.faq_heading || ""}
                  onChange={handleInputChange}
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
                  name="faq_sub_heading"
                  value={formData.faq_sub_heading || ""}
                  onChange={handleInputChange}
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">FAQs</h2>

            {/* FAQs Display */}
            {formData.faqs && formData.faqs.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => editFaq(index)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{faq.question}</h4>
                      {/* <p className="text-gray-500 text-sm mt-1 truncate">{faq.answer}</p> */}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFaq(index);
                      }}
                      className="ml-4 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Create New FAQ Button */}
            <div className="mb-6">
              <button
                onClick={openFaqModal}
                className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition"
              >
                Create New
              </button>
            </div>
          </div>

          {/* Social Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Social Media</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Heading
                </label>
                <input
                  type="text"
                  name="social_heading"
                  value={formData.social_heading || ""}
                  onChange={handleInputChange}
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insta Id
                </label>
                <input
                  type="text"
                  name="insta_id"
                  value={formData.insta_id || ""}
                  onChange={handleInputChange}
                  placeholder="Elodent - Dental Implants Offer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {/* <div className="fixed bottom-0 w-full left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end mt-12 space-x-4">
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
            <button
              type="button"
              onClick={() => handleUpdateData(formData)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-md font-medium transition-colors duration-200"
            >
              SAVE
            </button>
          </div> */}
        </div>
      </div>

      {/* Render Modal */}
      <FAQModal
        isFaqModalOpen={isFaqModalOpen}
        editingIndex={editingIndex}
        closeFaqModal={closeFaqModal}
        saveFaq={saveFaq}
        faqFormData={faqFormData}
        handleFaqFormChange={handleFaqFormChange}
      />
    </div>
  );
};

export default FaqAndInsta;