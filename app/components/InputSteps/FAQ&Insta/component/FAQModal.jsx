import { X } from "lucide-react";

const FAQModal = ({ isFaqModalOpen, editingIndex, closeFaqModal, saveFaq, faqFormData, handleFaqFormChange }) => {
  if (!isFaqModalOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-[#121621] h-full overflow-y-auto shadow-xl w-full max-w-md transform transition-transform duration-500 ease-out translate-x-0">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#121621] z-10">
          <h3 className="text-lg font-medium text-white">
            {editingIndex >= 0 ? "Edit FAQ" : "Create New FAQ"}
          </h3>
          <button
            onClick={closeFaqModal}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
            <input
              type="text"
              name="question"
              value={faqFormData.question}
              onChange={handleFaqFormChange}
              placeholder="Enter your question"
              className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Answer</label>
            <textarea
              name="answer"
              value={faqFormData.answer}
              onChange={handleFaqFormChange}
              placeholder="Enter your answer"
              rows={4}
              className="w-full p-3 bg-[#1A1F2E] text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end sticky bottom-0 bg-[#121621]">
          <button
            onClick={closeFaqModal}
            className="mr-3 px-4 py-2 border border-rose-500 text-rose-500 rounded-md hover:bg-rose-900 hover:bg-opacity-20 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={saveFaq}
            className="px-4 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {editingIndex >= 0 ? "Save Changes" : "Create New"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;