
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, FileText, Shield, Server } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  // If user is already logged in, show dashboard instead
  if (user) {
    return <Dashboard />;
  }
  
  return (
    <div className="bg-forensic-navy min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forensic-navy via-forensic-purple/10 to-forensic-navy z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pt-16 pb-16 lg:pt-32 lg:pb-20">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                <span className="block">Digital Forensics</span>
                <span className="block text-forensic-blue">Investigation System</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-gray-300 sm:text-lg md:mt-5 md:text-xl">
                A comprehensive platform for managing digital forensic investigations,
                evidence handling, and case documentation.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link to="/login">
                  <Button className="bg-forensic-blue hover:bg-blue-600 text-white font-semibold py-3 px-8">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-forensic-purple text-forensic-purple hover:bg-forensic-purple/20 font-semibold py-3 px-8">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-forensic-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Key Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
              Our platform provides all the tools needed for professional digital forensic investigations.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-forensic-dark p-6 rounded-lg border border-gray-700">
              <div className="p-3 bg-forensic-blue/20 inline-block rounded-lg mb-4">
                <Database className="h-6 w-6 text-forensic-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white">Evidence Management</h3>
              <p className="mt-2 text-gray-400">
                Secure storage and management of digital evidence with integrity verification.
              </p>
            </div>
            <div className="bg-forensic-dark p-6 rounded-lg border border-gray-700">
              <div className="p-3 bg-forensic-purple/20 inline-block rounded-lg mb-4">
                <FileText className="h-6 w-6 text-forensic-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white">Case Documentation</h3>
              <p className="mt-2 text-gray-400">
                Comprehensive case management with detailed reporting capabilities.
              </p>
            </div>
            <div className="bg-forensic-dark p-6 rounded-lg border border-gray-700">
              <div className="p-3 bg-green-500/20 inline-block rounded-lg mb-4">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Secure Access</h3>
              <p className="mt-2 text-gray-400">
                Role-based authentication system with controlled access to sensitive data.
              </p>
            </div>
            <div className="bg-forensic-dark p-6 rounded-lg border border-gray-700">
              <div className="p-3 bg-amber-500/20 inline-block rounded-lg mb-4">
                <Server className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
              <p className="mt-2 text-gray-400">
                Gain insights and visualize case data with comprehensive analytics tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-16 bg-gradient-to-r from-forensic-navy to-forensic-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to streamline your forensic investigations?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300">
              Join other forensic professionals using our platform to manage digital evidence and investigations.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button className="bg-forensic-blue hover:bg-blue-600 text-white font-semibold py-3 px-8">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-forensic-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              © 2025 ForensicInsight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Import dashboard to use conditionally
import Dashboard from './Dashboard';

export default Index;
