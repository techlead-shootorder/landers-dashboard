'use client';

import { useState, useRef } from "react";
import { InfoIcon, X, Trash2, Loader2 } from "lucide-react";
import { LuUpload } from "react-icons/lu";

const AboutUs = ({ formData, updateFormData, goToNextStep, goToPrevStep }) => {
  const bannerInputRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [previews, setPreviews] = useState({
    about_us_image: formData.about_us_image ? 
      (typeof formData.about_us_image === 'string' ? 
        `https://app.shootorder.com/assets/${formData.about_us_image}` : 
        URL.createObjectURL(formData.about_us_image)) : null,
  });

  // Handle adding a new highlight
  const handleAddHighlight = () => {
    const currentHighlights = formData.highlights || [];
    if (currentHighlights.length >= 5) {
      alert("Maximum 5 highlights allowed");
      return;
    }

    updateFormData({
      ...formData,
      highlights: [
        ...currentHighlights,
        { highlight: "", highlight_description: "" }
      ]
    });
  };

  // Handle removing a highlight
  const handleRemoveHighlight = (index) => {
    const currentHighlights = formData.highlights || [];
    const updatedHighlights = [...currentHighlights];
    updatedHighlights.splice(index, 1);

    updateFormData({
      ...formData,
      highlights: updatedHighlights
    });
  };

  // Handle highlight input changes
  const handleHighlightChange = (index, field, value) => {
    const currentHighlights = formData.highlights || [];
    const updatedHighlights = [...currentHighlights];
    updatedHighlights[index][field] = value;

    updateFormData({
      ...formData,
      highlights: updatedHighlights
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/uploadImage', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      console.log('Upload Image result:', result);



      // Update form data with the image ID
      updateFormData({
        ...formData,
        about_us_image: result?.data?.id,
      });

      // Set preview URL
      setPreviews({
        ...previews,
        about_us_image: `https://app.shootorder.com/assets/${result?.data?.id}`,
      });

      // Success notification could be added here
      console.log('Image uploaded successfully');

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle removing uploaded images
  const handleRemoveImage = (fieldName) => {
    // Revoke the object URL to avoid memory leaks (only if it's a blob URL)
    if (previews[fieldName] && previews[fieldName].startsWith('blob:')) {
      URL.revokeObjectURL(previews[fieldName]);
    }

    // Reset the file input
    if (fieldName === 'about_us_image') bannerInputRef.current.value = null;

    // Update states
    updateFormData({
      ...formData,
      [fieldName]: null,
    });

    setPreviews({
      ...previews,
      [fieldName]: null,
    });
  };

  // Handle next button click
  const handleNext = () => {
    goToNextStep();
  };

  // Handle previous button click
  const handlePrevious = () => {
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
        <div className="w-2/3 bg-white p-12 relative">
          {/* Highlights Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Highlights</h2>
            <p className="text-gray-600 text-sm mb-4">Add minimum 3 highlights and maximum 5 highlights</p>

            {/* Display existing highlights */}
            {(formData.highlights || []).map((highlight, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="w-5/12">
                  <label htmlFor={`highlight-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Highlight Text
                  </label>
                  <input
                    type="text"
                    id={`highlight-${index}`}
                    value={highlight.highlight || ""}
                    onChange={(e) => handleHighlightChange(index, "highlight", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. 10,000+"
                  />
                </div>

                <div className="w-5/12">
                  <label htmlFor={`highlight-desc-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Highlight Subtext
                  </label>
                  <input
                    type="text"
                    id={`highlight-desc-${index}`}
                    value={highlight.highlight_description || ""}
                    onChange={(e) => handleHighlightChange(index, "highlight_description", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Clients"
                  />
                </div>

                <div className="self-end mb-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="">
              <button
                className="bg-gray-300 rounded-md p-2 hover:bg-gray-400 transition-colors duration-200"
                onClick={handleAddHighlight}
                disabled={(formData.highlights || []).length >= 5}
              >
                Create Highlight
              </button>
            </div>
          </div>

          {/* About Us Section */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">About Us</h2>

          <div className="grid grid-cols-1 gap-6">
            {/* About Us Heading field */}
            <div className="flex gap-6">
              <div className="w-1/2">
                <label htmlFor="about_us_heading" className="block text-sm font-medium text-gray-700 mb-1">
                  About Us Heading
                </label>
                <input
                  type="text"
                  id="about_us_heading"
                  name="about_us_heading"
                  value={formData.about_us_heading || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="About Us Heading"
                />
              </div>

              {/* About Us Sub Heading field */}
              <div className="w-1/2">
                <label htmlFor="about_us_sub_heading" className="block text-sm font-medium text-gray-700 mb-1">
                  About Us Sub Heading
                </label>
                <input
                  type="text"
                  id="about_us_sub_heading"
                  name="about_us_sub_heading"
                  value={formData.about_us_sub_heading || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="About Us Sub Heading"
                />
              </div>
            </div>

            <div className="flex gap-6 w-full">
              {/* About Us Content field */}
              <div className="w-1/2">
                <label htmlFor="about_us_content" className="block text-sm font-medium text-gray-700 mb-1">
                  About Us Content
                </label>
                <textarea
                  type="text"
                  id="about_us_content"
                  name="about_us_content"
                  rows="6"
                  value={formData.about_us_content || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter about us content here"
                />
              </div>

              {/* Embed Code field */}
              <div className="w-1/2">
                <label htmlFor="embed_code" className="block text-sm font-medium text-gray-700 mb-1">
                 Youtube Embed Code
                </label>
                <textarea
                  id="embed_code"
                  name="embed_code"
                  value={formData.embed_code || ""}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste embed code here"
                />
              </div>
            </div>

            {/* About uploads section */}
            <div className="grid grid-cols-2 gap-6 mt-4 mb-10">
              {/* About image upload */}
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">About Us Image</p>
                <div className="flex flex-col">
                  {previews.about_us_image ? (
                    <div className="relative mb-2">
                      <img
                        src={previews.about_us_image}
                        alt="About Us preview"
                        className="w-32 h-32 object-cover border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage('about_us_image')}
                        className="absolute -top-2 left-[117] bg-red-500 text-white rounded-full p-1"
                        disabled={uploadLoading}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current.click()}
                      disabled={uploadLoading}
                      className="flex items-center gap-2 w-fit text-white px-4 py-2 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 mb-2 disabled:bg-rose-300 disabled:cursor-not-allowed"
                    >
                      {uploadLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LuUpload className="font-bold" />
                      )}
                      {uploadLoading ? 'Uploading...' : 'Upload Image'}
                    </button>
                  )}
                  <input
                    type="file"
                    ref={bannerInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;