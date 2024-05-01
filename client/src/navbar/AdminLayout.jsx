import React from 'react';
import { NavbarAdmin } from './NavbarAdmin';

function AdminLayout({ children }) {
    return (
        <div className=''>
            <NavbarAdmin />
            <div className="container mx-auto px-4">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
