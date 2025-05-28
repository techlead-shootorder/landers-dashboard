'use client';

import { useState, useRef, useEffect } from "react";
import { InfoIcon, X, Trash2, Loader2 } from "lucide-react";
import { LuUpload } from "react-icons/lu";
import { toast } from 'react-hot-toast';

const GallerySection = ({ formData, updateFormData, goBackToAddOn, setCurrentStep }) => {
  const fileInputRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  // Fetch existing gallery images on component mount
  useEffect(() => {
    if (formData.id) {
      fetchGalleryImages();
    }
  }, [formData.id]);

  // Fetch gallery images from API
  const fetchGalleryImages = async () => {
    try {
      setLoadingGallery(true);
      const response = await fetch(
        `https://app.shootorder.com/items/lander?fields[]=*,gallery.*&filter[id]=${formData.id}&access_token=Hjc4p5RuiTn1P3cB9IZEuW1dNhV_ZWsS`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }

      const result = await response.json();
      const gallery = result?.data[0]?.gallery || [];
    //   console.log("result", result.data[0].gallery);
    //   console.log("gallery", gallery);
      setGalleryImages(gallery);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setLoadingGallery(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      // First upload the image
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const uploadResponse = await fetch('/api/uploadImage', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadResult = await uploadResponse.json();
      console.log('Upload Image result:', uploadResult);

      // Then save the gallery entry
      const galleryData = {
        lander_id: formData.id,
        directus_files_id: uploadResult?.data?.id,
      };

      // Success notification
      toast.success('Gallery image uploaded successfully');
      
      // Refresh gallery images
      await fetchGalleryImages();
      
      // Reset file input
      fileInputRef.current.value = null;

    } catch (error) {
      console.error('Error uploading gallery image:', error);
      toast.error('Failed to upload image. Please try again.', error);
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle removing gallery image
  const handleRemoveImage = async (galleryId) => {
    try {
      const response = await fetch(`/api/removeGalleryImage/${galleryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove image');
      }

      toast.success('Image removed successfully');
      
      // Refresh gallery images
      await fetchGalleryImages();

    } catch (error) {
      console.error('Error removing gallery image:', error);
      toast.error('Failed to remove image. Please try again.');
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = [];

    // Check if at least one gallery image exists
    if (galleryImages.length === 0) {
      errors.push('Please add at least one gallery image');
      toast.error('Please add at least one gallery image');
    }

    return errors;
  };

  // Handle next button click with validation
  const handleNext = () => {
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      return;
    }

    // If validation passes, proceed to next step
    toast.success('Gallery section completed successfully!');

    // Small delay to show success message
    setTimeout(() => {
      handleUploadData();
    }, 500);
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
              Showcase Your Work Gallery
            </h1>
          </div>

          <div className="absolute bottom-4 flex items-start mb-8">
            <InfoIcon className="w-6 h-6 mr-2 text-gray-500 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Add images to showcase your work, portfolio, or services. These images will help visitors understand your capabilities and build trust in your brand.
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-2/3 bg-white p-12 relative">
          {/* Gallery Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Gallery Images <span className="text-red-500">*</span>
            </h2>
            <p className="text-gray-600 text-sm mb-6">Upload images to showcase your work</p>

            {/* Add Image Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={uploadLoading}
                className="flex items-center gap-2 text-white px-6 py-3 rounded-md font-medium bg-rose-500 hover:bg-rose-600 cursor-pointer transition-colors duration-200 disabled:bg-rose-300 disabled:cursor-not-allowed"
              >
                {uploadLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LuUpload className="w-5 h-5 font-bold" />
                )}
                {uploadLoading ? 'Uploading...' : 'Add Image'}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading}
              />
            </div>

            {/* Gallery Images Display */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[300px]">
              {loadingGallery ? (
                <div className="flex items-center justify-center h-48">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Loading gallery images...</span>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <LuUpload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg mb-2">No gallery images yet</p>
                    <p className="text-gray-400 text-sm">Click "Add Image" to upload your first gallery image</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={`https://app.shootorder.com/assets/${image.directus_files_id}`}
                        alt="Gallery image"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery validation indicator */}
            <div className="mt-4">
              <p className={`text-sm ${galleryImages.length > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {galleryImages.length > 0
                  ? `✓ ${galleryImages.length} image${galleryImages.length > 1 ? 's' : ''} added`
                  : 'At least 1 image required'
                }
              </p>
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
      </div>
    </div>
  );
};

export default GallerySection;