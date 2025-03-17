import React from 'react';
import Header from './Header';

import { Outlet } from 'react-router-dom';  // Import Outlet
import SideBar from './SideBar';

const Layout = () => {
    return (
        <div >
            {/* Header */}
            <div><Header /></div>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white p-4">
                    <SideBar />
                </div>

                {/* Main content area */}
                <div className="flex-1 bg-gray-100 p-6">
                    <main className="text-black">
                        <Outlet /> {/* This renders the matched route component */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
