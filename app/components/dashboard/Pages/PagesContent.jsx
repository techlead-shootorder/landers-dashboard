import { useState, useEffect } from 'react'
import { Eye, Edit, Search } from 'lucide-react'
import PageContentSkeleton from './PageContentSkeleton' // Import the skeleton component

const PagesContent = ({ landingPageData, setLandingPageData, searchData, setSearchData }) => {
    const orig = "https://app.shootorder.com/assets/";
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    console.log("landing page data", landingPageData)

    // Set loading to false once data is available
    useEffect(() => {
        if (landingPageData && landingPageData.length > 0) {
            setIsLoading(false);
        }
    }, [landingPageData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);

        if (e.target.value == '') {
            setSearchData(landingPageData);
            
            return;
        }

        if (landingPageData.length > 0) {
            const searchPages = landingPageData.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            if (searchPages.length > 0) {
                setSearchData(searchPages);
            } else {
                setSearchData([]);
            }
        }
    }

    const handleRedirection = (slug) => {
        window.open(`https://landers.co.in/${slug}`, '_blank');
    }

    // If loading, show skeleton
    if (isLoading) {
        return <PageContentSkeleton />;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Pages</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search pages..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
            </div>
            <p className="mb-6">Here you can manage your pages content.</p>

            {searchData && searchData.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {searchData.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                            {/* Image with overlay */}
                            <div className="relative">
                                <img
                                    src={`${orig}${item.mobile_banner}`}
                                    alt={item.name}
                                    className="w-full h-48 object-cover"
                                />
                                {/* Semi-transparent overlay */}
                                <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                    {/* <button className="mx-2 px-4 py-2 rounded-md text-white flex items-center">
                    <Eye className="mr-2" size={16} />
                    Preview
                  </button> */}
                                    {/* <button className="mx-2 px-4 py-2 rounded-md bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-300 flex items-center">
                    <Edit className="mr-2" size={16} />
                    Edit
                  </button> */}
                                </div>
                            </div>

                            {/* Top left eye icon for preview */}
                            <button className="absolute top-2 left-2 w-8 h-8 text-white hover:bg-white hover:text-black border border-white cursor-pointer bg-opacity-80 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-300" 
                            onClick={() => handleRedirection(item.slug)}>
                                <Eye size={16} />
                            </button>

                            {/* Top right edit button */}
                            <button className="cursor-pointer absolute top-2 right-2 px-3 py-1 bg-transparent border border-white text-white hover:text-black hover:bg-white text-sm rounded hover:bg-opacity-20 transition-colors duration-300">
                                Edit
                            </button>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PagesContent