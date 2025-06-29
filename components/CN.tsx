// components/CN.tsx
"use client"; 

import React from 'react';
import Navbar from './Navbar'; 
import { usePathname } from 'next/navigation';

const CN = () => {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/journal");

   
    if (!isDashboard) {
        return <Navbar />;
    }


    return null; 
    
    
};

export default CN;