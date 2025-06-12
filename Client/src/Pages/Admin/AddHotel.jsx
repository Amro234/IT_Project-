import React, { useState } from 'react';
import { Save, XCircle, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddHotelPage = () => {
  const navigate = useNavigate();

  const [hotelData, setHotelData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    mobile_num: '',
    number_of_rooms: '',
    hotel_ranking: '',
    amenities: [],
    roomTypes: [
      { name: 'Single Room', price: '', quantity: '' },
      { name: 'Double Room', price: '', quantity: '' },
      { name: 'Deluxe Room', price: '', quantity: '' },
    ],
    reviews: [],
    // Add more fields as per your data structure if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...hotelData.amenities];
    newAmenities[index] = value;
    setHotelData(prevData => ({
      ...prevData,
      amenities: newAmenities,
    }));
  };

  const addAmenity = () => {
    setHotelData(prevData => ({
      ...prevData,
      amenities: [...prevData.amenities, ''],
    }));
  };

  const removeAmenity = (index) => {
    const newAmenities = hotelData.amenities.filter((_, i) => i !== index);
    setHotelData(prevData => ({
      ...prevData,
      amenities: newAmenities,
    }));
  };

  const handleRoomTypeChange = (index, e) => {
    const { name, value } = e.target;
    const newRoomTypes = [...hotelData.roomTypes];
    newRoomTypes[index] = {
      ...newRoomTypes[index],
      [name]: value,
    };
    setHotelData(prevData => ({
      ...prevData,
      roomTypes: newRoomTypes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Hotel Data:', hotelData);
    // Here you would typically send this data to a backend API
    alert('Hotel added successfully! (Check console for data)');
    navigate('/admin/hotels'); // Redirect back to hotels list
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hotel Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={hotelData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={hotelData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                rows="3"
                value={hotelData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={hotelData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="mobile_num" className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                name="mobile_num"
                id="mobile_num"
                value={hotelData.mobile_num}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Hotel Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Hotel Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="number_of_rooms" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
              <input
                type="number"
                name="number_of_rooms"
                id="number_of_rooms"
                value={hotelData.number_of_rooms}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="hotel_ranking" className="block text-sm font-medium text-gray-700">Hotel Ranking (1-5)</label>
              <input
                type="number"
                name="hotel_ranking"
                id="hotel_ranking"
                value={hotelData.hotel_ranking}
                onChange={handleChange}
                min="1"
                max="5"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Amenities</h2>
          {hotelData.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Free Wi-Fi, Pool, Gym"
              />
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAmenity}
            className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-md flex items-center hover:bg-gray-300"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Amenity
          </button>
        </div>

        {/* Room Types */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Room Types</h2>
          {hotelData.roomTypes.map((room, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 border border-gray-200 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Type Name</label>
                <input
                  type="text"
                  name="name"
                  value={room.name}
                  onChange={(e) => handleRoomTypeChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={room.price}
                  onChange={(e) => handleRoomTypeChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={room.quantity}
                  onChange={(e) => handleRoomTypeChange(index, e)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/hotels')}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg flex items-center hover:bg-gray-400 transition-colors duration-200"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-200"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotelPage; 