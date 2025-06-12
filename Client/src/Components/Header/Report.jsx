import React, { useState } from 'react';

const Report = () => {
  const [reportType, setReportType] = useState('bug');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', { reportType, description });
    // In a real application, you would send this data to a backend
    alert('Report Submitted! Thank you for your feedback.');
    setReportType('bug');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Report an Issue</h1>
      <p className="text-lg text-gray-600 mb-8">Help us improve by reporting any bugs or issues you encounter.</p>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Type of Issue</label>
            <select
              id="reportType"
              name="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue in detail..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report; 