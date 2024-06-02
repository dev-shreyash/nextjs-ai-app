import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-lg mb-2 text-center">If you have any questions, feel free to reach out to us!</p>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Email:</h2>
          <p className="text-blue-600 hover:underline">
            <a href="mailto:bhosaleshreyash2@gmail.com">bhosaleshreyash2@gmail.com</a>
          </p>
        </div>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold">GitHub:</h2>
          <p className="text-blue-600 hover:underline">
            <a href="https://github.com/dev-shreyash" target="_blank" rel="noopener noreferrer">github.com/dev-shreyash</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
