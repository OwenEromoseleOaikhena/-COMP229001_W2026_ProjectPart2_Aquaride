// ============================================================
// Student ID: 301475618
// App: AquaRide
// Description: Footer component - consistent footer across all pages
// ============================================================

import React from 'react';

const Footer = () => (
  <footer className="bg-primary text-white text-center py-3 mt-auto">
    <p className="mb-0">© {new Date().getFullYear()} AquaRide. COMP229 Web Application Development.</p>
  </footer>
);

export default Footer;
