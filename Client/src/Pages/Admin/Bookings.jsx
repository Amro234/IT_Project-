import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, CreditCard, Plus, Search, Filter, MoreVertical, Edit, Trash2, Download, Plane, Hotel, Mountain } from 'lucide-react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading bookings data
    const timer = setTimeout(() => {
      setBookings([
        {
          id: 1,
          destination: 'Cairo, Egypt',
          type: 'Tour Package',
          date: '2024-05-15',
          travelers: 2,
          status: 'Confirmed',
          price: '$1,200',
          bookingDate: '2024-04-28',
          duration: '7 days',
          activities: ['Pyramids Tour', 'Nile Cruise', 'Museum Visit'],
          guide: 'Mohamed Ali',
        },
        {
          id: 2,
          destination: 'Luxor, Egypt',
          type: 'Hotel',
          date: '2024-06-01',
          travelers: 1,
          status: 'Pending',
          price: '$450',
          bookingDate: '2024-04-27',
          duration: '3 nights',
          hotel: 'Luxor Palace Hotel',
          roomType: 'Deluxe Room',
        },
        {
          id: 3,
          destination: 'Sharm El Sheikh, Egypt',
          type: 'Flight',
          date: '2024-07-10',
          travelers: 4,
          status: 'Cancelled',
          price: '$800',
          bookingDate: '2024-04-26',
          flightNumber: 'MS123',
          airline: 'EgyptAir',
          departure: 'Cairo',
          arrival: 'Sharm El Sheikh',
        },
        {
          id: 4,
          destination: 'Aswan, Egypt',
          type: 'Tour Package',
          date: '2024-08-05',
          travelers: 3,
          status: 'Confirmed',
          price: '$1,500',
          bookingDate: '2024-04-25',
          duration: '5 days',
          activities: ['Philae Temple', 'Nubian Village', 'Felucca Ride'],
          guide: 'Ahmed Hassan',
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || booking.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleEditBooking = (bookingId) => {
    // Add edit booking logic here
    console.log('Edit booking:', bookingId);
  };

  const handleDeleteBooking = (bookingId) => {
    // Add delete booking logic here
    console.log('Delete booking:', bookingId);
  };

  const handleCreateBooking = () => {
    // Add create booking logic here
    console.log('Create new booking');
  };

  const getBookingIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'tour package':
        return <Mountain className="w-5 h-5 text-green-500" />;
      case 'hotel':
        return <Hotel className="w-5 h-5 text-blue-500" />;
      case 'flight':
        return <Plane className="w-5 h-5 text-purple-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bookings</h1>
            <p className="text-gray-600 mt-2">Manage travel bookings and reservations</p>
          </div>
          <button
            onClick={handleCreateBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Booking
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="pb-4 text-left">Booking Details</th>
                  <th className="pb-4 text-left">Type</th>
                  <th className="pb-4 text-left">Date</th>
                  <th className="pb-4 text-left">Travelers</th>
                  <th className="pb-4 text-left">Status</th>
                  <th className="pb-4 text-left">Price</th>
                  <th className="pb-4 text-left">Booking Date</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getBookingIcon(booking.type)}
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-800 font-medium">{booking.destination}</p>
                          {booking.type === 'Tour Package' && (
                            <p className="text-gray-500 text-sm">{booking.duration} • {booking.activities[0]}</p>
                          )}
                          {booking.type === 'Hotel' && (
                            <p className="text-gray-500 text-sm">{booking.hotel} • {booking.roomType}</p>
                          )}
                          {booking.type === 'Flight' && (
                            <p className="text-gray-500 text-sm">{booking.airline} • {booking.flightNumber}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.type === 'Tour Package'
                          ? 'bg-green-100 text-green-800'
                          : booking.type === 'Hotel'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {booking.type}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {booking.date}
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        {booking.travelers}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                        {booking.price}
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{booking.bookingDate}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditBooking(booking.id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage; 