"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import {
  Home,
  BarChart,
  Users,
  FileText,
  Calendar,
  Mail,
  Settings,
  HelpCircle,
  PlusCircle,
  Eye,
  FileSpreadsheet
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { initialData } from '@/util/data/defaultData'

const DashboardPage = () => {


  const defaultData = { ...initialData }
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    domain: "",
    slug: "",
    phone: "",
    whatsapp: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [username, setUsername] = React.useState(userData.first_name);

  // Sample data for charts
  const pageViewsData = [
    { name: 'Mon', views: 2400 },
    { name: 'Tue', views: 1398 },
    { name: 'Wed', views: 3800 },
    { name: 'Thu', views: 3908 },
    { name: 'Fri', views: 4800 },
    { name: 'Sat', views: 3800 },
    { name: 'Sun', views: 4300 },
  ];

  const weeks = [
    { name: 'Mon', submissions: 24 },
    { name: 'Tue', submissions: 13 },
    { name: 'Wed', submissions: 38 },
    { name: 'Thu', submissions: 39 },
    { name: 'Fri', submissions: 48 },
    { name: 'Sat', submissions: 38 },
    { name: 'Sun', submissions: 43 },
  ];

  const navigationItems = [
    {
      category: "Main",
      items: [
        { icon: <Home className="h-4 w-4" />, label: "Dashboard" },
        { icon: <BarChart className="h-4 w-4" />, label: "Analytics" },
        { icon: <Users className="h-4 w-4" />, label: "Users" }
      ]
    },
    {
      category: "Management",
      items: [
        { icon: <FileText className="h-4 w-4" />, label: "Documents" },
        { icon: <Calendar className="h-4 w-4" />, label: "Calendar" },
        { icon: <Mail className="h-4 w-4" />, label: "Messages" }
      ]
    },
    {
      category: "Support",
      items: [
        { icon: <Settings className="h-4 w-4" />, label: "Settings" },
        { icon: <HelpCircle className="h-4 w-4" />, label: "Help Center" }
      ]
    }
  ];

  const validateSlug = (value) => {
    const regex = /^[a-z0-9-]{3,}$/; // Matches lowercase letters, numbers, hyphens, and a minimum of 3 characters
    return regex.test(value);
  };

  function trimUrl(url) {
    // Use regular expressions to replace http:// or https://
    return url.replace(/^https?:\/\//, '');
  }

  const handleNavigation = (value) => {
    const currentUrl = trimUrl(window.location.href);
    let newSubdomainUrl = '';
    if (currentUrl.startsWith('localhost')) {
      newSubdomainUrl = `http://${value}.localhost:3000/admin`; // to test in developing mode

    }
    else if (currentUrl.startsWith('landers')) {
      newSubdomainUrl = `https://${value}.landers.co.in/admin`; // live
    }
    else if (currentUrl.startsWith('40')) {
      newSubdomainUrl = `https://${value}.40.90.254.119/admin`; // optional
    }

    else if (currentUrl.startsWith('so-lander')) {
      newSubdomainUrl = `https://${value}.so-lander.vercel.app/admin`; // optional
    }
    // const newSubdomainUrl = `http://${subdomain}.landers.co.in`;
    // const newSubdomainUrl = `http://${subdomain}.40.90.254.119`;

    if (newSubdomainUrl) {
      window.location.href = newSubdomainUrl; // Redirects in the same tab
    }
  }

  const validateForm = () => {
    const { name} = formData;
    if (!name ) {
      setError("All fields are required.");
      return false;
    }
    // if (!validateSlug(name)) {
    //   setError(
    //     "Slug must contain only lowercase letters, numbers, hyphens, and be at least 3 characters long."
    //   );
    //   return false;
    // }
    // if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
    //   setError("Invalid domain format. Example: enquiry.clientwebsite.com");
    //   return false;
    // }
    // if (!/^\+\d{10,15}$/.test(whatsapp)) {
    //   setError("Invalid WhatsApp number format. Example: +911234567890");
    //   return false;
    // }
    // if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   setError("Invalid email format.");
    //   return false;
    // }
    setError("");
    return true;
  };

  const handleCreate = async () => {

    if (!validateForm()) {
      return;
    }

    // check if slug is already in use
    try {
      const res = await fetch(`/api/data?subdomain=${formData.name}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const val = await res.json();
      if (val.length > 0) {
        setError("Slug already in use, try different slug");
        return;
      }

    } catch (err) {
      setError("Something Went Wrong");
      return;
    }

    setError(""); // Clear previous errors


    try {
      defaultData.name = formData.name;
      defaultData.company_name = formData.companyName;
      defaultData.domain = formData.domain;
      defaultData.slug = formData.slug;
      defaultData.phone = formData.phone;
      defaultData.whatsapp_number = formData.whatsapp;
      defaultData.email = formData.email;
      console.log("default data", defaultData);
      const response = await fetch("/api/createNewLp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ defaultData }),
      });

      const data = await response.json();
      console.log("data created successfully", data)
      if (data.success) {
        setSuccessMessage("Page created successfully!");
        console.log("page created successfully");
        
        handleNavigation(data.data.data.slug); // Clear input
        setIsModalOpen(false); // Close modal

      } else {
        setError("Failed to create page: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setError("An error occurred while creating the page.");
    }

  };

  const handleChange = (e) => {
    setError("");
    if (e.target.name == "slug") {
      console.log(e.target.value);
    }
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-white shadow-md overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          {/* Create New Page Button */}
          <button
            className="w-full mb-6 flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >

            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Page
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white px-10 py-6 rounded-lg shadow-lg w-[400px] max-h-[90vh] overflow-y-auto text-black">
                <h2 className="text-lg font-bold mb-4 text-blue-700">Enter Your Details</h2>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border outline-2 outline-blue-600 rounded-lg mb-2" />

                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" />

                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <input type="text" name="domain" placeholder="ex: enquiry.clientwebsite.com" value={formData.domain} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" />

                {/* <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input type="text" name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" /> */}

                <h3 className="text-md font-bold mt-4 mb-2 text-blue-700">Contact Info</h3>

                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" />

                <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                <input type="text" name="whatsapp" placeholder="+91XXXXXXXXXX" value={formData.whatsapp} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" />

                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" />

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

                <div className="flex justify-end mt-4">
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleCreate}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-6">
            {navigationItems.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 px-2">
                  {section.category}
                </h3>
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Panel */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-end items-center p-4">
            <Image
              src="/img/ai_profile_image.jpg"
              width="32"
              height="32"
              className='rounded-full mr-2 cursor-pointer'
              alt="User Profile"

            />
            <span className="text-sm font-medium text-blue-600">Welcome, {username}</span>
          </div>
        </header>

        {/* Cards Grid */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Page Views Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Page Views</h3>
                <Eye className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold mb-2">24.7K</div>
              <div className="text-xs text-gray-500 mb-4">+20.1% from last week</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pageViewsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Featured Pages Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Featured Pages</h3>
                <FileText className="h-4 w-4 text-gray-500" />
              </div>
              <div className="space-y-4">
                {/* Featured Page 1 */}
                <div className="flex items-center space-x-4">
                  <img
                    src="/api/placeholder/100/100"
                    alt="Featured page 1"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">Homepage Redesign</div>
                    <div className="text-sm text-gray-500">8.2K views</div>
                  </div>
                </div>
                {/* Featured Page 2 */}
                <div className="flex items-center space-x-4">
                  <img
                    src="/api/placeholder/100/100"
                    alt="Featured page 2"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">Product Launch</div>
                    <div className="text-sm text-gray-500">6.4K views</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Submissions Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Form Submissions</h3>
                <FileSpreadsheet className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-2xl font-bold mb-2">243</div>
              <div className="text-xs text-gray-500 mb-4">+12.3% from last week</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeks}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#16a34a" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

<style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`}</style>