import React from 'react';
import Header from './Header';

import { Outlet } from 'react-router-dom';  // Import Outlet
import SideBar from './SideBar';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header />
            <div className="flex flex-1">
                {/* Sidebar */}
                <SideBar />
                {/* Main content area */}
                <main className="flex-1 p-6 bg-gray-100 text-black">
                    <Outlet /> {/* This renders the matched route component */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
