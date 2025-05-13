'use client'
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  LayoutListIcon,
  TrendingUpIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';
import { useAuth } from './context/AuthContext'; // adjust the path as needed
import { useRouter } from 'next/navigation';
import PagesContent from './components/dashboard/Pages/PagesContent';
import AnalyticsContent from './components/dashboard/Analytics/AnalyticsContent';
import LeadsContent from './components/dashboard/Leads/LeadsContent';
 
export default function Home() {
  const { isLoggedIn, loading, setAuth, setIsLoggedIn } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeContent, setActiveContent] = useState('pages');
  const router = useRouter();
  const [landingPageData, setLandingPageData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [loading, isLoggedIn, router]);

  // Fetch Landing Pages
   const fetchLandingPageData = async (userId) => {
    console.log("user id", userId)
      try {
        const res = await fetch('/api/allLandingPages');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const filterLandingPages = data.data.filter((item) => item.user_created == userId);
        setLandingPageData(filterLandingPages);
        setSearchData(filterLandingPages);

        // console.log("landing page data", data);
         
        // setLandingPageData(data);
      } catch (err) {
        alert('Failed to Fetch Landing Page Data:', err);
        // console.error(err);
      }
    };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/getUsers');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        const loginData = JSON.parse(localStorage.getItem('auth'));
        const filterData = data.data.filter((item)=> item?.email == loginData?.email);
         
        if(filterData?.length > 0){
          fetchLandingPageData(filterData[0]?.id);

        }

        // console.log("user data", data);
       
      } catch (err) {
        alert('Error fetching users:', err);
        // Optionally handle error (e.g., show error message to user)
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  // If still loading, show loading state
  if (loading) return <div>Loading...</div>;

  // Render content based on active section
  const renderContent = () => {
    switch (activeContent) {
      case 'pages':
        return <PagesContent landingPageData={landingPageData} setLandingPageData={setLandingPageData} searchData={searchData} setSearchData={setSearchData}  />;
      case 'leads':
        return <LeadsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      default:
        return <PagesContent />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`
        bg-white border-r transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
        flex flex-col justify-between p-4
      `}>
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-4 right-4 z-10 bg-gray-100 p-2 rounded-full"
        >
          {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>

        <div className="mt-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>

          {/* Create Page Button */}
          <button
            className={`
              w-full flex items-center justify-center 
              border-2 border-dashed border-gray-300 
              p-3 rounded-lg mb-8 cursor-pointer
              hover:border-blue-500 transition
            `}
            onClick={() => router.push('/create-page')}
          >
            <PlusIcon className="mr-2" />
            {!isSidebarCollapsed && <span>Create Page</span>}
          </button>

          {/* Navigation Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveContent('pages')}
              className={`
                w-full flex items-center p-3 rounded-lg
                ${activeContent === 'pages' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
              `}
            >
              <LayoutListIcon className="mr-2" />
              {!isSidebarCollapsed && <span>Pages</span>}
            </button>

            <button
              onClick={() => setActiveContent('leads')}
              className={`
                w-full flex items-center p-3 rounded-lg
                ${activeContent === 'leads' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}
              `}
            >
              <TrendingUpIcon className="mr-2" />
              {!isSidebarCollapsed && <span>Leads</span>}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          <LogOutIcon className="mr-2" />
          {!isSidebarCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">
            {activeContent.charAt(0).toUpperCase() + activeContent.slice(1)} Dashboard
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}