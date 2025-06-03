-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2025 at 01:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recommendationsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `ai_model_metadata`
--

CREATE TABLE `ai_model_metadata` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `model_version` varchar(50) NOT NULL,
  `training_data` text DEFAULT NULL,
  `last_trained_at` timestamp NULL DEFAULT NULL,
  `performance_metrics` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `number_of_rooms` int(11) NOT NULL DEFAULT 1,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int(11) NOT NULL,
  `total_price` decimal(8,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `room_id`, `number_of_rooms`, `check_in`, `check_out`, `guests`, `total_price`, `status`, `created_at`, `updated_at`, `hotel_id`) VALUES
(6, 2, 102, 5, '2025-06-01', '2025-06-03', 10, 13200.00, 'pending', '2025-05-31 18:33:58', '2025-05-31 18:33:58', 34),
(7, 2, 102, 5, '2025-06-01', '2025-06-03', 10, 13200.00, 'pending', '2025-05-31 18:34:41', '2025-05-31 18:34:41', 34);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Cairo', '2025-05-28 09:15:34', '2025-05-28 09:15:34');

-- --------------------------------------------------------

--
-- Table structure for table `entertainment_places`
--

CREATE TABLE `entertainment_places` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('mall','beach','other') NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `entry_fee` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `hotel_ranking` enum('1','2','3','4','5','6','7','8') NOT NULL,
  `mobile_num` varchar(35) DEFAULT NULL,
  `owner_id` bigint(20) UNSIGNED NOT NULL,
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `number_of_rooms` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `description`, `address`, `email`, `city_id`, `hotel_ranking`, `mobile_num`, `owner_id`, `amenities`, `number_of_rooms`, `created_at`, `updated_at`) VALUES
(1, 'Cecilia Hostel', 'A stay at Cecilia - Hostel places you in the heart of Cairo, within a 15-minute walk of Tahrir Square and Egyptian Museum. This hostel is 9.5 mi (15.3 km) from Giza Pyramid Complex and 2 mi (3.2 km) from Khan el-Khalili. Enjoy recreation amenities such as bicycles to rent or take in the view from a rooftop terrace. Additional features at this hostel include complimentary wireless internet access, concierge services, and an arcade/game room. Guests can catch a ride to nearby destinations on the area shuttle (surcharge). Satisfy your appetite at the hostel\'s coffee shop/cafe, or stay in and take advantage of the 24-hour room service. A complimentary continental breakfast is served daily from 7 AM to 10 AM. Featured amenities include complimentary wired internet access, complimentary newspapers in the lobby, and dry cleaning/laundry services. Free valet parking is available onsite. Make yourself at home in one of the 18 individually decorated guestrooms, featuring microwaves and LCD televisions. Rooms have private balconies. Prepare your meals in the shared/communal kitchen. Wired and wireless internet access is complimentary, while tablet computers and satellite programming provide entertainment. Private bathrooms with showers feature complimentary toiletries and hair dryers.', '47 El Falaky Street,Cairo,Cairo Governorate,Egypt', 'info@sunsetinn.com', 1, '2', '+20 12 3456 7854', 2, '\"[\\\"[\'Air conditioning\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Balcony\'\\\",\\\"\'Kid-friendly\'\\\",\\\"\'Crib\'\\\",\\\"\'Fireplace\'\\\",\\\"\'Heating\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Ironing board\'\\\",\\\"\'Kitchen\'\\\",\\\"\'Microwave\'\\\",\\\"\'Outdoor grill\'\\\",\\\"\'Oven stove\'\\\",\\\"\'Patio\'\\\",\\\"\'Cable TV\'\\\",\\\"\'Washer\'\\\",\\\"\'Wheelchair accessible\'\\\",\\\"\'Free parking\'\\\",\\\"\'Free Wi-Fi\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(2, 'Doudou Pyramids View Hotel', 'small hotel has a new and clean rooms all of this rooms has pyramids view. you can eating all meals in our restaurant where pyramids view is fantastic.', '1Mina Street, Giza, above Caviar Seafood Restaurant, 5th floor,Giza,Giza Governorate,Egypt', 'doudoupyramidsview@gmail.com', 1, '2', '+20 12 3456 7855', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Spa\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(3, 'Paradise Boutique Hotel', 'In the heart of Cairo, Paradise Boutique Hotel is within a 5-minute drive of Egyptian Museum and Museum of Islamic Art. This hotel is 1.6 mi (2.6 km) from Khan el-Khalili and 2 mi (3.2 km) from Cairo Tower. Make use of convenient amenities such as complimentary wireless internet access, concierge services, and a television in a common area. Take advantage of the hotel\'s 24-hour room service. A complimentary continental breakfast is served daily from 8:30 AM to 11 AM. Featured amenities include complimentary newspapers in the lobby, dry cleaning/laundry services, and a 24-hour front desk. A roundtrip airport shuttle is provided for a surcharge (available 24 hours). Make yourself at home in one of the 30 air-conditioned rooms featuring flat-screen televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with showers feature complimentary toiletries and slippers. Conveniences include safes and desks, and housekeeping is provided daily.', '18 B 26 July St,Cairo,Cairo Governorate,Egypt', 'contact@grandvista.com', 1, '2', '+20 12 3456 7856', 2, '\"[\\\"[\'Air conditioning\'\\\",\\\"\'Crib\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Kitchen\'\\\",\\\"\'Washer\'\\\",\\\"\'Free parking\'\\\",\\\"\'Free Wi-Fi\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(4, 'Philo Hotel', 'With a stay at Philo Hotel, you\'ll be centrally located in Cairo, steps from Tahrir Square and 6 minutes by foot from Egyptian Museum. This hotel is 9.3 mi (15 km) from Giza Pyramid Complex and 2.6 mi (4.2 km) from Khan el-Khalili. Make use of convenient amenities, which include complimentary wireless internet access and tour/ticket assistance. Continental breakfasts are available daily from 8:00 AM to 11:00 AM for a fee. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours). Make yourself at home in one of the 16 individually decorated guestrooms. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms with showers are provided. Conveniences include separate sitting areas and portable fans, and housekeeping is provided daily.', '17 Kasr Al Nile,Cairo,Cairo Governorate,Egypt', 'reservations@royalpalmhotel.com', 1, '2', '+20 12 3456 7857', 2, '\"[\\\"[\'Crib\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Smoke-free\'\\\",\\\"\'Free parking\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(5, 'Great sun pyramids inn', 'Near Great Sphinx of GizaA complimentary local cuisine breakfast is served daily from 11:00 AM to 11:30 AM.The front desk is staffed during limited hours. Free valet parking is available onsite.Located in Giza (Kafrat al Jabal), Great sun pyramids inn is within a 15-minute walk of Giza Pyramid Complex and Great Sphinx of Giza. This bed & breakfast is 1.2 mi (1.9 km) from Pyramid of Khufu and 4.1 mi (6.5 km) from Grand Egyptian Museum.Make yourself at home in one of the 5 guestrooms. Complimentary wireless internet access is available to keep you connected. Bathrooms with separate bathtubs and showers are provided.', 'Gamal Abd El-Nasir, Nazlet El Samman,Giza,3387722,Giza Governorate,Egypt', 'booking@seabreezeresort.com', 1, '2', '+20 12 3456 7858', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Spa\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(6, 'Safary Hotel', 'With a stay at Safary Hotel in Cairo (Downtown Cairo), you\'ll be within a 5-minute drive of Tahrir Square and Egyptian Museum. This hostel is 10 mi (16.1 km) from Giza Pyramid Complex and 1.8 mi (2.9 km) from Khan el-Khalili. Make use of convenient amenities, which include complimentary wireless internet access and an arcade/game room. A complimentary English breakfast is served daily from 8:00 AM to 11:00 AM. A roundtrip airport shuttle is complimentary (available 24 hours). Make yourself at home in one of the 50 guestrooms. Complimentary wireless internet access is available to keep you connected. Shared bathrooms are provided. Conveniences include washers/dryers and a turndown service, and housekeeping is provided daily.', '4 Souk El Tawfekeyya,Cairo,Cairo Governorate,Egypt', 'hello@mountainviewlodge.com', 1, '2', '+20 12 3456 7859', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(7, 'Arkan Egyptian Museum Hotel', 'Near Giza Solar Boat MuseumGrab a bite from the snack bar/deli serving guests of Arkan Egyptian Museum Hotel. Mingle with other guests at the complimentary reception, held daily. A complimentary cooked-to-order breakfast is served on weekdays from 8:00 AM to 11:30 AM.Make use of convenient amenities such as concierge services, babysitting (surcharge), and gift shops/newsstands. This hotel also features a hair salon, wedding services, and a communal living room.Featured amenities include complimentary wired internet access, a computer station, and express check-in. A roundtrip airport shuttle is provided for a surcharge (available 24 hours).Located in Giza (Al Haram), Arkan Egyptian Museum Hotel is within a 10-minute drive of Grand Egyptian Museum and Giza Pyramid Complex. This family-friendly hotel is 2.4 mi (3.9 km) from Pyramid of Khufu and 2.8 mi (4.6 km) from Great Sphinx of Giza.Treat yourself to a stay in one of the 15 individually furnished guestrooms, featuring fireplaces and flat-screen televisions. Your Select Comfort bed comes with down comforters and Egyptian cotton sheets. Prepare your meals in the shared/communal kitchen. Wired and wireless internet access is complimentary, while DVD players and satellite programming provide entertainment', '11 Bishr Khattab Street,Giza,Giza Governorate,Egypt', 'stay@palmtreeinn.com', 1, '2', '+20 12 3456 7860', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(8, 'Cairo Paradise Hotel', 'At Cairo Paradise Hotel, exceptional service and top-notch amenities create a memorable experience for guests. Complimentary internet access is available in the hotel to ensure you stay connected during your visit.Arrange your trips to and from the airport using the hotel\'s convenient transportation services booking. For guests with their own vehicle, parking facilities are provided.Due to health concerns, smoking is strictly prohibited within the entire premises of hotel. For the health and well-being of all guests and staff, smoking is restricted exclusively to assigned zones. A delightful breakfast is the perfect way to begin your day, and at Cairo Paradise Hotel, you can always indulge in a scrumptious meal on-site. All adore a delightful cup of coffee! An on-site coffee shop ensures you can relish a cup of authentic, freshly-brewed coffee every morning -- or whenever you desire it.At Cairo Paradise Hotel, experience the ease of having groceries brought straight to your accommodation through their efficient service.', '41 Sherif St,Cairo,Cairo Governorate,Egypt', 'frontdesk@bluehorizonhotel.com', 1, '2', '+20 12 3456 7861', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(9, 'Cairo Hub Hostel', 'With a stay at Cairo Hub Hostel, you\'ll be centrally located in Cairo, steps from Tahrir Square and 7 minutes by foot from Egyptian Museum. This hostel is 9.4 mi (15.1 km) from Giza Pyramid Complex and 2.8 mi (4.5 km) from Khan el-Khalili. Make use of convenient amenities such as complimentary wireless internet access, tour/ticket assistance, and a reception hall. Getting to nearby attractions is a breeze with the area shuttle (surcharge). A complimentary continental breakfast is served daily from 8:30 AM to 10:30 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours). Make yourself at home in one of the 5 air-conditioned guestrooms. Complimentary wireless internet access is available to keep you connected. Bathrooms have separate bathtubs and showers and hair dryers.', 'El-Tahrir Square Building No. 11, Apartment 19, 4th floor,Cairo,Cairo Governorate,Egypt', 'rooms@desertrose.com', 1, '2', '+20 12 3456 7862', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(10, 'Cairo City', 'A stay at Cairo City places you in the heart of Cairo, within a 15-minute walk of Tahrir Square and Egyptian Museum. This guesthouse is 9.8 mi (15.8 km) from Giza Pyramid Complex and 1.4 mi (2.3 km) from Khan el-Khalili. Make use of convenient amenities such as complimentary wireless internet access, concierge services, and a television in a common area. A complimentary continental breakfast is served daily from 8:30 AM to 11:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and self parking (subject to charges) is available onsite. Make yourself at home in one of the 15 air-conditioned rooms featuring minibars. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms with shower/tub combinations feature jetted bathtubs and complimentary toiletries', '5 Sherif El-Sagheer, Bab Al Louq,Cairo,Cairo Governorate,Egypt', 'inquiries@coastlineinn.com', 1, '2', '+20 12 3456 7863', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(11, 'Egyptian Night Hostel', 'With a stay at Egyptian Night Hostel, you\'ll be centrally located in Cairo, steps from Egyptian Museum and 4 minutes by foot from Tahrir Square. This hostel is 9.7 mi (15.6 km) from Giza Pyramid Complex and 2.2 mi (3.5 km) from Khan el-Khalili. Make use of convenient amenities such as complimentary wireless internet access, concierge services, and a fireplace in the lobby. Satisfy your appetite at the hostel\'s coffee shop/cafe. A complimentary continental breakfast is served daily from 8:00 AM to 11:30 AM. Featured amenities include a computer station, dry cleaning/laundry services, and a 24-hour front desk. A shuttle from the airport to the hotel is complimentary (available 24 hours). Make yourself at home in one of the 18 air-conditioned rooms featuring flat-screen televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with showers feature complimentary toiletries and slippers. Conveniences include safes and electric kettles, as well as phones with free local calls.', 'Down Town 13 Meret Basha, Ismailia,Cairo,Cairo Governorate,Egypt', 'welcome@whiteorchidhotel.com', 1, '2', '+20 12 3456 7864', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(12, 'Panorama Ramsis Hotel & Cafe', 'With a stay at Panorama Ramsis Hotel & Cafe, you\'ll be centrally located in Cairo, within a 5-minute drive of Khan el-Khalili and Tahrir Square. This hotel is 11.2 mi (18 km) from Giza Pyramid Complex and 2.5 mi (4.1 km) from Egyptian Museum. Take in the views from a terrace and make use of amenities such as complimentary wireless internet access and concierge services. Grab a bite to eat at one of the hotel\'s 2 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/cafe. Mingle with other guests at the complimentary reception, held daily. Wrap up your day with a drink at the bar/lounge. A complimentary continental breakfast is served daily from 6:00 AM to 11:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Make yourself at home in one of the 114 air-conditioned rooms featuring fireplaces and flat-screen televisions. Complimentary wireless internet access keeps you connected, and cable programming is available for your entertainment. Conveniences include phones, as well as minibars and complimentary bottled water.', 'saif El Dine El Mahrany 10, Ramses,Cairo,Cairo Governorate,Egypt', 'reception@citycenterinn.com', 1, '3', '+20 12 3456 7865', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(13, 'Cairo Inn', 'With a stay at Cairo Inn, you\'ll be centrally located in Cairo, within a 10-minute walk of Tahrir Square and Egyptian Museum. This hotel is 1.2 mi (2 km) from American University of Cairo and 1.9 mi (3 km) from Cairo Tower. Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless internet access and concierge services. Additional features at this hotel include a hair salon, shopping on site, and a television in a common area. Enjoy a meal at the restaurant, or stay in and take advantage of the hotel\'s room service. A complimentary buffet breakfast is served daily from 8:30 AM to 11:30 AM. Featured amenities include a business center, express check-out, and dry cleaning/laundry services. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free self parking is available onsite. Make yourself at home in one of the 25 air-conditioned guestrooms. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with shower/tub combinations feature deep soaking bathtubs and hair dryers. Conveniences include safes and coffee/tea makers, as well as phones with free local calls.', '6 Talaat Harb Square,Cairo,Cairo Governorate,Egypt', 'guestservices@oceanbreeze.com', 1, '3', '+20 12 3456 7866', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Child-friendly\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(14, 'The Gate Hotel Front Pyramids & Sphinx View', 'With a stay at The Gate Hotel Front Pyramids & Sphinx View, you\'ll be centrally located in Giza, steps from Giza Plateau and within a 5-minute walk of Giza Pyramid Complex. This bed & breakfast is 0.3 mi (0.4 km) from Great Sphinx of Giza and 3 mi (4.8 km) from Pyramid of Khufu. Take in the views from a terrace and make use of amenities such as complimentary wireless internet access and concierge services. Additional amenities at this Mediterranean bed & breakfast include gift shops/newsstands, wedding services, and a fireplace in the lobby. If you\'d like to spend the day shopping, you can hop on the complimentary shuttle. Enjoy a meal at the restaurant or snacks in the bed & breakfast\'s coffee shop/cafe. Quench your thirst with your favorite drink at the bar/lounge. Buffet breakfasts are available daily from 7:30 AM to 11:00 AM for a fee. Featured amenities include a computer station, dry cleaning/laundry services, and a 24-hour front desk. A cruise ship terminal shuttle is provided at no charge (available 24 hours), and free self parking is available onsite. Make yourself at home in one of the 15 individually furnished guestrooms, featuring minibars and flat-screen televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with showers feature bidets and slippers. Conveniences include laptop-compatible safes and desks, and housekeeping is provided on request.', '29 Abou Al Hool Al Seiahi,Giza,Giza Governorate,Egypt', 'book@thegoldenbay.com', 1, '3', '+20 12 3456 7867', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(15, 'Grand City Hotel', 'With a stay at Grand City Hotel, you\'ll be centrally located in Cairo, steps from Tahrir Square and 8 minutes by foot from Egyptian Museum. This hotel is 9.5 mi (15.3 km) from Giza Pyramid Complex and 2.2 mi (3.6 km) from Khan el-Khalili. Take in the views from a terrace and make use of amenities such as complimentary wireless internet access and concierge services. Take advantage of the hotel\'s 24-hour room service. Continental breakfasts are available daily from 8:00 AM to 10:00 AM for a fee. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Treat yourself to a stay in one of the 7 individually decorated guestrooms, featuring fireplaces and heated floors. Your memory foam bed comes with Egyptian cotton sheets. Flat-screen televisions with satellite programming provide entertainment, while complimentary wireless internet access keeps you connected. Conveniences include desks and complimentary newspapers, and housekeeping is provided daily', 'Bostan Ibn Al Quraish El Tahrir Square,Cairo,Cairo Governorate,Egypt', 'info@lakesideresort.com', 1, '3', '+20 12 3456 7868', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(16, 'Turquoise Pyramids View Hotel', 'Near Giza Pyramid ComplexYou can enjoy a meal at the restaurant serving the guests of Turquoise Pyramids View Hotel, or stop in at the snack bar/deli. Full breakfasts are available daily from 7:00 AM to 11:30 AM for a fee.Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless internet access and concierge services. Additional features at this hotel include gift shops/newsstands, a television in a common area, and a reception hall.Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Free self parking is available onsite.With a stay at Turquoise Pyramids View Hotel, you\'ll be centrally located in Giza, within a 5-minute drive of Giza Pyramid Complex and Pyramid of Khufu. This hotel is 1.5 mi (2.4 km) from Great Sphinx of Giza and 2.4 mi (3.8 km) from Grand Egyptian Museum.Make yourself at home in one of the 32 air-conditioned rooms featuring heated floors and flat-screen televisions. Rooms have private balconies or patios. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Conveniences include safes and desks, as well as phones with free local calls.', 'In front of Pyramids Gates,Giza,12511,Giza Governorate,Egypt', 'connect@theriverhouse.com', 1, '3', '+20 12 3456 7869', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(17, '9 Pyramids Inn', 'With a stay at 9 Pyramids Inn in Giza (Al Haram), you\'ll be steps from Pyramid of Khufu and 4 minutes by foot from Giza Pyramid Complex. This hotel is 0.5 mi (0.8 km) from Great Sphinx of Giza and 3.7 mi (6 km) from Grand Egyptian Museum. Take advantage of recreation opportunities such as a fitness center or take in the view from a rooftop terrace and a garden. Additional amenities at this hotel include complimentary wireless internet access, concierge services, and a fireplace in the lobby. Enjoy a meal at the restaurant, or stay in and take advantage of the hotel\'s 24-hour room service. Quench your thirst with your favorite drink at the bar/lounge. A complimentary local cuisine breakfast is served daily from 7:30 AM to 9:30 AM. Featured amenities include a business center, dry cleaning/laundry services, and a 24-hour front desk. Treat yourself to a stay in one of the 3 individually decorated guestrooms, featuring fireplaces and LED televisions. Wireless internet access (surcharge) keeps you connected, and satellite programming is available for your entertainment. Conveniences include coffee/tea makers and complimentary bottled water, and housekeeping is provided daily.', 'Al Haram,Giza,Giza Governorate,Egypt', 'admin@emeraldstay.com', 1, '3', '+20 12 3456 7870', 2, '\"[\\\"[\'Air conditioning\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Crib\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Smoke-free\'\\\",\\\"\'Cable TV\'\\\",\\\"\'Wheelchair accessible\'\\\",\\\"\'Free parking\'\\\",\\\"\'Free Wi-Fi\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(18, 'Parkside Boutique Furnished Apartments', 'With a stay at Parkside Boutique Furnished Apartments, you\'ll be centrally located in Cairo, within a 15-minute drive of City Stars and Khan el-Khalili. This apartment is 7.7 mi (12.4 km) from Egyptian Museum and 7.6 mi (12.2 km) from Tahrir Square. Make use of convenient amenities, which include complimentary wireless internet access and concierge services. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free valet parking is available onsite. Make yourself at home in one of the 34 individually decorated guestrooms, featuring kitchenettes with full-sized refrigerators/freezers and ovens. Your bed comes with down comforters and premium bedding. 55-inch flat-screen televisions with premium TV channels provide entertainment, while complimentary wireless internet access keeps you connected. Conveniences include phones, as well as safes and desks.', '17 Rafiq Salah Eldin st, off Al-Hegaz st,Cairo,Cairo Governorate,Egypt', 'hello@thebluffinn.com', 1, '3', '+20 12 3456 7871', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(19, 'Afnan Cairo Airort', 'In Cairo (An-Nuzhah)Make use of convenient amenities, which include complimentary wireless internet access and tour/ticket assistance.Featured amenities include a 24-hour front desk, laundry facilities, and an elevator. Self parking (subject to charges) is available onsite.With a stay at Afnan Cairo Airort, you\'ll be centrally located in Cairo, within a 15-minute drive of City Stars and St. Mark\'s Coptic Orthodox Church. This apartment is 10.2 mi (16.4 km) from Khan el-Khalili and 11.3 mi (18.1 km) from Tahrir Square.Make yourself at home in one of the 17 air-conditioned rooms featuring kitchens with full-sized refrigerators/freezers and ovens. 32-inch Smart televisions with satellite programming provide entertainment, while complimentary wireless internet access keeps you connected. Conveniences include microwaves and electric kettles.', '2h Taha Hussain  Road New Nozha,Cairo,4473004,Cairo Governorate,Egypt', 'lodge@redcanyonresort.com', 1, '3', '+20 12 3456 7872', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Business centre\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(20, 'Kemet Boutique Hotel', 'With a stay at Kemet Boutique Hotel in Giza (Al Haram), you\'ll be within a 5-minute drive of Giza Plateau and Great Sphinx of Giza. This guesthouse is 2.2 mi (3.5 km) from Giza Pyramid Complex and 2.4 mi (3.9 km) from Pyramid of Khufu. Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless internet access and concierge services. A complimentary continental breakfast is served daily from 7:00 AM to 9:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A shuttle from the airport to the hotel is provided for a surcharge (available 24 hours). Make yourself at home in one of the 12 individually decorated guestrooms, featuring minibars and flat-screen televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with showers feature complimentary toiletries and hair dryers. Conveniences include phones, as well as desks and coffee/tea makers.', '2 Nameis Al Gazar,Giza,Giza Governorate,Egypt', 'contact@forestretreat.com', 1, '3', '+20 12 3456 7873', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Kitchen in some rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(21, 'Celia Pyramids View Inn', 'With a stay at Celia Pyramids View inn in Giza (Al Haram), you\'ll be within a 5-minute drive of Giza Pyramid Complex and Great Sphinx of Giza. This bed & breakfast is 2.6 mi (4.2 km) from Pyramid of Khufu and 3.3 mi (5.4 km) from Grand Egyptian Museum. Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless internet access and concierge services. At Celia Pyramids View inn, enjoy a satisfying meal at the restaurant. Mingle with other guests at the complimentary reception, held daily. Wrap up your day with a drink at the bar/lounge. A complimentary continental breakfast is served daily from 7:00 AM to 10:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours). Make yourself at home in one of the 15 individually decorated guestrooms, featuring minibars and LED televisions. Satellite television is provided for your entertainment. Private bathrooms with showers feature complimentary toiletries and hair dryers. Conveniences include desks and electric kettles, and housekeeping is provided daily.', '111 Zaghloul,Giza,Giza Governorate,Egypt', NULL, 1, '3', '+20 12 3456 7874', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(22, 'Pyramid Front Hotel', 'With a stay at Pyramid Front Hotel in Giza (Al Haram), you\'ll be within a 5-minute drive of Giza Pyramid Complex and Pyramid of Khufu. This upscale hotel is 2.2 mi (3.5 km) from Great Sphinx of Giza and 2.4 mi (3.8 km) from Grand Egyptian Museum. Take advantage of recreation opportunities such as an outdoor pool, or other amenities including complimentary wireless internet access and concierge services. Enjoy a meal at the restaurant or snacks in the hotel\'s coffee shop/cafe. Mingle with other guests at the complimentary reception, held daily. Quench your thirst with your favorite drink at the bar/lounge. A complimentary continental breakfast is served daily from 7:00 AM to 10:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and free self parking is available onsite. Make yourself at home in one of the 76 air-conditioned rooms featuring fireplaces and LED televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Conveniences include phones, as well as minibars and electric kettles.', 'Al Mansoureya Rd,Giza,Giza Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7875', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(23, 'Jaz Pyramids Resort', 'Welcome To Jaz Pyramids Resort Step into a world of wonder at Jaz Pyramids Resort, effective 1st October 2024 (formerly Pyramids Resort By Jaz), where every moment is wrapped in the tranquility of our expansive 9-acre garden sanctuary. Behold the majesty of the iconic Giza Pyramids and Sphinx, painting an enchanting backdrop to your stay. With nature\'s splendor at your fingertips, lose yourself in the embrace of lush landscapes, verdant palm forests, and captivating vistas, promising an unforgettable retreat in the heart of history and beauty. Here, amidst the whispers of ancient legends, our iconic property seamlessly blends historical grandeur with modernized comforts, offering a truly magical experience that transcends time.', 'Cairo - Alexandria Desert Rd, Giza,Giza,Giza Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7876', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(24, 'Triumph Plaza Hotel', 'A stay at Triumph Plaza Hotel places you in the heart of Cairo, within a 5-minute drive of St. Mark\'s Coptic Orthodox Church and Ain Shams University. This 4-star hotel is 6.2 mi (9.9 km) from Egyptian Museum and 4 mi (6.4 km) from City Stars. Pamper yourself with onsite massages or enjoy recreation amenities such as a health club. Additional features at this Edwardian hotel include complimentary wireless Internet access, concierge services, and gift shops/newsstands. Grab a bite at Shiraz Restaurant, one of the hotel\'s 3 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/cafe. Buffet breakfasts are available daily from 6:30 AM to 10:30 AM for a fee. Featured amenities include complimentary wired Internet access, limo/town car service, and complimentary newspapers in the lobby. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and self parking (subject to charges) is available onsite. Make yourself at home in one of the 147 air-conditioned rooms featuring LED televisions. Rooms have private balconies. Complimentary wired and wireless Internet access keeps you connected, and digital programming provides entertainment. Private bathrooms with bathtubs or showers feature complimentary toiletries and bidets.', 'El-Khalifa El-Maamoun, St? Heliopolis, Cairo Governorate,Cairo,Cairo Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7877', 2, '\"[\\\"[\'Air conditioning\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Crib\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Smoke-free\'\\\",\\\"\'Cable TV\'\\\",\\\"\'Wheelchair accessible\'\\\",\\\"\'Free parking\'\\\",\\\"\'Free Wi-Fi\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(25, 'Novotel Cairo Airport', 'With a stay at Novotel Cairo Airport in Cairo (Heliopolis), you\'ll be within a 10-minute drive of St. Mark\'s Coptic Orthodox Church and Egyptian Textile Museum. This 4-star hotel is 13.1 mi (21 km) from Egyptian Museum and 7.2 mi (11.6 km) from City Stars.Relax and unwind with massages and body treatments. You\'re sure to appreciate the recreational amenities, including a health club, an outdoor pool, and a sauna. Additional amenities at this hotel include complimentary wireless Internet access, concierge services, and babysitting (surcharge).Enjoy international cuisine at Le Jardin, one of the hotel\'s 3 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the 2 coffee shops/cafes. Mingle with other guests at the complimentary reception, held daily. Relax with a refreshing drink from the poolside bar or one of the 2 bars/lounges. Buffet breakfasts are available daily from 5:30 AM to 10:30 AM for a fee.Featured amenities include limo/town car service, a computer station, and complimentary newspapers in the lobby. A roundtrip airport shuttle is complimentary (available 24 hours).Make yourself at home in one of the 313 guestrooms featuring minibars and LCD televisions. Complimentary wireless Internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms have bathtubs or showers and hair dryers. Conveniences include phones, as well as safes and desks.', 'Airport, Sheraton Al Matar, El Nozha, Cairo Governorate,Cairo,Cairo Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7877', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Kitchen in rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(26, 'Azal Pyramids Hotel', 'Located in Giza (Al-\'Umraniyah), Azal Pyramids Hotel is within a 10-minute drive of Giza Plateau and Giza Pyramid Complex. This luxury hotel is 4.1 mi (6.6 km) from Great Sphinx of Giza and 4.1 mi (6.6 km) from Pyramid of Khufu. Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. This hotel also features complimentary wireless internet access, concierge services, and gift shops/newsstands. Enjoy a meal at the restaurant or snacks in the hotel\'s coffee shop/cafe. Wrap up your day with a drink at the poolside bar. Featured amenities include a computer station, dry cleaning/laundry services, and a 24-hour front desk. This hotel has 2 meeting rooms available for events. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and self parking (subject to charges) is available onsite. Make yourself at home in one of the 402 guestrooms featuring minibars and LCD televisions. Your pillowtop bed comes with Egyptian cotton sheets. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms have deep soaking bathtubs and rainfall showerheads', '252 Al Haram 7,Giza,Giza Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7878', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Full-service laundry\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(27, 'Turquoise Pyramids & Grand Egyptian Museum View Hotel', 'With a stay at Turquoise Pyramids View Hotel, you\'ll be centrally located in Giza, within a 5-minute drive of Giza Pyramid Complex and Pyramid of Khufu. This hotel is 1.5 mi (2.4 km) from Great Sphinx of Giza and 2.4 mi (3.8 km) from Grand Egyptian Museum. Take in the views from a rooftop terrace and make use of amenities such as complimentary wireless internet access and concierge services. Additional features at this hotel include gift shops/newsstands, a television in a common area, and a reception hall. You can enjoy a meal at the restaurant serving the guests of Turquoise Pyramids View Hotel, or stop in at the snack bar/deli. Full breakfasts are available daily from 7:00 AM to 11:30 AM for a fee. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Free self parking is available onsite. Make yourself at home in one of the 32 air-conditioned rooms featuring heated floors and flat-screen televisions. Rooms have private balconies or patios. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Conveniences include safes and desks, as well as phones with free local calls.', '7 El-Remaya, Square,Giza,Giza Governorate,Egypt', NULL, 1, '4', '+20 12 3456 7879', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Business centre\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(28, 'Novotel Cairo El Borg', 'Discover contemporary comfort at Novotel Cairo EL Borg nestled in the vibrant heart of Cairo. Novotel Cairo EL Borg is a stylish 4-star retreat offering breathtaking Nile River views. Experience our Superior Rooms, Junior and Superior Suites with breathtaking views of the Nile River and the iconic Cairo Tower. Immerse yourself in our pool, spa, fitness facilities, and amazing dining outlets while indulging in the vibrancy of our prime downtown location.', '3 Saraya El, Gezira St, Zamalek, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'welcome@beachharmony.com', 1, '4', '+20 12 3456 7880', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(29, 'Barcel?? Cairo Pyramids', 'Chic and modern high end hotel just a few minutes from the Sphinx and the Great Pyramids of Giza and 30 minutes from Cairos city center.Free WIFI in all public areas and rooms. Free safe box in all rooms with laptop capacity.Heated rooftop pool with a big terrace for sunbathing and a pool bar. Towels sun umbrellas and sun beds available without any charge. Nice Panoramic Restaurant on the 12th floor with astonishing views to the 3 Pyramids of Giza. 3 restaurants offering Italian Mediterranean and International cuisine. 24 hours lobby bar Chesterfield style bar and pool bar. Laundry and dry cleaning service. 24 Hours Reception luggage store lobby bar and room service. Car rental. ATM machine and currency exchange. Excursions and medical services on request', '229 Al Haram, At Talbeyah Al Qebleyah, El Omraniya,Giza,Giza Governorate,Egypt', 'info@windsorpalacehotel.com', 1, '4', '+20 12 3456 7881', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(30, 'Khan DuiDar Inn - Pyramids View Rooftop', 'With a stay at Khan Duidar Inn - Pyramids View Rooftop in Giza (Al Haram), you\'ll be within a 5-minute drive of Giza Plateau and Great Sphinx of Giza. This bed & breakfast is 2.1 mi (3.4 km) from Giza Pyramid Complex and 2.3 mi (3.8 km) from Pyramid of Khufu. Make use of convenient amenities such as complimentary wireless internet access, concierge services, and wedding services. Enjoy a meal at the restaurant or snacks in the coffee shop/cafe. The bed & breakfast also offers 24-hour room service. Mingle with other guests at the complimentary reception, held daily. Wrap up your day with a drink at the bar/lounge. A complimentary buffet breakfast is served daily from 7:00 AM to 10:00 AM. Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and luggage storage. Free self parking is available onsite. Make yourself at home in one of the 13 air-conditioned rooms featuring fireplaces and Smart televisions. Your pillowtop bed comes with down comforters and premium bedding. Rooms have private balconies. Complimentary wireless internet access is available to keep you connected.', '10 Zaghloul St, Nazlet El Siman, Giza, Egypt,Giza,Giza Governorate,Egypt', 'contact@skylineresort.com', 1, '4', '+20 12 3456 7882', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(31, 'Swiss Inn Nile Hotel', 'When you stay at Swiss Inn Nile Hotel in Giza, you\'ll be connected to the convention center, within a 10-minute drive of Tahrir Square and Egyptian Museum. This hotel is 7.8 mi (12.5 km) from Giza Pyramid Complex and 5.8 mi (9.3 km) from Khan el-Khalili. Enjoy recreation amenities such as an outdoor pool or take in the view from a rooftop terrace. This hotel also features complimentary wireless internet access, concierge services, and gift shops/newsstands. Enjoy a meal at the restaurant, or stay in and take advantage of the hotel\'s 24-hour room service. Relax with your favorite drink at the bar/lounge or the poolside bar. Buffet breakfasts are available daily for a fee. Featured amenities include a business center, express check-out, and dry cleaning/laundry services. Self parking (subject to charges) is available onsite. Make yourself at home in one of the 90 air-conditioned rooms featuring minibars. Cable television is provided for your entertainment. Private bathrooms with shower/tub combinations feature rainfall showerheads and designer toiletries. Conveniences include phones, as well as safes and desks.', '200 Al Bahr Al Aazam, Saqiyet Mekki, Al,Giza,Giza Governorate,Egypt', 'service@newharborinn.com', 1, '5', '+20 12 3456 7883', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Parking ($)\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(32, 'Hilton Pyramids Golf', 'Located on outskirts of Cairo in the cosmopolitan 6th of October City, The Hilton Pyramids Golf hotel is just 15 minutes from Smart Village and the magnificent pyramids of Giza, one of the seven wonders of the world. Enjoy golf course views at Hilton Pyramids Golf as you lunch at Fairway Restaurant or sip a cocktail at the swim-up island bar. Choose from seven bars and restaurant at this Egyptian golf hotel or visit nearby Cairo attractions including DreamPark amusement park, just five minutes away. Do business in one of seven meeting rooms for 10-600 people and keep in touch with WiFi, available in public areas and meeting rooms at this Egyptian golf hotel. From guest rooms to suites, all Hilton Pyramids Golf accommodations offer golf course or pool views from the balcony.', 'El Wahat Rd, First,6th of October City,Giza Governorate,Egypt', 'booking@mountainpeaklodge.com', 1, '5', '+20 12 3456 7884', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Beach access\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47');
INSERT INTO `hotels` (`id`, `name`, `description`, `address`, `email`, `city_id`, `hotel_ranking`, `mobile_num`, `owner_id`, `amenities`, `number_of_rooms`, `created_at`, `updated_at`) VALUES
(33, 'Hilton Cairo Nile Maadi', 'Welcome to Hilton Cairo Nile Maadi, where comfort and hospitality meet to provide you with an unforgettable stay. Our hotel offers 255 rooms and suites overlooking the Nile, Pyramids and historical city of Cairo, with dedicated two floors of modern conference and event facilities. The hotel is ideally located in the heart of Cairo, adjacent to the Nile River, few minutes away from major historical sites. Explore our dining options from O\'Nile or Dayma Levantine cuisines, where they will take you through different senses. We are also offering eforea spa where you can indulge your senses and rejuvenate your mind, body and soul.', '47-B Nile Corniche, Maadi,Cairo,Cairo Governorate,Egypt', 'hello@harborlightinn.com', 1, '5', '+20 12 3456 7885', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Spa\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(34, 'Hilton Cairo Heliopolis Hotel', 'Off a major thoroughfare, our upscale hotel is five kilometers from Cairo International Airport, eight kilometers from Baron Empain Palace, and nine kilometers from Cairo International Convention Center. Our airy, chic rooms have WiFi, flat-screen TVs, and minibars. Upgraded rooms add balconies or patios with pool views, and suites add kitchenettes and/or separate living rooms. Room service is available. Standard WiFi access with speed 15 mb. is complimentary internet and premium WIFI with high-speed 30 mb. is 160 EGP per day - free for Diamond Guests. There are 12 restaurants, including a pub and bar and open-air venues, as well as Asian and French options. Other amenities include our three outdoor pools (one for kids), a squash court and a gym, as well as 23 meeting rooms. Breakfast and parking are available.', 'El-Orouba, Sheraton Al Matar, El Nozha, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'reservations@desertlilyresort.com', 1, '5', '+20 12 3456 7886', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(35, 'Kempinski Nile Hotel Cairo', 'Discover the perfect blend of convenience and luxury at our strategically located downtown hotel. Ideal for business travellers, our hotel is just a few miles away from Cairo\'s iconic attractions, including the Pyramids of Giza, the Egyptian Museum, the Cairo Opera House and more. With 137 rooms and 54 exclusive suites, we offer flexible options to cater to solo travellers, couples, and large groups. Each suite features a private balcony, providing a serene retreat. Indulge your taste buds at our four exceptional restaurants and lounges, where Kempinski\'s culinary expertise shines. Our leisure spa awaits, where you can refresh and recharge for ultimate relaxation. End your day at our Rooftop pool, which offers stunning views of Cairo\'s skyline. Your well-being is our priority. That\'s why we\'ve implemented Kempinski White Glove Services, ensuring a healthy and safe environment for all guests and employees worldwide.', '12 Ahmed Ragheb, Qasr El Nil, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'stay@thepinehouse.com', 1, '5', '+20 12 3456 7887', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(36, 'Le Passage Cairo Hotel & Casino', 'With a stay at Le Passage Cairo Hotel & Casino in Cairo (Heliopolis), you\'ll be within a 15-minute drive of City Stars and St. Mark\'s Coptic Orthodox Church. This family-friendly hotel is 10.9 mi (17.5 km) from Khan el-Khalili and 12.7 mi (20.4 km) from Tahrir Square. Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You can take advantage of recreational amenities such as a nightclub, a health club, and an outdoor pool. This hotel also features complimentary wireless internet access, concierge services, and an arcade/game room. Guests can catch a ride to nearby destinations on the complimentary area shuttle. Grab a bite at Orangerie Restaurant, one of the hotel\'s 5 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/cafe. Unwind at the end of the day with a drink at the bar/lounge or the poolside bar. Buffet breakfasts are available daily from 4:30 AM to 10:30 AM for a fee. Featured amenities include a business center, express check-out, and dry cleaning/laundry services. Event facilities at this hotel consist of a conference center and a meeting room. A roundtrip airport shuttle is complimentary (available 24 hours). Make yourself at home in one of the 424 air-conditioned rooms featuring minibars and LCD televisions. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Bathrooms feature shower/tub combinations, complimentary toiletries, and hair dryers. Conveniences include phones, as well as safes and electric kettles.', 'Al Houreya - Heliopolis, Sheraton Al Matar,Cairo,Cairo Governorate,Egypt', 'guestcare@islandbreezehotel.com', 1, '5', '+20 12 3456 7888', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(37, 'Ramses Hilton', 'Set on the banks of the River Nile right in the heart of Cairo, the Ramses Hilton hotel is the perfect base for exploring all that Egypt\'s capital has to offer. Take in breathtaking views of the Nile or the majestic city of Cairo from the private balconies of its 811 guest rooms and suites. The Ramses Hilton hotel boasts a range of dining venues and facilities to meet the needs of the discerning traveler: including a British-style pub \'\'Sherlock Holmes\'\', an authentic Indian restaurant \'\'Namaste\'\', a Mediterranean Grill \'\'Citadel\'\', an airy caf?? \'\'Garden Court\'\', an all-day dining restaurant \'\'Terrace Caf??\'\', Breezes lounge & grill, Opia rooftop lounge & Bar located on the 36th floors, a heated outdoor pool with river views, an onsite casino, a fitness center, a shopping Galleria with 250 shops and an exclusive Executive or Ramses Lounge. We also offer evening receptions every night. Only 45 minutes from Cairo International Airport, the Ramses Hilton hotel is 5 minutes from the Egyptian Museum and within easy reach of famous Cairo attractions. Let the staff at this Cairo hotel arrange a day trip or organize transport to the surrounding region. Do business in one of 7 meeting rooms or celebrate in the ballroom for up to 500 guests.', '1115 Corniche El Nile,Cairo,Cairo Governorate,Egypt', 'contact@majesticcoast.com', 1, '5', '+20 12 3456 7889', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(38, 'Radisson Blu Hotel, Cairo Heliopolis', 'Radisson Hotel Group is implementing the Radisson Hotels Safety Protocol, a new program of in-depth cleanliness and disinfection procedures, in partnership with SGS, the world???s leading Health and Safety inspection company. The Radisson Hotels Safety protocol is an extension to the brand commitment which includes 20 Steps and an additional 10-Step protocol for Meetings and Events. These steps include hand sanitizing stations at all entrances, the use of Personal Protective Equipment-PPE, and protective screens, enhanced and recorded cleaning and disinfection frequency, social distancing in all areas of its hotels, reiteration of food safety standards and comprehensive staff training. For additional information please refer to www.radissonhotels.com/safe13;10;13;10;Superbly located in Heliopolis, the Radisson Blu Hotel, Cairo is the hotel of choice for business travelers and tourists. Providing spacious, well appointed guest rooms, the hotel is the perfect oasis for guests visiting the city. Flexible meeting rooms and a day-light ballroom make the hotel one of the area\'s premier conference venues. After a hard day\'s work, or following a visit to Cairo\'s sights, guests can relax and unwind in the Egyptian sun at the hotels rooftop pool and elegant spa area.', 'Abd El-Hameed Badawi, St,Cairo,Cairo Governorate,Egypt', 'hello@valleyviewresort.com', 1, '5', '+20 12 3456 7890', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Kitchen in some rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(39, 'Sheraton Cairo Hotel & Casino', 'Located on the banks of the River Nile. Our family-friendly 5 star hotel offers effortless service and modern accommodations in the heart of Cairo, Egypt. Select from a variety of dining options, including 24-hour room service, an authentic Japanese restaurant, an Egyptian restaurant, and our popular Italian restaurant in addition to several coffee shops and bars. If you are looking to host a business meeting or special event, our business hotel has an array of inspiring and flexible spaces, complete with the latest technology and bespoke planning services. Take a dive into our outdoor pool or get active in our 24-hour fitness center. Rejuvenate in our spa with its wide variety of treatments. All of our hotel rooms and suites offer stunning views of downtown Cairo, some featuring private balconies. Upgrade to our Club Level hotel rooms with lounge access, or to one of our suites with separate sleeping and living accommodation. Some of our thoughtful amenities include free Wi-Fi and bottled water.', 'Charles de Gaulle, Ad Doqi A, Dokki,Giza,Giza Governorate,Egypt', 'info@blueoasis.com', 1, '5', '+20 12 8765 4321', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(40, 'Dusit Thani LakeView Cairo', 'When you stay at Dusit Thani LakeView Cairo in New Cairo, you\'ll be near the airport and 5 minutes by car from German University in Cairo. This luxury hotel is 10.4 mi (16.7 km) from City Stars and 14.3 mi (23 km) from Khan el-Khalili. Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. You can take advantage of recreational amenities such as a health club, an outdoor pool, and a spa tub. This hotel also features complimentary wireless internet access, concierge services, and a hair salon. Enjoy Asian cuisine at TAO, one of the hotel\'s 7 restaurants, or stay in and take advantage of the 24-hour room service. Relax with a refreshing drink from the poolside bar or one of the 3 bars/lounges. Buffet breakfasts are available daily from 6:30 AM to 10:30 AM for a fee. Featured amenities include a business center, complimentary newspapers in the lobby, and dry cleaning/laundry services. A roundtrip airport shuttle is complimentary (available 24 hours). Make yourself at home in one of the 449 air-conditioned rooms featuring minibars. Rooms have private balconies. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Private bathrooms with bathtubs or showers feature designer toiletries and hair dryers.', 'El-Tessen street,New Cairo,Cairo Governorate,Egypt', 'checkin@urbanhaven.com', 1, '5', '+20 12 1111 2222', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Kitchen in some rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(41, 'Holiday Inn Cairo Maadi', 'Welcome to Holiday Inn Cairo Maadi, the perfect choice for your stay in Cairo. Located on the renowned Maadi Corniche, our hotel offers a stunning view of the Nile River, creating a truly magical atmosphere. We are proud to present our collection of 171 rooms & Suites, designed for both business and leisure purposes. Each unit offers breathtaking views of the city or the majestic Nile River. Indulge in the culinary delights of our exquisite restaurants, where our skilled chefs will tantalize your taste buds with their creations. For a more relaxed atmosphere, unwind in our stylish bar or lounge. Our international restaurants offer a plethora of culinary delights that will satisfy even the most discerning palate. Our banquet rooms, equipped with state-of-the-art technology and bathed in natural daylight, provide the perfect setting for your special occasions. Our dedicated team of professionals will meticulously plan every aspect of your event, from tailored menus to innovative coffee breaks. With our unparalleled expertise, we guarantee an unforgettable experience. Unwind and rejuvenate at our fitness center, boasting a wide range of cutting-edge cardio and strength machines. We invite you to immerse yourself in luxury and comfort during your stay at Holiday Inn Cairo.', '29 A Cornish el Nile,Cairo,Cairo Governorate,Egypt', 'booknow@tranquilbay.com', 1, '5', '+20 12 3333 4444', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(42, 'Concorde El Salam Cairo Hotel & Casino', 'With a stay at Concorde El Salam Hotel, you\'ll be centrally located in Cairo, within a 15-minute drive of City Stars and Baron Empain Palace. This family-friendly hotel is 9.5 mi (15.3 km) from Khan el-Khalili and 10.3 mi (16.6 km) from Tahrir Square. Pamper yourself with a visit to the spa, which offers massages. If you\'re looking for recreational opportunities, you\'ll find a health club, an outdoor pool, and a hot tub. This hotel also features complimentary wireless internet access, concierge services, and babysitting (surcharge). Getting to nearby attractions is a breeze with the complimentary area shuttle. Enjoy international cuisine at Cafe Jardin, one of the hotel\'s 6 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/cafe. Relax with a refreshing drink from the poolside bar or one of the 2 bars/lounges. Buffet breakfasts are available daily from 6 AM to 10 AM for a fee. Featured amenities include a business center, limo/town car service, and express check-in. Planning an event in Cairo? This hotel has 4672 square feet (434 square meters) of space consisting of conference space and meeting rooms. A roundtrip airport shuttle is complimentary (available 24 hours). Treat yourself to a stay in one of the 320 individually decorated guestrooms, featuring fireplaces and LCD televisions. Rooms have private balconies. Complimentary wireless internet access keeps you connected, and satellite programming is available for your entertainment. Conveniences include phones, as well as safes and desks.', '69 Abd El-Hameed Badawi, St,Cairo,Cairo Governorate,Egypt', 'contact@crystalview.com', 1, '5', '+20 12 5555 6666', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(43, 'Triumph Luxury Hotel', 'Triumph Luxury hotel is your gate to experience a luxurious lifestyle during your whole time here. Relish the incomparable around-the-clock service provided by our highly trained staff-scrumptious savouries and desserts at our wide variety of restaurants. welcomes you whether its a business trip or a calming vacation- rest assured that all your commands will be fulfilled quickly and efficiently for a time well-spent. Triumph Hotel is dry hotel not offering any alcoholic beverages in its outlets. Pre-Authorization for the Credit card will be obtained to guarantee bookings. Triumph Luxury Hotel is recognized as TripAdvisor travellers Choice for 2021.', 'Block 19 In front of Katameya Heights Road Cairo ??????????????,New Cairo,Cairo Governorate,Egypt', 'reservations@royaltidehotel.com', 1, '5', '+20 12 7777 8888', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Wi-Fi ($)\'\\\",\\\"\'Free parking\'\\\",\\\"\'Pools\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(44, 'JW Marriott Hotel Cairo', 'Welcome to the JW Marriott Hotel Cairo, where you can experience true luxury with our 5-star accommodations and award-winning service. Ideally located in New Cairo, just a short distance from Cairo International Airport, our hotel is perfect for both event attendees at the Al Manara Convention Centre and families on holiday. Our 445 impeccably appointed rooms and suites are designed for your comfort, featuring refined amenities that cater to your needs. Indulge in exquisite dining at our 10 diverse restaurants, offering Italian, Asian, American, and Oriental cuisines. Challenge yourself with a round of golf at the Mirage City Golf Club, or relax at our Mandara Spa. Take advantage of our stunning man-made beach and thrilling kids water activities and enjoy an immersive family time. One of the best hotels in Cairo, we are committed to sustainability, implementing initiatives such as LED lighting and solar energy utilization. During your stay, explore the nearby malls with ease.', 'Ring Road, Mirage City,,New Cairo,Cairo Governorate,Egypt', 'stay@theamberlodge.com', 1, '5', '+20 12 9999 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(45, 'Waldorf Astoria Cairo Heliopolis', 'A beacon of personalized hospitality and Egyptian heritage, the Waldorf Astoria Cairo is an exclusive gateway to authentic experiences, where unforgettable moments are curated for each and every guest. Located in Heliopolis, described as the most ???Mediterranean??? part of the metropolis, designed to serve as an oasis for those who wish to stay away from the crowded downtown Cairo. our hotel boasts luxury accommodations, elegant design, unparalleled dining and events. This hotel represents our door to Africa, the first Waldorf Astoria to Egypt, where ancient Cairo meets a new sophisticated luxury era. At a glance ??? 235 spacious and residential guest rooms ??? 17 lavish and well-appointed suites ??? Brand???s signature service, The Personal Concierge ??? Four destination dining concepts ??? Outdoor swimming pool surrounded by beautiful gardens ??? Five luxury spa treatment suites ??? Six meeting rooms and a business center ??? Bridal suite adjacent to The Grand ballroom, accommodating up to 1600 guests', '4948+RFR, El-Orouba, Sheraton Al Matar,Cairo,Cairo Governorate,Egypt', 'bookings@panoramahill.com', 1, '5', '+20 12 1023 4567', 2, '\"[\\\"[\'Breakfast ($)\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Kitchen in some rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Child-friendly\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(46, 'Royal Maxim Palace Kempinski Cairo', 'Live moments that present captivating experiences with excellent European service under the azure cupolas crowning our Palace. Featuring 245 guest rooms and suites as private retreats the focus of the design is both comfort and elegance. With a wide variety of restaurants and bars to choose from; allow us to take you on a culinary journey at one of our different venues for an experience like never before. The Palace is also home to the countrys largest ballroom and an array of meeting spaces.', 'First Settlement, Eastern Ring Road,New Cairo,Cairo Governorate,Egypt', 'hello@greenleafsuites.com', 1, '5', '+20 12 6789 0123', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Pet-friendly\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Business centre\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(47, 'Four Seasons Hotel Cairo at Nile Plaza', 'Discover 30 storeys of dining, entertainment, and Egyptian art deco influenced d?cor at our luxury Cairo hotel. Situated on the legendary Corniche along the Nile River, Four Seasons Hotel Cairo at Nile Plaza is a place to treat yourself. Featuring 365 luxury guest rooms and suites; 3 heated pools - a free form swimming pool, a lap pool with adjacent whirlpool and a children\'\'s pool nearby for kids 4-12 years of age; largest Spa facility in Cairo with 14 treatment rooms; a 24-hour state-of-the-art health club; 9 restaturants and lounges; family activities, on-site activities with children amenities.', '1089 CORNICHE EL NIL,Cairo,Cairo Governorate,Egypt', 'guest@beachfrontretreat.com', 1, '5', '+20 12 1357 2468', 2, '\"[\\\"[\'Free breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Outdoor pool\'\\\",\\\"\'Hot tub\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'All-inclusive available\'\\\",\\\"\'Spa\'\\\",\\\"\'Beach access\'\\\",\\\"\'Bar\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\'\\\",\\\"\'Business centre\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(48, 'Hyatt Regency Cairo West', 'Discover timeless accommodation locally inspired by Egyptian culture and its take on ancient solar boats when staying at Hyatt Regency Cairo West. Experience a blend of thoughtfully designed technology enabled guest rooms visionary highly adaptable meeting spaces and an array of dynamic and exciting dining options. Relax socialize and connect with family and friends to the breathtaking views of the Giza Pyramids as our floor to ceiling windows offer guests a unique panoramic view over the city. Celebrations and events are made even more exciting when held at our expandable ballroom featuring the first 360 degree projection technology in Cairo.', '238C+WMG, Cairo - Alexandria Desert Rd, First,6th of October City,Giza Governorate,Egypt', 'service@thecrownvilla.com', 1, '5', '+20 12 2468 1357', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Kitchen in some rooms\'\\\",\\\"\'Airport shuttle\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Smoke-free property\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(49, 'Tolip Golden Plaza', 'Located in Cairo (Nasr City), Tolip Golden Plaza is within a 15-minute walk of City Stars and Tivoli Dome. This family-friendly hotel is 9.5 mi (15.3 km) from Egyptian Museum and 7.7 mi (12.4 km) from Khan el-Khalili.Take time to pamper yourself with a visit to the full-service spa. You can take advantage of recreational amenities such as an outdoor pool, a sauna, and a fitness center. Additional features at this hotel include complimentary wireless Internet access, concierge services, and wedding services.Grab a bite to eat at one of the hotel\'s 2 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/cafe. Unwind at the end of the day with a drink at the bar/lounge or the poolside bar.Featured amenities include dry cleaning/laundry services, a 24-hour front desk, and multilingual staff. Planning an event in Cairo? This hotel has facilities measuring 19235 square feet (1787 square meters), including a conference center. Self parking (subject to charges) is available onsite.Treat yourself to a stay in one of the 365 guestrooms, featuring fireplaces and flat-screen televisions. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Conveniences include phones, as well as safes and desks.', 'Masaken Al Mohandesin,Cairo,Cairo Governorate,Egypt', 'team@copperhillinn.com', 1, '5', '+20 12 1112 2233', 2, '\"[\\\"[\'Breakfast\'\\\",\\\"\'Free Wi-Fi\'\\\",\\\"\'Free parking\'\\\",\\\"\'Pool\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Fitness centre\'\\\",\\\"\'Spa\'\\\",\\\"\'Restaurant\'\\\",\\\"\'Kitchen in rooms\'\\\",\\\"\'Full-service laundry\'\\\",\\\"\'Accessible\']\\\"]\"', 70, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(50, 'Crowne Plaza West Cairo Arkan', 'No description available.', 'Arkan Plaza Zayed Entrance, 2 26th of July Corridor, First,Sheikh Zayed City,Giza Governorate,Egypt', 'info50@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(51, 'Four Seasons Hotel Cairo at the First Residence', 'No description available.', '35 Giza St, Oula, Al,Giza,Giza Governorate,Egypt', 'info51@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(52, 'Sofitel Cairo Downtown Nile', 'No description available.', '1191 Nile Corniche, Souq Al Asr Bulaq, PO BOX 2044,Cairo,Cairo Governorate,Egypt', 'info52@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(53, 'Sofitel Cairo Nile El Gezirah', 'No description available.', '3 El Thawra Council St Zamalek, El Orman,Cairo,Cairo Governorate,Egypt', 'info53@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(54, 'Helmy House', 'No description available.', 'group 55,New Cairo,Cairo Governorate,Egypt', 'info54@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(55, 'Nile View Jewel Hotel', 'No description available.', 'In front of El, Maadi Star Towers, Corniche,Cairo,Cairo Governorate,Egypt', 'info55@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(56, 'Nile Smart', 'No description available.', 'First Corniche El Nil Maadi,Beside As Salam Hospital,Cairo,Cairo Governorate,Egypt', 'info56@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(57, 'Diamond ship Hotel', 'No description available.', 'Diamond Cruise Hotel,Cairo,11311,Cairo Governorate,Egypt', 'info57@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(58, 'Paradise of Pyramids View', 'No description available.', 'Sayed Gabir,Giza,12557,Giza Governorate,Egypt', 'info58@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(59, 'Chez Haytham at Four Seasons Residential Suite', 'No description available.', '1089 Nile Corniche, Four Seasons Hotel Cairo at Nile Plaza,Cairo,Cairo Governorate,Egypt', 'info59@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(60, 'Luxurious Villa Serene Garden New Cairo', 'No description available.', 'North Street New Cairo 1,New Cairo,473321,Cairo Governorate,Egypt', 'info60@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(61, 'Tolip El Galaa Hotel Cairo', 'No description available.', '40 El Orouba Street,Cairo,Cairo Governorate,Egypt', 'info61@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(62, 'The St. Regis Cairo', 'No description available.', '1189 Nile Corniche, Boulaq Num.5,Cairo,Cairo Governorate,Egypt', 'info62@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(63, 'Pyramisa Suites Hotel Cairo', 'No description available.', 'Pyramisa Suites Hotel Cairo, Abi Emama, Ad Doqi A, Dokki,Giza,Giza Governorate,Egypt', 'info63@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(64, 'Tolip Gardens Hotel', 'No description available.', 'Tolip Gardens Hotel, Suez Rd,Cairo,Cairo Governorate,Egypt', 'info64@example.com', 1, '3', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(65, 'The St. Regis New Capital, Cairo', 'No description available.', 'New Administrative CapitalÃ�Â� ALMASA Capital -New Administrative Capital,New Cairo,Cairo Governorate,Egypt', 'info65@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(66, 'Monvenpick Hotel Cairo-Media City', 'No description available.', 'El Wahat Rd, First 6th of October, Third,6th of October City,Giza Governorate,Egypt', 'info66@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(67, 'The Westin Cairo Golf Resort & Spa, Katameya Dunes', 'No description available.', 'Road 90 New Cairo City, Katameya Dunes,New Cairo,Cairo Governorate,Egypt', 'info67@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(68, 'Tolip Family Park Hotel', 'No description available.', 'El rehab city, Second New Cairo,New Cairo,Cairo Governorate,Egypt', 'info68@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(69, 'Safir Hotel Cairo', 'No description available.', '22 Al Mesaha, Dokki,Giza,Giza Governorate,Egypt', 'info69@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(70, 'Sofitel Cairo Downtown Nile', 'No description available.', '1191 Nile Corniche,Cairo,4311103,Cairo Governorate,Egypt', 'info70@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(71, 'Al Masa Hotel Nasr City', 'No description available.', 'Dr Abd El-Aziz El-Shennawy, Gameat Al Azhar, Qesm Than Madinet Nasr, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'info82@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(72, 'The Nile Ritz-Carlton, Cairo', 'No description available.', '1113 Nile Corniche, Ismailia, El Nil,Cairo,Cairo Governorate,Egypt', 'info83@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(73, 'Holiday Inn Cairo Maadi, an IHG Hotel', 'No description available.', 'Cornish El Nil, Maadi,Cairo,11431,Cairo Governorate,Egypt', 'info84@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(74, 'Renaissance Cairo Mirage City Hotel', 'No description available.', 'Abbas Al Akad Corridor, Second,New Cairo,Cairo Governorate,Egypt', 'info85@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(75, 'Sonesta Hotel Tower & Casino Cairo', 'No description available.', '3 Tayaran St,Cairo,Cairo Governorate,Egypt', 'info86@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(76, 'Le Meridien Cairo Airport', 'No description available.', 'Sheraton Al Matar,Cairo,Cairo Governorate,Egypt', 'info87@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(77, 'Hyatt Centric Cairo West', 'No description available.', 'KM 22 - Alexandria Desert Road, Blgd 10, Pyramids Heights Business Park,6th of October City,Giza Governorate,Egypt', 'info88@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(78, 'Hilton Cairo Grand Nile', 'No description available.', 'Abdulaziz Al Saud,Cairo,Cairo Governorate,Egypt', 'info89@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(79, 'Sun City Hotel - the Gabriel', 'No description available.', 'Suncity Mall, Autostrad Road,Cairo,Cairo Governorate,Egypt', 'info90@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(80, 'Pyramids Kingdom', 'No description available.', '5th abdeltty st nazlet el saman,Giza,12557,Giza Governorate,Egypt', 'info91@example.com', 1, '5', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(81, 'sultan pyramids view', 'No description available.', '11 Abou Al Hool Al Seiahi,Giza,12557,Giza Governorate,Egypt', 'info92@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(82, 'Conrad Cairo', 'No description available.', '1191 Nile Corniche, Souq Al ASR,Cairo,Cairo Governorate,Egypt', 'info93@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(83, 'Tolip El Narges', 'No description available.', '90th street-Fifth settlement,New Cairo,Cairo Governorate,Egypt', 'info94@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(84, 'Pyramisa Downtown Residence Hotel Cairo', 'No description available.', 'Abi Emama Street, Dokki,Giza,Giza Governorate,Egypt', 'info95@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(85, 'Hilton Pyramids Golf', 'No description available.', 'El Wahat Rd, First,6th of October City,Giza Governorate,Egypt', 'info96@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(86, 'Hilton Cairo Nile Maadi', 'No description available.', '47-B Nile Corniche, Maadi,Cairo,Cairo Governorate,Egypt', 'info97@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(87, 'Hilton Cairo Heliopolis Hotel', 'No description available.', 'El-Orouba, Sheraton Al Matar, El Nozha, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'info98@example.com', 1, '4', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\'\\\",\\\"\'Airport shuttle\'\\\"]\"', 40, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(88, 'Kempinski Nile Hotel Cairo', 'No description available.', '12 Ahmed Ragheb, Qasr El Nil, Cairo Governorate,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(89, 'Le Passage Cairo Hotel & Casino', 'No description available.', 'Al Houreya - Heliopolis, Sheraton Al Matar,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(90, 'Ramses Hilton', 'No description available.', '1115 Corniche El Nile,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(91, 'Radisson Blu Hotel, Cairo Heliopolis', 'No description available.', 'Abd El-Hameed Badawi, St,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(92, 'Sheraton Cairo Hotel & Casino', 'No description available.', 'Charles de Gaulle, Ad Doqi A, Dokki,Giza,Giza Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(93, 'Dusit Thani LakeView Cairo', 'No description available.', 'El-Tessen street,New Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(94, 'Holiday Inn Cairo Maadi', 'No description available.', '29 A Cornish el Nile,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(95, 'Concorde El Salam Cairo Hotel & Casino', 'No description available.', '69 Abd El-Hameed Badawi, St,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(96, 'Triumph Luxury Hotel', 'No description available.', 'Block 19 In front of Katameya Heights Road Cairo ,New Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(97, 'JW Marriott Hotel Cairo', 'No description available.', 'Ring Road, Mirage City,,New Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(98, 'Waldorf Astoria Cairo Heliopolis', 'No description available.', '4948+RFR, El-Orouba, Sheraton Al Matar,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(99, 'Holiday Inn & Suites Cairo Maadi', 'No description available.', '29 A Cornish el Nile,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(100, 'Royal Maxim Palace Kempinski Cairo', 'No description available.', 'First Settlement, Eastern Ring Road,New Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(101, 'Four Seasons Hotel Cairo at Nile Plaza', 'No description available.', '1089 CORNICHE EL NIL,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(102, 'Hyatt Regency Cairo West', 'No description available.', '238C+WMG, Cairo - Alexandria Desert Rd, First,6th of October City,Giza Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(103, 'Crowne Plaza West Cairo Arkan', 'No description available.', 'Arkan Plaza Zayed Entrance, 2 26th of July Corridor, First,Sheikh Zayed City,Giza Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(104, 'Four Seasons Hotel Cairo at the First Residence', 'No description available.', '35 Giza St, Oula, Al,Giza,Giza Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(105, 'Sofitel Cairo Downtown Nile', 'No description available.', '1191 Nile Corniche, Souq Al Asr Bulaq, PO BOX 2044,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '1', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(106, 'Sofitel Cairo Nile El Gezirah', 'No description available.', '3 El Thawra Council St Zamalek, El Orman,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(107, 'Helmy House', 'No description available.', 'group 55,New Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '1', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(108, 'Nile View Jewel Hotel', 'No description available.', 'In front of El, Maadi Star Towers, Corniche,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '1', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(109, 'Nile Smart', 'No description available.', 'First Corniche El Nil Maadi,Beside As Salam Hospital,Cairo,Cairo Governorate,Egypt', 'info@example.com', 1, '1', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(110, 'Paradise of Pyramids View', 'No description available.', 'Sayed Gabir,Giza,12557,Giza Governorate,Egypt', 'info@example.com', 1, '2', '+20 12 0000 0000', 2, '\"[\\\"[\'Free Wi-Fi\'\\\",\\\"\'Air conditioning\'\\\",\\\"\'Room service\']\\\"]\"', 70, '2025-05-31 14:13:14', '2025-05-31 14:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_booking_rooms`
--

CREATE TABLE `hotel_booking_rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_booking_rooms`
--

INSERT INTO `hotel_booking_rooms` (`id`, `hotel_id`, `booking_id`, `room_id`, `created_at`, `updated_at`) VALUES
(2, 34, 6, 102, '2025-05-31 18:33:58', '2025-05-31 18:33:58'),
(3, 34, 7, 102, '2025-05-31 18:34:41', '2025-05-31 18:34:41');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_images`
--

CREATE TABLE `hotel_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotel_images`
--

INSERT INTO `hotel_images` (`id`, `hotel_id`, `image_url`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://pavo.elongstatic.com/i/h5hotel350_350/1qqhgGLLDvG.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(2, 1, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1pKXlCfy5NK.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(3, 1, 'https://pavo.elongstatic.com/i/h5hotel350_350/1vUqsuwRkxq.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(4, 2, 'https://pavo.elongstatic.com/i/h5hotel350_350/1uTXDJ8oVrO.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(5, 2, 'https://pavo.elongstatic.com/i/h5hotel350_350/1uTXDPqYxMY.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(6, 2, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uTXDtr4bDO.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(7, 3, 'https://pavo.elongstatic.com/i/h5hotel350_350/1CWWYkw7DWg.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(8, 3, 'https://pavo.elongstatic.com/i/h5hotel350_350/1yXEXLB3mr6.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(9, 3, 'https://pavo.elongstatic.com/i/h5hotel350_350/1vXKgIkPVsJ.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(10, 4, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbV7vca5O.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(11, 4, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbUIGIg24.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(12, 4, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BHQaD0XjZC.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(13, 5, 'https://pavo.elongstatic.com/i/h5hotel350_350/1D0qnpAAIY8.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(14, 5, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DanaipnWXS.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(15, 5, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DflOfGHGow.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(16, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAq7Dv6NHO.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(17, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAq7CqY3C0.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(18, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAq7EUwRgc.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(19, 7, 'https://pavo.elongstatic.com/i/flag952_377/1xveOsXTKKI.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(20, 7, 'https://pavo.elongstatic.com/i/flag952_377/1xveOKTKwbm.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(21, 7, 'https://pavo.elongstatic.com/i/flag952_377/1xveOEj08Ss.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(22, 8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756336.jpg?k=d9e59071575ff12036939e9f5bc5b01bc5b391e206e3b980e7e0a53b30d6152d&o=&hp=1', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(23, 8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756162.jpg?k=f8ad0f713b368b5cf9a42dbd1c4fe97c5ec47081f305a527dc88492adfe7f0eb&o=&hp=1', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(24, 8, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756336.jpg?k=d9e59071575ff12036939e9f5bc5b01bc5b391e206e3b980e7e0a53b30d6152d&o=&hp=1', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(25, 9, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPdopDMBO.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(26, 9, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpHIANhu.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(27, 9, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpDVQzUk.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(28, 10, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1D6UH6t0Ryw.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(29, 10, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONJJok8g.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(30, 10, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONMUX9Je.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(31, 11, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uazvcEgEYo.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(32, 11, 'https://pavo.elongstatic.com/i/h5hotel350_350/1hCLfvrJTHi.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(33, 11, 'https://pavo.elongstatic.com/i/h5hotel350_350/1CVrs7FV2zm.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(34, 12, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kC852nF7QA.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(35, 12, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(36, 12, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qyuseBJeUg.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(37, 13, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1yVe9laZaXT.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(38, 13, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hYPnd0Mve0.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(39, 13, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hZ16sBvmbC.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(40, 14, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qyuseBJeUg.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(41, 14, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1xXb1GNn3BC.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(42, 14, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1u1cwx9cG9q.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(43, 15, 'https://pavo.elongstatic.com/i/h5hotel350_350/1D0qnpAAIY8.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(44, 15, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1jcZZ6nakHC.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(45, 15, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756162.jpg?k=f8ad0f713b368b5cf9a42dbd1c4fe97c5ec47081f305a527dc88492adfe7f0eb&o=&hp=1', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(46, 16, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CW75nGXJ6M.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(47, 16, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uTXDtr4bDO.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(48, 16, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1rbfcNOmLuM.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(49, 17, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1jcZZ6nakHC.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(50, 17, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(51, 17, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DflOfGHGow.jpg', 0, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(52, 18, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1AislRbEniU.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(53, 18, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1tgJytgSigE.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(54, 18, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbUIGIg24.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(55, 19, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ySOytIlV4I.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(56, 19, 'https://pavo.elongstatic.com/i/h5hotel350_350/1qqhgGLLDvG.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(57, 19, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1nxkJ48MMz6.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(58, 20, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1D6UH6t0Ryw.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(59, 20, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPdopDMBO.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(60, 20, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ycp28iMzfO.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(61, 21, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vlAd0vMC2Y.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(62, 21, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kC852nF7QA.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(63, 21, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ljtuj0VY9a.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(64, 22, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(65, 22, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kCDQwzHbDa.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(66, 22, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1w4ojo4t9jG.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(67, 23, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BHQaD0XjZC.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(68, 23, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1uyDD3nvdLi.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(69, 23, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1xDgb4xD6jS.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(70, 24, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uazvcEgEYo.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(71, 24, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1sHgKYQ70kw.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(72, 24, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qwpPQLC61G.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(73, 25, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1zYwrbL51MQ.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(74, 25, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1tgJytgSigE.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(75, 25, 'https://pavo.elongstatic.com/i/h5hotel350_350/1CVrs7FV2zm.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(76, 26, 'https://pavo.elongstatic.com/i/h5hotel350_350/1qqhgGLLDvG.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(77, 26, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DflOfGHGow.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(78, 26, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1rjApF10CC4.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(79, 27, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kreR5ONE8U.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(80, 27, 'https://pavo.elongstatic.com/i/flag952_377/1xveOsXTKKI.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(81, 27, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1u1cwx9cG9q.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(82, 28, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kC852nF7QA.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(83, 28, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ySOytIlV4I.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(84, 28, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1Akikxd24Cs.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(85, 29, 'https://pavo.elongstatic.com/i/h5hotel350_350/1CVrs7FV2zm.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(86, 29, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kB21YLeXQY.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(87, 29, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kBftr9e2qI.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(88, 30, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oHqugUCzrq.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(89, 30, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbV7vca5O.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(90, 30, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kryU5kb4I0.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(91, 31, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONJJok8g.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(92, 31, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1B9JYC27Fjq.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(93, 31, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vR6DORmfYs.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(94, 32, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uazvcEgEYo.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(95, 32, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ycp28iMzfO.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(96, 32, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hZ1jv191bG.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(97, 33, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1mrhvRdbG12.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(98, 33, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kBftr9e2qI.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(99, 33, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1o4wFAUaIP6.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(100, 34, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbV7vca5O.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(101, 34, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1A8BIj4Cuqc.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(102, 34, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qyuseBJeUg.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(103, 35, 'https://pavo.elongstatic.com/i/mobile220_220/nw_000ghmmL.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(104, 35, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1z3ttpO4nRK.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(105, 35, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CWMUFg6oVy.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(106, 36, 'https://pavo.elongstatic.com/i/h5hotel350_350/1D0qnpAAIY8.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(107, 36, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(108, 36, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756162.jpg?k=f8ad0f713b368b5cf9a42dbd1c4fe97c5ec47081f305a527dc88492adfe7f0eb&o=&hp=1', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(109, 37, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(110, 37, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1tvxRssi2ze.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(111, 37, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DanaipnWXS.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(112, 38, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpHIANhu.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(113, 38, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbV7vca5O.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(114, 38, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAq7EUwRgc.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(115, 39, 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/530756162.jpg?k=f8ad0f713b368b5cf9a42dbd1c4fe97c5ec47081f305a527dc88492adfe7f0eb&o=&hp=1', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(116, 39, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1plbUSdH6Qo.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(117, 39, 'https://pavo.elongstatic.com/i/flag952_377/1xveOKTKwbm.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(118, 40, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kASlWO09Ik.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(119, 40, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1plcVRSeZag.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(120, 40, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hZ1jv191bG.jpg', 0, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(121, 41, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1yVe9laZaXT.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(122, 41, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1wDj8w34fKg.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(123, 41, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CWMUFg6oVy.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(124, 42, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbV7vca5O.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(125, 42, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1uTXDtr4bDO.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(126, 42, 'https://pavo.elongstatic.com/i/h5hotel350_350/1hCLfvrJTHi.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(127, 43, 'https://pavo.elongstatic.com/i/h5hotel350_350/1uTXDxUXCvu.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(128, 43, 'https://pavo.elongstatic.com/i/h5hotel350_350/1plbUIGIg24.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(129, 43, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1pNNxu34Nlm.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(130, 44, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1plcVRSeZag.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(131, 44, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1Akikxd24Cs.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(132, 44, 'https://pavo.elongstatic.com/i/flag952_377/1xveOsXTKKI.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(133, 45, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BHQaD0XjZC.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(134, 45, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kB21YLeXQY.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(135, 45, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oHqugUCzrq.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(136, 46, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1pKXlCfy5NK.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(137, 46, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1yEFVNPAWe4.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(138, 46, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kAV32tMYrS.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(139, 47, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vmiQwAWERq.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(140, 47, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qyuseBJeUg.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(141, 47, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1mrhvRdbG12.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(142, 48, 'https://pavo.elongstatic.com/i/h5hotel350_350/1hCLfvrJTHi.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(143, 48, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1A8BIj4Cuqc.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(144, 48, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oWSLSnGRW0.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(145, 49, 'https://pavo.elongstatic.com/i/h5hotel350_350/1DanaipnWXS.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(146, 49, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BHQaD0XjZC.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(147, 49, 'https://pavo.elongstatic.com/i/h5hotel350_350/1D0qnpAAIY8.jpg', 0, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(148, 50, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kryU5kb4I0.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(149, 50, 'https://i.ibb.co/BHJtSJNS/bed-303.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(150, 50, 'https://i.ibb.co/bM9K0Ps1/bed-304.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(151, 51, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1je7IVwwBcA.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(152, 52, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1C7vfgpyCnm.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(153, 53, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1o4wFAUaIP6.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(154, 54, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kWTxiY7bEs.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(155, 55, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vXKhDjXe0g.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(156, 56, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CGt1vFqswM.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(157, 57, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ljtuj0VY9a.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(158, 58, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1uXxBpaW1va.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(159, 59, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1BR3ZqD8Vig.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(160, 60, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1xllbMaVfMc.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(161, 61, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1nxkJ48MMz6.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(162, 62, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1zMharh1gcM.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(163, 63, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1pTB0xFag4E.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(164, 64, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ti2kesTfeo.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(165, 65, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qwpPQLC61G.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(166, 66, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1rp1NatbzXO.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(167, 67, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hZ1jv191bG.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(168, 68, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1xDgb4xD6jS.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(169, 69, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1jcZZ6nakHC.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(170, 70, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1A8BIj4Cuqc.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(171, 71, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kC852nF7QA.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(172, 72, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CxUpWKUbUA.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(173, 73, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1uyDD3nvdLi.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(174, 74, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1rbfcNOmLuM.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(175, 75, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vR6DORmfYs.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(176, 76, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hYPnd0Mve0.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(177, 77, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CWMUFg6oVy.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(178, 78, 'https://pavo.elongstatic.com/i/mobile220_220/nw_WffonOElxK.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(179, 79, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kC2dUIv3sA.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(180, 80, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1yEFVNPAWe4.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(181, 81, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1AislRbEniU.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(182, 82, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1sHgKYQ70kw.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(183, 83, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1x2OgIeF67u.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(184, 84, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1mtNtZ7COwo.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(185, 85, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1hZ16sBvmbC.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(186, 86, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1zpq7ogVOWQ.jpg', 0, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(187, 87, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vlAd0vMC2Y.jpg', 0, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(188, 88, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1qyuseBJeUg.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(189, 89, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kBftr9e2qI.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(190, 90, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1oHqugUCzrq.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(191, 91, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kAV32tMYrS.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(192, 92, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1jcGprAfCbm.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(193, 93, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1DtsQRtTSzS.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(194, 94, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1ohfxHBOc2Q.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(195, 95, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kAObONdQoU.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(196, 96, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1xXb1GNn3BC.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(197, 97, 'https://pavo.elongstatic.com/i/mobile220_220/nw_000ghmmL.jpg', 0, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(198, 98, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1w4ojo4t9jG.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(199, 99, 'https://pavo.elongstatic.com/i/Mobile720_720/nw_1ohfxHBOc2Q.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(200, 100, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1jbvIMjUYSc.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(201, 101, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1q6gGpOnIHu.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(202, 102, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CW75nGXJ6M.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(203, 103, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kryU5kb4I0.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(204, 104, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1je7IVwwBcA.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(205, 105, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1C7vfgpyCnm.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(206, 106, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1o4wFAUaIP6.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(207, 107, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1kWTxiY7bEs.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(208, 108, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1vXKhDjXe0g.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(209, 109, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1CGt1vFqswM.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(210, 110, 'https://pavo.elongstatic.com/i/mobile220_220/nw_1uXxBpaW1va.jpg', 0, '2025-05-31 14:13:14', '2025-05-31 14:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2025_04_25_164412_create_cities_table', 1),
(5, '2025_04_25_164421_create_users_table', 1),
(6, '2025_04_25_164725_create_hotels_table', 1),
(7, '2025_04_25_164738_create_room_types_table', 1),
(8, '2025_04_25_164746_create_rooms_table', 1),
(9, '2025_04_25_164754_create_room_images_table', 1),
(10, '2025_04_25_164814_create_bookings_table', 1),
(11, '2025_04_25_164822_create_payments_table', 1),
(12, '2025_04_25_164830_create_user_preferences_table', 1),
(13, '2025_04_25_164843_create_transportation_table', 1),
(14, '2025_04_25_164852_create_restaurants_table', 1),
(15, '2025_04_25_164859_create_entertainment_places_table', 1),
(16, '2025_04_25_164904_create_recommendations_table', 1),
(17, '2025_04_25_164910_create_ai_model_metadata_table', 1),
(18, '2025_04_25_164916_create_reviews_table', 1),
(19, '2025_05_22_082910_create_hotel_images_table', 1),
(20, '2025_05_31_210717_create_hotel_booking_rooms_table', 2),
(21, '2025_05_31_213002_add_hotel_id_to_bookings_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '95e23d7d408b70887f615e6cb89923418a25e3936f18a6845dc7494f0eefa230', '[\"*\"]', '2025-05-28 14:22:54', NULL, '2025-05-28 12:15:08', '2025-05-28 14:22:54'),
(2, 'App\\Models\\User', 1, 'auth_token', '0757f09b3c3d03120f711f19afeae5e4c6c0127307c9e466ec38c75aa5dcad99', '[\"*\"]', '2025-05-29 22:25:57', NULL, '2025-05-29 22:08:12', '2025-05-29 22:25:57'),
(3, 'App\\Models\\User', 1, 'auth_token', '6b0403933607bdc29a6a16b2778b8159845a30d72c6cd07167fd75d655fc38ef', '[\"*\"]', '2025-05-31 10:20:07', NULL, '2025-05-31 10:19:40', '2025-05-31 10:20:07'),
(4, 'App\\Models\\User', 1, 'auth_token', '7871a1fba44f2c64911201d3b8ae55df0ec5b7eff0daccc41abd52f7da251f7a', '[\"*\"]', '2025-05-31 13:41:47', NULL, '2025-05-31 13:35:37', '2025-05-31 13:41:47'),
(5, 'App\\Models\\User', 2, 'auth_token', 'acb838d934a0f98a2253766a28cf431f2785442b5d0e0bd819db6b2acd7a001e', '[\"*\"]', '2025-05-31 14:32:06', NULL, '2025-05-31 14:09:02', '2025-05-31 14:32:06'),
(6, 'App\\Models\\User', 2, 'auth_token', '9890f69745cefd704d9326f6e272ac2b12425d1bb6412d273c6cf63fe6d6c071', '[\"*\"]', '2025-05-31 18:25:45', NULL, '2025-05-31 18:17:43', '2025-05-31 18:25:45'),
(7, 'App\\Models\\User', 2, 'auth_token', '448065f19ff3343e7d3e5e55b12a4c091e578146f5ed36c9a1f27bfd1fc98fbc', '[\"*\"]', '2025-05-31 18:55:15', NULL, '2025-05-31 18:31:17', '2025-05-31 18:55:15');

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED DEFAULT NULL,
  `transportation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `restaurant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `entertainment_place_id` bigint(20) UNSIGNED DEFAULT NULL,
  `score` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `average_cost` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL,
  `room_type_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `single_price` decimal(8,2) DEFAULT NULL,
  `double_price` decimal(8,2) DEFAULT NULL,
  `deluxe_price` decimal(8,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hotel_id`, `room_type_id`, `name`, `single_price`, `double_price`, `deluxe_price`, `description`, `price`, `quantity`, `is_available`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Single Room', 85.00, NULL, NULL, 'single room', 85.00, 30, 1, '2025-05-31 14:09:46', '2025-05-31 14:31:04'),
(2, 1, 2, 'Double Room', NULL, 500.00, NULL, 'double room', 500.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 18:18:31'),
(3, 1, 3, 'Deluxe Room', NULL, NULL, 1000.00, 'deluxe room', 1000.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(4, 2, 1, 'Single Room', 40.00, NULL, NULL, 'single room', 40.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(5, 2, 2, 'Double Room', NULL, 506.00, NULL, 'double room', 506.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(6, 2, 3, 'Deluxe Room', NULL, NULL, 1090.00, 'deluxe room', 1090.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(7, 3, 1, 'Single Room', 120.00, NULL, NULL, 'single room', 120.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(8, 3, 2, 'Double Room', NULL, 505.00, NULL, 'double room', 505.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(9, 3, 3, 'Deluxe Room', NULL, NULL, 1010.00, 'deluxe room', 1010.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(10, 4, 1, 'Single Room', 245.00, NULL, NULL, 'single room', 245.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(11, 4, 2, 'Double Room', NULL, 510.00, NULL, 'double room', 510.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(12, 4, 3, 'Deluxe Room', NULL, NULL, 1020.00, 'deluxe room', 1020.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(13, 5, 1, 'Single Room', 70.00, NULL, NULL, 'single room', 70.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(14, 5, 2, 'Double Room', NULL, 515.00, NULL, 'double room', 515.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(15, 5, 3, 'Deluxe Room', NULL, NULL, 1030.00, 'deluxe room', 1030.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(16, 6, 1, 'Single Room', 310.00, NULL, NULL, 'single room', 310.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(17, 6, 2, 'Double Room', NULL, 520.00, NULL, 'double room', 520.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(18, 6, 3, 'Deluxe Room', NULL, NULL, 1040.00, 'deluxe room', 1040.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(19, 7, 1, 'Single Room', 95.00, NULL, NULL, 'single room', 95.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(20, 7, 2, 'Double Room', NULL, 525.00, NULL, 'double room', 525.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(21, 7, 3, 'Deluxe Room', NULL, NULL, 1050.00, 'deluxe room', 1050.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(22, 8, 1, 'Single Room', 150.00, NULL, NULL, 'single room', 150.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(23, 8, 2, 'Double Room', NULL, 530.00, NULL, 'double room', 530.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(24, 8, 3, 'Deluxe Room', NULL, NULL, 1060.00, 'deluxe room', 1060.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(25, 9, 1, 'Single Room', 110.00, NULL, NULL, 'single room', 110.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(26, 9, 2, 'Double Room', NULL, 535.00, NULL, 'double room', 535.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(27, 9, 3, 'Deluxe Room', NULL, NULL, 1070.00, 'deluxe room', 1070.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(28, 10, 1, 'Single Room', 275.00, NULL, NULL, 'single room', 275.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(29, 10, 2, 'Double Room', NULL, 540.00, NULL, 'double room', 540.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(30, 10, 3, 'Deluxe Room', NULL, NULL, 1080.00, 'deluxe room', 1080.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(31, 11, 1, 'Single Room', 90.00, NULL, NULL, 'single room', 90.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(32, 11, 2, 'Double Room', NULL, 545.00, NULL, 'double room', 545.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(33, 11, 3, 'Deluxe Room', NULL, NULL, 1090.00, 'deluxe room', 1090.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(34, 12, 1, 'Single Room', 160.00, NULL, NULL, 'single room', 160.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(35, 12, 2, 'Double Room', NULL, 550.00, NULL, 'double room', 550.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(36, 12, 3, 'Deluxe Room', NULL, NULL, 1100.00, 'deluxe room', 1100.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(37, 13, 1, 'Single Room', 60.00, NULL, NULL, 'single room', 60.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(38, 13, 2, 'Double Room', NULL, 555.00, NULL, 'double room', 555.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(39, 13, 3, 'Deluxe Room', NULL, NULL, 1110.00, 'deluxe room', 1110.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(40, 14, 1, 'Single Room', 220.00, NULL, NULL, 'single room', 220.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(41, 14, 2, 'Double Room', NULL, 560.00, NULL, 'double room', 560.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(42, 14, 3, 'Deluxe Room', NULL, NULL, 1120.00, 'deluxe room', 1120.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(43, 15, 1, 'Single Room', 80.00, NULL, NULL, 'single room', 80.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(44, 15, 2, 'Double Room', NULL, 565.00, NULL, 'double room', 565.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(45, 15, 3, 'Deluxe Room', NULL, NULL, 1130.00, 'deluxe room', 1130.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(46, 16, 1, 'Single Room', 140.00, NULL, NULL, 'single room', 140.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(47, 16, 2, 'Double Room', NULL, 570.00, NULL, 'double room', 570.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(48, 16, 3, 'Deluxe Room', NULL, NULL, 1140.00, 'deluxe room', 1140.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(49, 17, 1, 'Single Room', 185.00, NULL, NULL, 'single room', 185.00, 14, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(50, 17, 2, 'Double Room', NULL, 575.00, NULL, 'double room', 575.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(51, 17, 3, 'Deluxe Room', NULL, NULL, 1150.00, 'deluxe room', 1150.00, 15, 1, '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(52, 18, 1, 'Single Room', 130.00, NULL, NULL, 'single room', 130.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(53, 18, 2, 'Double Room', NULL, 580.00, NULL, 'double room', 580.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(54, 18, 3, 'Deluxe Room', NULL, NULL, 1160.00, 'deluxe room', 1160.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(55, 19, 1, 'Single Room', 100.00, NULL, NULL, 'single room', 100.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(56, 19, 2, 'Double Room', NULL, 585.00, NULL, 'double room', 585.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(57, 19, 3, 'Deluxe Room', NULL, NULL, 1170.00, 'deluxe room', 1170.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(58, 20, 1, 'Single Room', 235.00, NULL, NULL, 'single room', 235.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(59, 20, 2, 'Double Room', NULL, 590.00, NULL, 'double room', 590.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(60, 20, 3, 'Deluxe Room', NULL, NULL, 1180.00, 'deluxe room', 1180.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(61, 21, 1, 'Single Room', 75.00, NULL, NULL, 'single room', 75.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(62, 21, 2, 'Double Room', NULL, 595.00, NULL, 'double room', 595.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(63, 21, 3, 'Deluxe Room', NULL, NULL, 1190.00, 'deluxe room', 1190.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(64, 22, 1, 'Single Room', 50.00, NULL, NULL, 'single room', 50.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(65, 22, 2, 'Double Room', NULL, 600.00, NULL, 'double room', 600.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(66, 22, 3, 'Deluxe Room', NULL, NULL, 1200.00, 'deluxe room', 1200.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(67, 23, 1, 'Single Room', 115.00, NULL, NULL, 'single room', 115.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(68, 23, 2, 'Double Room', NULL, 605.00, NULL, 'double room', 605.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(69, 23, 3, 'Deluxe Room', NULL, NULL, 1210.00, 'deluxe room', 1210.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(70, 24, 1, 'Single Room', 125.00, NULL, NULL, 'single room', 125.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(71, 24, 2, 'Double Room', NULL, 610.00, NULL, 'double room', 610.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(72, 24, 3, 'Deluxe Room', NULL, NULL, 1220.00, 'deluxe room', 1220.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(73, 25, 1, 'Single Room', 55.00, NULL, NULL, 'single room', 55.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(74, 25, 2, 'Double Room', NULL, 615.00, NULL, 'double room', 615.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(75, 25, 3, 'Deluxe Room', NULL, NULL, 1230.00, 'deluxe room', 1230.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(76, 26, 1, 'Single Room', 195.00, NULL, NULL, 'single room', 195.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(77, 26, 2, 'Double Room', NULL, 620.00, NULL, 'double room', 620.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(78, 26, 3, 'Deluxe Room', NULL, NULL, 1240.00, 'deluxe room', 1240.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(79, 27, 1, 'Single Room', 180.00, NULL, NULL, 'single room', 180.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(80, 27, 2, 'Double Room', NULL, 625.00, NULL, 'double room', 625.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(81, 27, 3, 'Deluxe Room', NULL, NULL, 1250.00, 'deluxe room', 1250.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(82, 28, 1, 'Single Room', 340.00, NULL, NULL, 'single room', 340.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(83, 28, 2, 'Double Room', NULL, 630.00, NULL, 'double room', 630.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(84, 28, 3, 'Deluxe Room', NULL, NULL, 1260.00, 'deluxe room', 1260.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(85, 29, 1, 'Single Room', 145.00, NULL, NULL, 'single room', 145.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(86, 29, 2, 'Double Room', NULL, 635.00, NULL, 'double room', 635.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(87, 29, 3, 'Deluxe Room', NULL, NULL, 1270.00, 'deluxe room', 1270.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(88, 30, 1, 'Single Room', 105.00, NULL, NULL, 'single room', 105.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(89, 30, 2, 'Double Room', NULL, 640.00, NULL, 'double room', 640.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(90, 30, 3, 'Deluxe Room', NULL, NULL, 1280.00, 'deluxe room', 1280.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(91, 31, 1, 'Single Room', 200.00, NULL, NULL, 'single room', 200.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(92, 31, 2, 'Double Room', NULL, 645.00, NULL, 'double room', 645.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(93, 31, 3, 'Deluxe Room', NULL, NULL, 1290.00, 'deluxe room', 1290.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(94, 32, 1, 'Single Room', 168.00, NULL, NULL, 'single room', 168.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(95, 32, 2, 'Double Room', NULL, 650.00, NULL, 'double room', 650.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(96, 32, 3, 'Deluxe Room', NULL, NULL, 1300.00, 'deluxe room', 1300.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(97, 33, 1, 'Single Room', 264.00, NULL, NULL, 'single room', 264.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(98, 33, 2, 'Double Room', NULL, 655.00, NULL, 'double room', 655.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(99, 33, 3, 'Deluxe Room', NULL, NULL, 1310.00, 'deluxe room', 1310.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(100, 34, 1, 'Single Room', 213.00, NULL, NULL, 'single room', 213.00, 29, 1, '2025-05-31 14:09:47', '2025-05-31 18:32:52'),
(101, 34, 2, 'Double Room', NULL, 660.00, NULL, 'double room', 660.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(102, 34, 3, 'Deluxe Room', NULL, NULL, 1320.00, 'deluxe room', 1320.00, 5, 1, '2025-05-31 14:09:47', '2025-05-31 18:34:41'),
(103, 35, 1, 'Single Room', 419.00, NULL, NULL, 'single room', 419.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(104, 35, 2, 'Double Room', NULL, 665.00, NULL, 'double room', 665.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(105, 35, 3, 'Deluxe Room', NULL, NULL, 1330.00, 'deluxe room', 1330.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(106, 36, 1, 'Single Room', 129.00, NULL, NULL, 'single room', 129.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(107, 36, 2, 'Double Room', NULL, 670.00, NULL, 'double room', 670.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(108, 36, 3, 'Deluxe Room', NULL, NULL, 1340.00, 'deluxe room', 1340.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(109, 37, 1, 'Single Room', 310.00, NULL, NULL, 'single room', 310.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(110, 37, 2, 'Double Room', NULL, 675.00, NULL, 'double room', 675.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(111, 37, 3, 'Deluxe Room', NULL, NULL, 1350.00, 'deluxe room', 1350.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(112, 38, 1, 'Single Room', 144.00, NULL, NULL, 'single room', 144.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(113, 38, 2, 'Double Room', NULL, 680.00, NULL, 'double room', 680.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(114, 38, 3, 'Deluxe Room', NULL, NULL, 1360.00, 'deluxe room', 1360.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(115, 39, 1, 'Single Room', 387.00, NULL, NULL, 'single room', 387.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(116, 39, 2, 'Double Room', NULL, 685.00, NULL, 'double room', 685.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(117, 39, 3, 'Deluxe Room', NULL, NULL, 1370.00, 'deluxe room', 1370.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(118, 40, 1, 'Single Room', 400.00, NULL, NULL, 'single room', 400.00, 14, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(119, 40, 2, 'Double Room', NULL, 690.00, NULL, 'double room', 690.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(120, 40, 3, 'Deluxe Room', NULL, NULL, 1380.00, 'deluxe room', 1380.00, 15, 1, '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(121, 41, 1, 'Single Room', 212.00, NULL, NULL, 'single room', 212.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(122, 41, 2, 'Double Room', NULL, 695.00, NULL, 'double room', 695.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(123, 41, 3, 'Deluxe Room', NULL, NULL, 1390.00, 'deluxe room', 1390.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(124, 42, 1, 'Single Room', 147.00, NULL, NULL, 'single room', 147.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(125, 42, 2, 'Double Room', NULL, 700.00, NULL, 'double room', 700.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(126, 42, 3, 'Deluxe Room', NULL, NULL, 1400.00, 'deluxe room', 1400.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(127, 43, 1, 'Single Room', 258.00, NULL, NULL, 'single room', 258.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(128, 43, 2, 'Double Room', NULL, 705.00, NULL, 'double room', 705.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(129, 43, 3, 'Deluxe Room', NULL, NULL, 1410.00, 'deluxe room', 1410.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(130, 44, 1, 'Single Room', 336.00, NULL, NULL, 'single room', 336.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(131, 44, 2, 'Double Room', NULL, 710.00, NULL, 'double room', 710.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(132, 44, 3, 'Deluxe Room', NULL, NULL, 1420.00, 'deluxe room', 1420.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(133, 45, 1, 'Single Room', 387.00, NULL, NULL, 'single room', 387.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(134, 45, 2, 'Double Room', NULL, 715.00, NULL, 'double room', 715.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(135, 45, 3, 'Deluxe Room', NULL, NULL, 1430.00, 'deluxe room', 1430.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(136, 46, 1, 'Single Room', 328.00, NULL, NULL, 'single room', 328.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(137, 46, 2, 'Double Room', NULL, 725.00, NULL, 'double room', 725.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(138, 46, 3, 'Deluxe Room', NULL, NULL, 1450.00, 'deluxe room', 1450.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(139, 47, 1, 'Single Room', 677.00, NULL, NULL, 'single room', 677.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(140, 47, 2, 'Double Room', NULL, 730.00, NULL, 'double room', 730.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(141, 47, 3, 'Deluxe Room', NULL, NULL, 1460.00, 'deluxe room', 1460.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(142, 48, 1, 'Single Room', 245.00, NULL, NULL, 'single room', 245.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(143, 48, 2, 'Double Room', NULL, 735.00, NULL, 'double room', 735.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(144, 48, 3, 'Deluxe Room', NULL, NULL, 1470.00, 'deluxe room', 1470.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(145, 49, 1, 'Single Room', 193.00, NULL, NULL, 'single room', 193.00, 14, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(146, 49, 2, 'Double Room', NULL, 740.00, NULL, 'double room', 740.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(147, 49, 3, 'Deluxe Room', NULL, NULL, 1480.00, 'deluxe room', 1480.00, 15, 1, '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(148, 50, 1, 'Single Room', 361.00, NULL, NULL, 'single room', 361.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(149, 50, 2, 'Double Room', NULL, 745.00, NULL, 'Double room', 745.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(150, 50, 3, 'Deluxe Room', NULL, NULL, 1490.00, 'Double room', 1490.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(151, 51, 1, 'Single Room', 250.00, NULL, NULL, 'single room', 250.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(152, 51, 2, 'Double Room', NULL, 750.00, NULL, 'Double room', 750.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(153, 51, 3, 'Deluxe Room', NULL, NULL, 1500.00, 'Double room', 1500.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(154, 52, 1, 'Single Room', 400.00, NULL, NULL, 'single room', 400.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(155, 52, 2, 'Double Room', NULL, 755.00, NULL, 'Double room', 755.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(156, 52, 3, 'Deluxe Room', NULL, NULL, 1510.00, 'Double room', 1510.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(157, 53, 1, 'Single Room', 220.00, NULL, NULL, 'single room', 220.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(158, 53, 2, 'Double Room', NULL, 760.00, NULL, 'Double room', 760.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(159, 53, 3, 'Deluxe Room', NULL, NULL, 1520.00, 'Double room', 1520.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(160, 54, 1, 'Single Room', 221.00, NULL, NULL, 'single room', 221.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(161, 54, 2, 'Double Room', NULL, 765.00, NULL, 'Double room', 765.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(162, 54, 3, 'Deluxe Room', NULL, NULL, 1530.00, 'Double room', 1530.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(163, 55, 1, 'Single Room', 222.00, NULL, NULL, 'single room', 222.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(164, 55, 2, 'Double Room', NULL, 770.00, NULL, 'Double room', 770.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(165, 55, 3, 'Deluxe Room', NULL, NULL, 1540.00, 'Double room', 1540.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(166, 56, 1, 'Single Room', 223.00, NULL, NULL, 'single room', 223.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(167, 56, 2, 'Double Room', NULL, 775.00, NULL, 'Double room', 775.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(168, 56, 3, 'Deluxe Room', NULL, NULL, 1550.00, 'Double room', 1550.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(169, 57, 1, 'Single Room', 224.00, NULL, NULL, 'single room', 224.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(170, 57, 2, 'Double Room', NULL, 780.00, NULL, 'Double room', 780.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(171, 57, 3, 'Deluxe Room', NULL, NULL, 1560.00, 'Double room', 1560.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(172, 58, 1, 'Single Room', 225.00, NULL, NULL, 'single room', 225.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(173, 58, 2, 'Double Room', NULL, 785.00, NULL, 'Double room', 785.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(174, 58, 3, 'Deluxe Room', NULL, NULL, 1570.00, 'Double room', 1570.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(175, 59, 1, 'Single Room', 226.00, NULL, NULL, 'single room', 226.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(176, 59, 2, 'Double Room', NULL, 790.00, NULL, 'Double room', 790.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(177, 59, 3, 'Deluxe Room', NULL, NULL, 1580.00, 'Double room', 1580.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(178, 60, 1, 'Single Room', 227.00, NULL, NULL, 'single room', 227.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(179, 60, 2, 'Double Room', NULL, 795.00, NULL, 'Double room', 795.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(180, 60, 3, 'Deluxe Room', NULL, NULL, 1590.00, 'Double room', 1590.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(181, 61, 1, 'Single Room', 228.00, NULL, NULL, 'single room', 228.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(182, 61, 2, 'Double Room', NULL, 800.00, NULL, 'Double room', 800.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(183, 61, 3, 'Deluxe Room', NULL, NULL, 1600.00, 'Double room', 1600.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(184, 62, 1, 'Single Room', 229.00, NULL, NULL, 'single room', 229.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(185, 62, 2, 'Double Room', NULL, 805.00, NULL, 'Double room', 805.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(186, 62, 3, 'Deluxe Room', NULL, NULL, 1610.00, 'Double room', 1610.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(187, 63, 1, 'Single Room', 230.00, NULL, NULL, 'single room', 230.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(188, 63, 2, 'Double Room', NULL, 810.00, NULL, 'Double room', 810.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(189, 63, 3, 'Deluxe Room', NULL, NULL, 1620.00, 'Double room', 1620.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(190, 64, 1, 'Single Room', 231.00, NULL, NULL, 'single room', 231.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(191, 64, 2, 'Double Room', NULL, 815.00, NULL, 'Double room', 815.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(192, 64, 3, 'Deluxe Room', NULL, NULL, 1630.00, 'Double room', 1630.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(193, 65, 1, 'Single Room', 232.00, NULL, NULL, 'single room', 232.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(194, 65, 2, 'Double Room', NULL, 820.00, NULL, 'Double room', 820.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(195, 65, 3, 'Deluxe Room', NULL, NULL, 1640.00, 'Double room', 1640.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(196, 66, 1, 'Single Room', 233.00, NULL, NULL, 'single room', 233.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(197, 66, 2, 'Double Room', NULL, 825.00, NULL, 'Double room', 825.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(198, 66, 3, 'Deluxe Room', NULL, NULL, 1650.00, 'Double room', 1650.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(199, 67, 1, 'Single Room', 234.00, NULL, NULL, 'single room', 234.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(200, 67, 2, 'Double Room', NULL, 830.00, NULL, 'Double room', 830.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(201, 67, 3, 'Deluxe Room', NULL, NULL, 1660.00, 'Double room', 1660.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(202, 68, 1, 'Single Room', 235.00, NULL, NULL, 'single room', 235.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(203, 68, 2, 'Double Room', NULL, 835.00, NULL, 'Double room', 835.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(204, 68, 3, 'Deluxe Room', NULL, NULL, 1670.00, 'Double room', 1670.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(205, 69, 1, 'Single Room', 140.00, NULL, NULL, 'single room', 140.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(206, 69, 2, 'Double Room', NULL, 840.00, NULL, 'Double room', 840.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(207, 69, 3, 'Deluxe Room', NULL, NULL, 1680.00, 'Double room', 1680.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(208, 70, 1, 'Single Room', 85.00, NULL, NULL, 'single room', 85.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(209, 70, 2, 'Double Room', NULL, 845.00, NULL, 'Double room', 845.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(210, 70, 3, 'Deluxe Room', NULL, NULL, 1800.00, 'Double room', 1800.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(211, 71, 1, 'Single Room', 53.00, NULL, NULL, 'single room', 53.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(212, 71, 2, 'Double Room', NULL, 905.00, NULL, 'Double room', 905.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(213, 71, 3, 'Deluxe Room', NULL, NULL, 1810.00, 'Double room', 1810.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(214, 72, 1, 'Single Room', 54.00, NULL, NULL, 'single room', 54.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(215, 72, 2, 'Double Room', NULL, 910.00, NULL, 'Double room', 910.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(216, 72, 3, 'Deluxe Room', NULL, NULL, 1820.00, 'Double room', 1820.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(217, 73, 1, 'Single Room', 55.00, NULL, NULL, 'single room', 55.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(218, 73, 2, 'Double Room', NULL, 915.00, NULL, 'Double room', 915.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(219, 73, 3, 'Deluxe Room', NULL, NULL, 1830.00, 'Double room', 1830.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(220, 74, 1, 'Single Room', 65.00, NULL, NULL, 'single room', 65.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(221, 74, 2, 'Double Room', NULL, 920.00, NULL, 'Double room', 920.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(222, 74, 3, 'Deluxe Room', NULL, NULL, 1840.00, 'Double room', 1840.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(223, 75, 1, 'Single Room', 66.00, NULL, NULL, 'single room', 66.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(224, 75, 2, 'Double Room', NULL, 925.00, NULL, 'Double room', 925.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(225, 75, 3, 'Deluxe Room', NULL, NULL, 1850.00, 'Double room', 1850.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(226, 76, 1, 'Single Room', 67.00, NULL, NULL, 'single room', 67.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(227, 76, 2, 'Double Room', NULL, 930.00, NULL, 'Double room', 930.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(228, 76, 3, 'Deluxe Room', NULL, NULL, 1860.00, 'Double room', 1860.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(229, 77, 1, 'Single Room', 68.00, NULL, NULL, 'single room', 68.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(230, 77, 2, 'Double Room', NULL, 935.00, NULL, 'Double room', 935.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(231, 77, 3, 'Deluxe Room', NULL, NULL, 1870.00, 'Double room', 1870.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(232, 78, 1, 'Single Room', 69.00, NULL, NULL, 'single room', 69.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(233, 78, 2, 'Double Room', NULL, 940.00, NULL, 'Double room', 940.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(234, 78, 3, 'Deluxe Room', NULL, NULL, 1880.00, 'Double room', 1880.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(235, 79, 1, 'Single Room', 70.00, NULL, NULL, 'single room', 70.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(236, 79, 2, 'Double Room', NULL, 945.00, NULL, 'Double room', 945.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(237, 79, 3, 'Deluxe Room', NULL, NULL, 1890.00, 'Double room', 1890.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(238, 80, 1, 'Single Room', 71.00, NULL, NULL, 'single room', 71.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(239, 80, 2, 'Double Room', NULL, 950.00, NULL, 'Double room', 950.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(240, 80, 3, 'Deluxe Room', NULL, NULL, 1900.00, 'Double room', 1900.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(241, 81, 1, 'Single Room', 72.00, NULL, NULL, 'single room', 72.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(242, 81, 2, 'Double Room', NULL, 955.00, NULL, 'Double room', 955.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(243, 81, 3, 'Deluxe Room', NULL, NULL, 1910.00, 'Double room', 1910.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(244, 82, 1, 'Single Room', 73.00, NULL, NULL, 'single room', 73.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(245, 82, 2, 'Double Room', NULL, 960.00, NULL, 'Double room', 960.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(246, 82, 3, 'Deluxe Room', NULL, NULL, 1920.00, 'Double room', 1920.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(247, 83, 1, 'Single Room', 74.00, NULL, NULL, 'single room', 74.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(248, 83, 2, 'Double Room', NULL, 965.00, NULL, 'Double room', 965.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(249, 83, 3, 'Deluxe Room', NULL, NULL, 1930.00, 'Double room', 1930.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(250, 84, 1, 'Single Room', 75.00, NULL, NULL, 'single room', 75.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(251, 84, 2, 'Double Room', NULL, 970.00, NULL, 'Double room', 970.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(252, 84, 3, 'Deluxe Room', NULL, NULL, 1940.00, 'Double room', 1940.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(253, 85, 1, 'Single Room', 77.00, NULL, NULL, 'single room', 77.00, 14, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(254, 85, 2, 'Double Room', NULL, 980.00, NULL, 'Double room', 980.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(255, 85, 3, 'Deluxe Room', NULL, NULL, 1960.00, 'Double room', 1960.00, 15, 1, '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(256, 86, 1, 'Single Room', 78.00, NULL, NULL, 'single room', 78.00, 14, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(257, 86, 2, 'Double Room', NULL, 985.00, NULL, 'Double room', 985.00, 15, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(258, 86, 3, 'Deluxe Room', NULL, NULL, 1970.00, 'Double room', 1970.00, 15, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(259, 87, 1, 'Single Room', 79.00, NULL, NULL, 'single room', 79.00, 14, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(260, 87, 2, 'Double Room', NULL, 990.00, NULL, 'Double room', 990.00, 15, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(261, 87, 3, 'Deluxe Room', NULL, NULL, 1980.00, 'Double room', 1980.00, 15, 1, '2025-05-31 14:12:08', '2025-05-31 14:12:08'),
(262, 88, 1, 'Single Room', 80.00, NULL, NULL, 'single room', 80.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(263, 88, 2, 'Double Room', NULL, 995.00, NULL, 'double room', 995.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(264, 88, 3, 'Deluxe Room', NULL, NULL, 1990.00, 'deluxe room', 1990.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(265, 89, 1, 'Single Room', 81.00, NULL, NULL, 'single room', 81.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(266, 89, 2, 'Double Room', NULL, 999.00, NULL, 'double room', 999.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(267, 89, 3, 'Deluxe Room', NULL, NULL, 1995.00, 'deluxe room', 1995.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(268, 90, 1, 'Single Room', 82.00, NULL, NULL, 'single room', 82.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(269, 90, 2, 'Double Room', NULL, 998.00, NULL, 'double room', 998.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(270, 90, 3, 'Deluxe Room', NULL, NULL, 1994.00, 'deluxe room', 1994.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(271, 91, 1, 'Single Room', 83.00, NULL, NULL, 'single room', 83.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(272, 91, 2, 'Double Room', NULL, 997.00, NULL, 'double room', 997.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(273, 91, 3, 'Deluxe Room', NULL, NULL, 1993.00, 'deluxe room', 1993.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(274, 92, 1, 'Single Room', 84.00, NULL, NULL, 'single room', 84.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(275, 92, 2, 'Double Room', NULL, 996.00, NULL, 'double room', 996.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(276, 92, 3, 'Deluxe Room', NULL, NULL, 1992.00, 'deluxe room', 1992.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(277, 93, 1, 'Single Room', 85.00, NULL, NULL, 'single room', 85.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(278, 93, 2, 'Double Room', NULL, 994.00, NULL, 'double room', 994.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(279, 93, 3, 'Deluxe Room', NULL, NULL, 1991.00, 'deluxe room', 1991.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(280, 94, 1, 'Single Room', 86.00, NULL, NULL, 'single room', 86.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(281, 94, 2, 'Double Room', NULL, 993.00, NULL, 'double room', 993.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(282, 94, 3, 'Deluxe Room', NULL, NULL, 1989.00, 'deluxe room', 1989.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(283, 95, 1, 'Single Room', 87.00, NULL, NULL, 'single room', 87.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(284, 95, 2, 'Double Room', NULL, 992.00, NULL, 'double room', 992.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(285, 95, 3, 'Deluxe Room', NULL, NULL, 1988.00, 'deluxe room', 1988.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(286, 96, 1, 'Single Room', 88.00, NULL, NULL, 'single room', 88.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(287, 96, 2, 'Double Room', NULL, 991.00, NULL, 'double room', 991.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(288, 96, 3, 'Deluxe Room', NULL, NULL, 1987.00, 'deluxe room', 1987.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(289, 97, 1, 'Single Room', 89.00, NULL, NULL, 'single room', 89.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(290, 97, 2, 'Double Room', NULL, 987.00, NULL, 'double room', 987.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(291, 97, 3, 'Deluxe Room', NULL, NULL, 1986.00, 'deluxe room', 1986.00, 10, 1, '2025-05-31 14:13:13', '2025-05-31 14:13:13'),
(292, 98, 1, 'Single Room', 90.00, NULL, NULL, 'single room', 90.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(293, 98, 2, 'Double Room', NULL, 986.00, NULL, 'double room', 986.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(294, 98, 3, 'Deluxe Room', NULL, NULL, 1985.00, 'deluxe room', 1985.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(295, 99, 1, 'Single Room', 91.00, NULL, NULL, 'single room', 91.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(296, 99, 2, 'Double Room', NULL, 984.00, NULL, 'double room', 984.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(297, 99, 3, 'Deluxe Room', NULL, NULL, 1984.00, 'deluxe room', 1984.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(298, 100, 1, 'Single Room', 92.00, NULL, NULL, 'single room', 92.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(299, 100, 2, 'Double Room', NULL, 983.00, NULL, 'double room', 983.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(300, 100, 3, 'Deluxe Room', NULL, NULL, 1983.00, 'deluxe room', 1983.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(301, 101, 1, 'Single Room', 93.00, NULL, NULL, 'single room', 93.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(302, 101, 2, 'Double Room', NULL, 982.00, NULL, 'double room', 982.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(303, 101, 3, 'Deluxe Room', NULL, NULL, 1982.00, 'deluxe room', 1982.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(304, 102, 1, 'Single Room', 94.00, NULL, NULL, 'single room', 94.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(305, 102, 2, 'Double Room', NULL, 981.00, NULL, 'double room', 981.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(306, 102, 3, 'Deluxe Room', NULL, NULL, 1981.00, 'deluxe room', 1981.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(307, 103, 1, 'Single Room', 96.00, NULL, NULL, 'single room', 96.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(308, 103, 2, 'Double Room', NULL, 978.00, NULL, 'double room', 978.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(309, 103, 3, 'Deluxe Room', NULL, NULL, 1979.00, 'deluxe room', 1979.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(310, 104, 1, 'Single Room', 97.00, NULL, NULL, 'single room', 97.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(311, 104, 2, 'Double Room', NULL, 977.00, NULL, 'double room', 977.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(312, 104, 3, 'Deluxe Room', NULL, NULL, 1978.00, 'deluxe room', 1978.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(313, 105, 1, 'Single Room', 355.00, NULL, NULL, 'single room', 355.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(314, 105, 2, 'Double Room', NULL, 976.00, NULL, 'double room', 976.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(315, 105, 3, 'Deluxe Room', NULL, NULL, 1977.00, 'deluxe room', 1977.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(316, 106, 1, 'Single Room', 356.00, NULL, NULL, 'single room', 356.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(317, 106, 2, 'Double Room', NULL, 973.00, NULL, 'double room', 973.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(318, 106, 3, 'Deluxe Room', NULL, NULL, 1976.00, 'deluxe room', 1976.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(319, 107, 1, 'Single Room', 357.00, NULL, NULL, 'single room', 357.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(320, 107, 2, 'Double Room', NULL, 972.00, NULL, 'double room', 972.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(321, 107, 3, 'Deluxe Room', NULL, NULL, 1975.00, 'deluxe room', 1975.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(322, 108, 1, 'Single Room', 358.00, NULL, NULL, 'single room', 358.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(323, 108, 2, 'Double Room', NULL, 971.00, NULL, 'double room', 971.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(324, 108, 3, 'Deluxe Room', NULL, NULL, 1974.00, 'deluxe room', 1974.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(325, 109, 1, 'Single Room', 359.00, NULL, NULL, 'single room', 359.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(326, 109, 2, 'Double Room', NULL, 969.00, NULL, 'double room', 969.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(327, 109, 3, 'Deluxe Room', NULL, NULL, 1973.00, 'deluxe room', 1973.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(328, 110, 1, 'Single Room', 361.00, NULL, NULL, 'single room', 361.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(329, 110, 2, 'Double Room', NULL, 967.00, NULL, 'double room', 967.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14'),
(330, 110, 3, 'Deluxe Room', NULL, NULL, 1971.00, 'deluxe room', 1971.00, 10, 1, '2025-05-31 14:13:14', '2025-05-31 14:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `room_images`
--

CREATE TABLE `room_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_images`
--

INSERT INTO `room_images` (`id`, `room_id`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://pavo.elongstatic.com/i/ori/1vUqsy0iTks.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(2, 1, 'https://pavo.elongstatic.com/i/ori/1mQaR2pBqpy.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(3, 1, 'https://i.ibb.co/S4TN0Fky/bed-1.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(4, 2, 'https://pavo.elongstatic.com/i/h5hotel350_350/1vUqsETvt8A.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(5, 2, 'https://pavo.elongstatic.com/i/ori/1mQaR2pBqpy.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(6, 2, 'https://i.ibb.co/S4TN0Fky/bed-1.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(7, 3, 'https://pavo.elongstatic.com/i/h5hotel350_350/1vUqsETvt8A.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(8, 3, 'https://pavo.elongstatic.com/i/ori/1vUqsy0iTks.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(9, 3, 'https://pavo.elongstatic.com/i/ori/1mQaR2pBqpy.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(10, 4, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BZUix7veF2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(11, 4, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BZUix5e7ni.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(12, 4, 'https://i.ibb.co/M5hCnDw7/bed-3.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(13, 5, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BMxncVdWBW.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(14, 5, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BZUix5e7ni.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(15, 5, 'https://i.ibb.co/M5hCnDw7/bed-3.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(16, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BMxncVdWBW.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(17, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BZUix7veF2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(18, 6, 'https://pavo.elongstatic.com/i/h5hotel350_350/1BZUix5e7ni.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(19, 7, 'https://pavo.elongstatic.com/i/h5hotel350_350/1kBxtnhwxva.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(20, 7, 'https://pavo.elongstatic.com/i/flag952_377/1lb42ND5vfW.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(21, 7, 'https://i.ibb.co/C38b4gxY/bed-2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(22, 8, 'https://pavo.elongstatic.com/i/flag952_377/1lb42BHmVC8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(23, 8, 'https://pavo.elongstatic.com/i/flag952_377/1lb42ND5vfW.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(24, 8, 'https://i.ibb.co/C38b4gxY/bed-2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(25, 9, 'https://pavo.elongstatic.com/i/flag952_377/1lb42BHmVC8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(26, 9, 'https://pavo.elongstatic.com/i/h5hotel350_350/1kBxtnhwxva.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(27, 9, 'https://pavo.elongstatic.com/i/flag952_377/1lb42ND5vfW.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(28, 10, 'https://pavo.elongstatic.com/i/flag952_377/1BHQaZRnJbG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(29, 10, 'https://pavo.elongstatic.com/i/flag952_377/1BHQaxT29FK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(30, 10, 'https://i.ibb.co/mmfwrjz/bed-4.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(31, 11, 'https://pavo.elongstatic.com/i/flag952_377/1BHQdfg7YRi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(32, 11, 'https://pavo.elongstatic.com/i/flag952_377/1BHQaxT29FK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(33, 11, 'https://i.ibb.co/mmfwrjz/bed-4.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(34, 12, 'https://pavo.elongstatic.com/i/flag952_377/1BHQdfg7YRi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(35, 12, 'https://pavo.elongstatic.com/i/flag952_377/1BHQaZRnJbG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(36, 12, 'https://pavo.elongstatic.com/i/flag952_377/1BHQaxT29FK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(37, 13, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpnQwvIY.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(38, 13, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpnR5yow.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(39, 13, 'https://i.ibb.co/zTRpq7DW/bed-8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(40, 14, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpoLiexG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(41, 14, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpnR5yow.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(42, 14, 'https://i.ibb.co/zTRpq7DW/bed-8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(43, 15, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpoLiexG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(44, 15, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpnQwvIY.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(45, 15, 'https://pavo.elongstatic.com/i/h5hotel350_350/1zxqpnR5yow.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(46, 16, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7Edo4pi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(47, 16, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7LqsrRu.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(48, 16, 'https://i.ibb.co/v2jwkNc/bed-9.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(49, 17, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7NwswEg.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(50, 17, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7LqsrRu.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(51, 17, 'https://i.ibb.co/v2jwkNc/bed-9.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(52, 18, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7NwswEg.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(53, 18, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7Edo4pi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(54, 18, 'https://pavo.elongstatic.com/i/flag952_377/1tAq7LqsrRu.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(55, 19, 'https://pavo.elongstatic.com/i/h5hotel350_350/1xG4eFyZyVi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(56, 19, 'https://pavo.elongstatic.com/i/h5hotel350_350/1B7Tjm2Kti0.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(57, 19, 'https://i.ibb.co/FkTpG0Pv/bed-10.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(58, 20, 'https://pavo.elongstatic.com/i/h5hotel350_350/1xveOLYsyVG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(59, 20, 'https://pavo.elongstatic.com/i/h5hotel350_350/1B7Tjm2Kti0.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(60, 20, 'https://i.ibb.co/FkTpG0Pv/bed-10.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(61, 21, 'https://pavo.elongstatic.com/i/h5hotel350_350/1xveOLYsyVG.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(62, 21, 'https://pavo.elongstatic.com/i/h5hotel350_350/1xG4eFyZyVi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(63, 21, 'https://pavo.elongstatic.com/i/h5hotel350_350/1B7Tjm2Kti0.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(64, 22, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2bMYZKfTi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(65, 22, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tYIx74gbvO.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(66, 22, 'https://i.ibb.co/XZXmRvdm/bed-11.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(67, 23, 'https://pavo.elongstatic.com/i/h5hotel350_350/1uaqdA8LCne.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(68, 23, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tYIx74gbvO.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(69, 23, 'https://i.ibb.co/XZXmRvdm/bed-11.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(70, 24, 'https://pavo.elongstatic.com/i/h5hotel350_350/1uaqdA8LCne.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(71, 24, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2bMYZKfTi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(72, 24, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tYIx74gbvO.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(73, 25, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPfdqPftm.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(74, 25, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpyPDnOg.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(75, 25, 'https://i.ibb.co/nskC0bpr/bed-12.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(76, 26, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPfDG9Tmo.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(77, 26, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpyPDnOg.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(78, 26, 'https://i.ibb.co/nskC0bpr/bed-12.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(79, 27, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPfDG9Tmo.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(80, 27, 'https://pavo.elongstatic.com/i/h5hotel350_350/1AmPfdqPftm.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(81, 27, 'https://pavo.elongstatic.com/i/h5hotel350_350/1A2VpyPDnOg.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(82, 28, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAOO143Qje.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(83, 28, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONVx9ZBK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(84, 28, 'https://i.ibb.co/jZh2Ksvb/bed-14.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(85, 29, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONzITcRi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(86, 29, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONVx9ZBK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(87, 29, 'https://i.ibb.co/jZh2Ksvb/bed-14.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(88, 30, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONzITcRi.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(89, 30, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAOO143Qje.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(90, 30, 'https://pavo.elongstatic.com/i/h5hotel350_350/1tAONVx9ZBK.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(91, 31, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb34B8DaE.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(92, 31, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb4jeSrSM.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(93, 31, 'https://i.ibb.co/SDKWHmSF/bed-15.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(94, 32, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb6IxhjzO.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(95, 32, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb4jeSrSM.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(96, 32, 'https://i.ibb.co/SDKWHmSF/bed-15.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(97, 33, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb6IxhjzO.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(98, 33, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb34B8DaE.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(99, 33, 'https://pavo.elongstatic.com/i/h5hotel350_350/1krb4jeSrSM.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(100, 34, 'https://i.ibb.co/S4TN0Fky/bed-1.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(101, 34, 'https://i.ibb.co/M5hCnDw7/bed-3.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(102, 34, 'https://i.ibb.co/gMKybkxd/bed-16.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(103, 35, 'https://i.ibb.co/C38b4gxY/bed-2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(104, 35, 'https://i.ibb.co/M5hCnDw7/bed-3.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(105, 35, 'https://i.ibb.co/gMKybkxd/bed-16.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(106, 36, 'https://i.ibb.co/C38b4gxY/bed-2.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(107, 36, 'https://i.ibb.co/S4TN0Fky/bed-1.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(108, 36, 'https://i.ibb.co/M5hCnDw7/bed-3.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(109, 37, 'https://i.ibb.co/mmfwrjz/bed-4.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(110, 37, 'https://i.ibb.co/zTRpq7DW/bed-8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(111, 37, 'https://i.ibb.co/V0jWQ01J/bed-17.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(112, 38, 'https://i.ibb.co/v2jwkNc/bed-9.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(113, 38, 'https://i.ibb.co/zTRpq7DW/bed-8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(114, 38, 'https://i.ibb.co/V0jWQ01J/bed-17.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(115, 39, 'https://i.ibb.co/v2jwkNc/bed-9.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(116, 39, 'https://i.ibb.co/mmfwrjz/bed-4.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(117, 39, 'https://i.ibb.co/zTRpq7DW/bed-8.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(118, 40, 'https://i.ibb.co/FkTpG0Pv/bed-10.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(119, 40, 'https://i.ibb.co/XZXmRvdm/bed-11.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(120, 40, 'https://i.ibb.co/m5SWKMF0/bed-18.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(121, 41, 'https://i.ibb.co/nskC0bpr/bed-12.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(122, 41, 'https://i.ibb.co/XZXmRvdm/bed-11.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(123, 41, 'https://i.ibb.co/m5SWKMF0/bed-18.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(124, 42, 'https://i.ibb.co/nskC0bpr/bed-12.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(125, 42, 'https://i.ibb.co/FkTpG0Pv/bed-10.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(126, 42, 'https://i.ibb.co/XZXmRvdm/bed-11.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(127, 43, 'https://i.ibb.co/jZh2Ksvb/bed-14.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(128, 43, 'https://i.ibb.co/SDKWHmSF/bed-15.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(129, 43, 'https://i.ibb.co/jvgc6H2S/bed-19.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(130, 44, 'https://i.ibb.co/gMKybkxd/bed-16.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(131, 44, 'https://i.ibb.co/SDKWHmSF/bed-15.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(132, 44, 'https://i.ibb.co/jvgc6H2S/bed-19.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(133, 45, 'https://i.ibb.co/gMKybkxd/bed-16.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(134, 45, 'https://i.ibb.co/jZh2Ksvb/bed-14.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(135, 45, 'https://i.ibb.co/SDKWHmSF/bed-15.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(136, 46, 'https://i.ibb.co/V0jWQ01J/bed-17.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(137, 46, 'https://i.ibb.co/m5SWKMF0/bed-18.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(138, 46, 'https://i.ibb.co/9mjtYncQ/bed-20.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(139, 47, 'https://i.ibb.co/jvgc6H2S/bed-19.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(140, 47, 'https://i.ibb.co/m5SWKMF0/bed-18.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(141, 47, 'https://i.ibb.co/9mjtYncQ/bed-20.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(142, 48, 'https://i.ibb.co/jvgc6H2S/bed-19.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(143, 48, 'https://i.ibb.co/V0jWQ01J/bed-17.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(144, 48, 'https://i.ibb.co/m5SWKMF0/bed-18.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(145, 49, 'https://i.ibb.co/9mjtYncQ/bed-20.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(146, 49, 'https://i.ibb.co/XZ4CbFQt/bed-21.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(147, 49, 'https://i.ibb.co/XZ4CbFQt/bed-21.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(148, 50, 'https://i.ibb.co/cS62y8YL/bed-22.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(149, 50, 'https://i.ibb.co/XZ4CbFQt/bed-21.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(150, 50, 'https://i.ibb.co/XZ4CbFQt/bed-21.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(151, 51, 'https://i.ibb.co/cS62y8YL/bed-22.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(152, 51, 'https://i.ibb.co/9mjtYncQ/bed-20.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(153, 51, 'https://i.ibb.co/XZ4CbFQt/bed-21.jpg', '2025-05-31 14:09:46', '2025-05-31 14:09:46'),
(154, 52, 'https://i.ibb.co/zVQc40YK/bed-23.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(155, 52, 'https://i.ibb.co/RGrR90Hs/bed-25.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(156, 52, 'https://i.ibb.co/cS62y8YL/bed-22.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(157, 53, 'https://i.ibb.co/20npJwsr/bed-27.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(158, 53, 'https://i.ibb.co/RGrR90Hs/bed-25.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(159, 53, 'https://i.ibb.co/cS62y8YL/bed-22.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(160, 54, 'https://i.ibb.co/20npJwsr/bed-27.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(161, 54, 'https://i.ibb.co/zVQc40YK/bed-23.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(162, 54, 'https://i.ibb.co/RGrR90Hs/bed-25.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(163, 55, 'https://i.ibb.co/vpf8Tkq/bed-28.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(164, 55, 'https://i.ibb.co/4wcnRhHj/bed-32.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(165, 55, 'https://i.ibb.co/zVQc40YK/bed-23.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(166, 56, 'https://i.ibb.co/XZ4PZY3H/bed-33.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(167, 56, 'https://i.ibb.co/4wcnRhHj/bed-32.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(168, 56, 'https://i.ibb.co/zVQc40YK/bed-23.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(169, 57, 'https://i.ibb.co/XZ4PZY3H/bed-33.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(170, 57, 'https://i.ibb.co/vpf8Tkq/bed-28.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(171, 57, 'https://i.ibb.co/4wcnRhHj/bed-32.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(172, 58, 'https://i.ibb.co/XrHhzv5m/bed-34.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(173, 58, 'https://i.ibb.co/Hf9q37Kf/bed-35.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(174, 58, 'https://i.ibb.co/RGrR90Hs/bed-25.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(175, 59, 'https://i.ibb.co/TV1w6zm/bed-36.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(176, 59, 'https://i.ibb.co/Hf9q37Kf/bed-35.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(177, 59, 'https://i.ibb.co/RGrR90Hs/bed-25.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(178, 60, 'https://i.ibb.co/TV1w6zm/bed-36.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(179, 60, 'https://i.ibb.co/XrHhzv5m/bed-34.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(180, 60, 'https://i.ibb.co/Hf9q37Kf/bed-35.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(181, 61, 'https://i.ibb.co/8gCWQ8Jm/bed-37.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(182, 61, 'https://i.ibb.co/nN3HVPdf/bed-38.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(183, 61, 'https://i.ibb.co/20npJwsr/bed-27.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(184, 62, 'https://i.ibb.co/RkgHv6fR/bed-39.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(185, 62, 'https://i.ibb.co/nN3HVPdf/bed-38.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(186, 62, 'https://i.ibb.co/20npJwsr/bed-27.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(187, 63, 'https://i.ibb.co/RkgHv6fR/bed-39.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(188, 63, 'https://i.ibb.co/8gCWQ8Jm/bed-37.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(189, 63, 'https://i.ibb.co/nN3HVPdf/bed-38.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(190, 64, 'https://i.ibb.co/Z6dGMDdB/bed-40.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(191, 64, 'https://i.ibb.co/0V26vBzN/bed-41.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(192, 64, 'https://i.ibb.co/vpf8Tkq/bed-28.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(193, 65, 'https://i.ibb.co/d0jZS31H/bed-42.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(194, 65, 'https://i.ibb.co/0V26vBzN/bed-41.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(195, 65, 'https://i.ibb.co/vpf8Tkq/bed-28.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(196, 66, 'https://i.ibb.co/d0jZS31H/bed-42.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(197, 66, 'https://i.ibb.co/Z6dGMDdB/bed-40.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(198, 66, 'https://i.ibb.co/0V26vBzN/bed-41.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(199, 67, 'https://i.ibb.co/bjpRmshQ/bed-43.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(200, 67, 'https://i.ibb.co/0zjT8N7/bed-44.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(201, 67, 'https://i.ibb.co/4wcnRhHj/bed-32.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(202, 68, 'https://i.ibb.co/3mRVm14Q/bed-45.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(203, 68, 'https://i.ibb.co/0zjT8N7/bed-44.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(204, 68, 'https://i.ibb.co/4wcnRhHj/bed-32.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(205, 69, 'https://i.ibb.co/3mRVm14Q/bed-45.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(206, 69, 'https://i.ibb.co/bjpRmshQ/bed-43.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(207, 69, 'https://i.ibb.co/0zjT8N7/bed-44.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(208, 70, 'https://i.ibb.co/LzktxYHk/bed-46.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(209, 70, 'https://i.ibb.co/k2rHvsrY/bed-47.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(210, 70, 'https://i.ibb.co/XZ4PZY3H/bed-33.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(211, 71, 'https://i.ibb.co/cc7cnpFv/bed-48.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(212, 71, 'https://i.ibb.co/k2rHvsrY/bed-47.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(213, 71, 'https://i.ibb.co/XZ4PZY3H/bed-33.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(214, 72, 'https://i.ibb.co/cc7cnpFv/bed-48.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(215, 72, 'https://i.ibb.co/LzktxYHk/bed-46.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(216, 72, 'https://i.ibb.co/k2rHvsrY/bed-47.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(217, 73, 'https://i.ibb.co/tpr71GZC/bed-49.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(218, 73, 'https://i.ibb.co/350NFZZx/bed-50.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(219, 73, 'https://i.ibb.co/XrHhzv5m/bed-34.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(220, 74, 'https://i.ibb.co/3mt18RM2/bed-51.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(221, 74, 'https://i.ibb.co/350NFZZx/bed-50.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(222, 74, 'https://i.ibb.co/XrHhzv5m/bed-34.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(223, 75, 'https://i.ibb.co/3mt18RM2/bed-51.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(224, 75, 'https://i.ibb.co/tpr71GZC/bed-49.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(225, 75, 'https://i.ibb.co/350NFZZx/bed-50.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(226, 76, 'https://i.ibb.co/Y421fyH2/bed-52.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(227, 76, 'https://i.ibb.co/h1sNKGPb/bed-53.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(228, 76, 'https://i.ibb.co/Hf9q37Kf/bed-35.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(229, 77, 'https://i.ibb.co/YBvyk7DF/bed-54.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(230, 77, 'https://i.ibb.co/h1sNKGPb/bed-53.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(231, 77, 'https://i.ibb.co/Hf9q37Kf/bed-35.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(232, 78, 'https://i.ibb.co/YBvyk7DF/bed-54.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(233, 78, 'https://i.ibb.co/Y421fyH2/bed-52.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(234, 78, 'https://i.ibb.co/h1sNKGPb/bed-53.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(235, 79, 'https://i.ibb.co/20qFSWHN/bed-55.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(236, 79, 'https://i.ibb.co/mrTw7vKk/bed-56.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(237, 79, 'https://i.ibb.co/TV1w6zm/bed-36.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(238, 80, 'https://i.ibb.co/FkhCXSf8/bed-57.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(239, 80, 'https://i.ibb.co/mrTw7vKk/bed-56.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(240, 80, 'https://i.ibb.co/TV1w6zm/bed-36.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(241, 81, 'https://i.ibb.co/FkhCXSf8/bed-57.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(242, 81, 'https://i.ibb.co/20qFSWHN/bed-55.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(243, 81, 'https://i.ibb.co/mrTw7vKk/bed-56.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(244, 82, 'https://i.ibb.co/v62B8vqB/bed-58.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(245, 82, 'https://i.ibb.co/b5XVyDg2/bed-60.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(246, 82, 'https://i.ibb.co/8gCWQ8Jm/bed-37.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(247, 83, 'https://i.ibb.co/KpQJVJ9T/bed-61.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(248, 83, 'https://i.ibb.co/b5XVyDg2/bed-60.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(249, 83, 'https://i.ibb.co/8gCWQ8Jm/bed-37.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(250, 84, 'https://i.ibb.co/KpQJVJ9T/bed-61.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(251, 84, 'https://i.ibb.co/v62B8vqB/bed-58.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(252, 84, 'https://i.ibb.co/b5XVyDg2/bed-60.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(253, 85, 'https://i.ibb.co/zH6CtHrz/bed-62.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(254, 85, 'https://i.ibb.co/zTdPNsQd/bed-63.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(255, 85, 'https://i.ibb.co/nN3HVPdf/bed-38.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(256, 86, 'https://i.ibb.co/sJkGy0MY/bed-65.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(257, 86, 'https://i.ibb.co/zTdPNsQd/bed-63.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(258, 86, 'https://i.ibb.co/nN3HVPdf/bed-38.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(259, 87, 'https://i.ibb.co/sJkGy0MY/bed-65.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(260, 87, 'https://i.ibb.co/zH6CtHrz/bed-62.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(261, 87, 'https://i.ibb.co/zTdPNsQd/bed-63.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(262, 88, 'https://i.ibb.co/tPLRsRzP/bed-66.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(263, 88, 'https://i.ibb.co/FqD9k6mW/bed-67.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(264, 88, 'https://i.ibb.co/RkgHv6fR/bed-39.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(265, 89, 'https://i.ibb.co/Kzw7Bb5R/bed-68.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(266, 89, 'https://i.ibb.co/FqD9k6mW/bed-67.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(267, 89, 'https://i.ibb.co/RkgHv6fR/bed-39.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(268, 90, 'https://i.ibb.co/Kzw7Bb5R/bed-68.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(269, 90, 'https://i.ibb.co/tPLRsRzP/bed-66.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(270, 90, 'https://i.ibb.co/FqD9k6mW/bed-67.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(271, 91, 'https://i.ibb.co/rB13MWW/bed-69.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(272, 91, 'https://i.ibb.co/TMhKNxqH/bed-70.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(273, 91, 'https://i.ibb.co/Z6dGMDdB/bed-40.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(274, 92, 'https://i.ibb.co/LhvgPk8Y/bed-71.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(275, 92, 'https://i.ibb.co/TMhKNxqH/bed-70.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(276, 92, 'https://i.ibb.co/Z6dGMDdB/bed-40.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(277, 93, 'https://i.ibb.co/LhvgPk8Y/bed-71.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(278, 93, 'https://i.ibb.co/rB13MWW/bed-69.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(279, 93, 'https://i.ibb.co/TMhKNxqH/bed-70.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(280, 94, 'https://i.ibb.co/WvZsSdyD/bed-72.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(281, 94, 'https://i.ibb.co/Q7n3RqV0/bed-73.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(282, 94, 'https://i.ibb.co/0V26vBzN/bed-41.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(283, 95, 'https://i.ibb.co/gMxxnWv1/bed-74.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(284, 95, 'https://i.ibb.co/Q7n3RqV0/bed-73.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(285, 95, 'https://i.ibb.co/0V26vBzN/bed-41.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(286, 96, 'https://i.ibb.co/gMxxnWv1/bed-74.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(287, 96, 'https://i.ibb.co/WvZsSdyD/bed-72.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(288, 96, 'https://i.ibb.co/Q7n3RqV0/bed-73.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(289, 97, 'https://i.ibb.co/R4MHwmVS/bed-75.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(290, 97, 'https://i.ibb.co/1JJ9KhV8/bed-76.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(291, 97, 'https://i.ibb.co/d0jZS31H/bed-42.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(292, 98, 'https://i.ibb.co/MYQpdf0/bed-77.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(293, 98, 'https://i.ibb.co/1JJ9KhV8/bed-76.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(294, 98, 'https://i.ibb.co/d0jZS31H/bed-42.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(295, 99, 'https://i.ibb.co/MYQpdf0/bed-77.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(296, 99, 'https://i.ibb.co/R4MHwmVS/bed-75.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(297, 99, 'https://i.ibb.co/1JJ9KhV8/bed-76.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(298, 100, 'https://i.ibb.co/5X6nb32B/bed-78.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(299, 100, 'https://i.ibb.co/v4jDFQmz/bed-79.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(300, 100, 'https://i.ibb.co/bjpRmshQ/bed-43.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(301, 101, 'https://i.ibb.co/Q3174xWW/bed-80.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(302, 101, 'https://i.ibb.co/v4jDFQmz/bed-79.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(303, 101, 'https://i.ibb.co/bjpRmshQ/bed-43.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(304, 102, 'https://i.ibb.co/Q3174xWW/bed-80.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(305, 102, 'https://i.ibb.co/5X6nb32B/bed-78.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(306, 102, 'https://i.ibb.co/v4jDFQmz/bed-79.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(307, 103, 'https://i.ibb.co/wFGDwfHS/bed-81.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(308, 103, 'https://i.ibb.co/LDPTCw6q/bed-82.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(309, 103, 'https://i.ibb.co/0zjT8N7/bed-44.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(310, 104, 'https://i.ibb.co/2YtPRmx4/bed-83.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(311, 104, 'https://i.ibb.co/LDPTCw6q/bed-82.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(312, 104, 'https://i.ibb.co/0zjT8N7/bed-44.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(313, 105, 'https://i.ibb.co/2YtPRmx4/bed-83.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(314, 105, 'https://i.ibb.co/wFGDwfHS/bed-81.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(315, 105, 'https://i.ibb.co/LDPTCw6q/bed-82.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(316, 106, 'https://i.ibb.co/mgGScKz/bed-84.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(317, 106, 'https://i.ibb.co/93whZZVz/bed-85.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(318, 106, 'https://i.ibb.co/3mRVm14Q/bed-45.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(319, 107, 'https://i.ibb.co/tjQ9YGd/bed-86.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(320, 107, 'https://i.ibb.co/93whZZVz/bed-85.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(321, 107, 'https://i.ibb.co/3mRVm14Q/bed-45.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(322, 108, 'https://i.ibb.co/tjQ9YGd/bed-86.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(323, 108, 'https://i.ibb.co/mgGScKz/bed-84.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(324, 108, 'https://i.ibb.co/93whZZVz/bed-85.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(325, 109, 'https://i.ibb.co/p6Z7V5Cd/bed-87.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(326, 109, 'https://i.ibb.co/7Dmxqcp/bed-88.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(327, 109, 'https://i.ibb.co/LzktxYHk/bed-46.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(328, 110, 'https://i.ibb.co/05kSXcc/bed-89.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(329, 110, 'https://i.ibb.co/7Dmxqcp/bed-88.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(330, 110, 'https://i.ibb.co/LzktxYHk/bed-46.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(331, 111, 'https://i.ibb.co/05kSXcc/bed-89.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(332, 111, 'https://i.ibb.co/p6Z7V5Cd/bed-87.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(333, 111, 'https://i.ibb.co/7Dmxqcp/bed-88.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(334, 112, 'https://i.ibb.co/B2HFvTpy/bed-90.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(335, 112, 'https://i.ibb.co/MLPhvBf/bed-91.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(336, 112, 'https://i.ibb.co/k2rHvsrY/bed-47.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(337, 113, 'https://i.ibb.co/cBx4MGR/bed-92.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(338, 113, 'https://i.ibb.co/MLPhvBf/bed-91.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(339, 113, 'https://i.ibb.co/k2rHvsrY/bed-47.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(340, 114, 'https://i.ibb.co/cBx4MGR/bed-92.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(341, 114, 'https://i.ibb.co/B2HFvTpy/bed-90.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(342, 114, 'https://i.ibb.co/MLPhvBf/bed-91.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(343, 115, 'https://i.ibb.co/236JPJC0/bed-95.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(344, 115, 'https://i.ibb.co/rG5rQMMv/bed-96.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(345, 115, 'https://i.ibb.co/cc7cnpFv/bed-48.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(346, 116, 'https://i.ibb.co/ym2r2q99/bed-97.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(347, 116, 'https://i.ibb.co/rG5rQMMv/bed-96.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(348, 116, 'https://i.ibb.co/cc7cnpFv/bed-48.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(349, 117, 'https://i.ibb.co/ym2r2q99/bed-97.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(350, 117, 'https://i.ibb.co/236JPJC0/bed-95.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(351, 117, 'https://i.ibb.co/rG5rQMMv/bed-96.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(352, 118, 'https://i.ibb.co/QFkJ7bfq/bed-98.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(353, 118, 'https://i.ibb.co/qPgd8xm/bed-99.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(354, 118, 'https://i.ibb.co/tpr71GZC/bed-49.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(355, 119, 'https://i.ibb.co/VY7Fc25t/bed-100.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(356, 119, 'https://i.ibb.co/qPgd8xm/bed-99.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(357, 119, 'https://i.ibb.co/tpr71GZC/bed-49.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(358, 120, 'https://i.ibb.co/VY7Fc25t/bed-100.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(359, 120, 'https://i.ibb.co/QFkJ7bfq/bed-98.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(360, 120, 'https://i.ibb.co/qPgd8xm/bed-99.jpg', '2025-05-31 14:09:47', '2025-05-31 14:09:47'),
(361, 121, 'https://i.ibb.co/dwNT0RQS/bed-101.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(362, 121, 'https://i.ibb.co/jvRs904B/bed-102.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(363, 121, 'https://i.ibb.co/350NFZZx/bed-50.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(364, 122, 'https://i.ibb.co/d03trg40/bed-103.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(365, 122, 'https://i.ibb.co/jvRs904B/bed-102.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(366, 122, 'https://i.ibb.co/350NFZZx/bed-50.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(367, 123, 'https://i.ibb.co/d03trg40/bed-103.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(368, 123, 'https://i.ibb.co/dwNT0RQS/bed-101.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(369, 123, 'https://i.ibb.co/jvRs904B/bed-102.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(370, 124, 'https://i.ibb.co/9HLktG4H/bed-104.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(371, 124, 'https://i.ibb.co/99ZP7vN3/bed-105.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(372, 124, 'https://i.ibb.co/3mt18RM2/bed-51.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(373, 125, 'https://i.ibb.co/YBMLcFTk/bed-106.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(374, 125, 'https://i.ibb.co/99ZP7vN3/bed-105.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(375, 125, 'https://i.ibb.co/3mt18RM2/bed-51.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(376, 126, 'https://i.ibb.co/YBMLcFTk/bed-106.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(377, 126, 'https://i.ibb.co/9HLktG4H/bed-104.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(378, 126, 'https://i.ibb.co/99ZP7vN3/bed-105.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(379, 127, 'https://i.ibb.co/pj7fB9sX/bed-107.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(380, 127, 'https://i.ibb.co/Jjn17px1/bed-109.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(381, 127, 'https://i.ibb.co/Y421fyH2/bed-52.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(382, 128, 'https://i.ibb.co/fYhT6XPJ/bed-110.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(383, 128, 'https://i.ibb.co/Jjn17px1/bed-109.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(384, 128, 'https://i.ibb.co/Y421fyH2/bed-52.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(385, 129, 'https://i.ibb.co/fYhT6XPJ/bed-110.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(386, 129, 'https://i.ibb.co/pj7fB9sX/bed-107.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(387, 129, 'https://i.ibb.co/Jjn17px1/bed-109.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(388, 130, 'https://i.ibb.co/99gWZRpF/bed-111.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(389, 130, 'https://i.ibb.co/FkKn7V4X/bed-112.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(390, 130, 'https://i.ibb.co/h1sNKGPb/bed-53.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(391, 131, 'https://i.ibb.co/k2fCpRrs/bed-113.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(392, 131, 'https://i.ibb.co/FkKn7V4X/bed-112.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(393, 131, 'https://i.ibb.co/h1sNKGPb/bed-53.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(394, 132, 'https://i.ibb.co/k2fCpRrs/bed-113.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(395, 132, 'https://i.ibb.co/99gWZRpF/bed-111.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(396, 132, 'https://i.ibb.co/FkKn7V4X/bed-112.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(397, 133, 'https://i.ibb.co/DHW2mSMJ/bed-114.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(398, 133, 'https://i.ibb.co/KxKqYRK4/bed-115.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(399, 133, 'https://i.ibb.co/YBvyk7DF/bed-54.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(400, 134, 'https://i.ibb.co/MD7vNdSJ/bed-116.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(401, 134, 'https://i.ibb.co/KxKqYRK4/bed-115.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(402, 134, 'https://i.ibb.co/YBvyk7DF/bed-54.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(403, 135, 'https://i.ibb.co/MD7vNdSJ/bed-116.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(404, 135, 'https://i.ibb.co/DHW2mSMJ/bed-114.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(405, 135, 'https://i.ibb.co/KxKqYRK4/bed-115.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(406, 136, 'https://i.ibb.co/Tq436wzG/bed-117.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(407, 136, 'https://i.ibb.co/9HQf1hhx/bed-118.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(408, 136, 'https://i.ibb.co/20qFSWHN/bed-55.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(409, 137, 'https://i.ibb.co/fzPp0qYM/bed-119.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(410, 137, 'https://i.ibb.co/9HQf1hhx/bed-118.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(411, 137, 'https://i.ibb.co/20qFSWHN/bed-55.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(412, 138, 'https://i.ibb.co/fzPp0qYM/bed-119.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(413, 138, 'https://i.ibb.co/Tq436wzG/bed-117.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(414, 138, 'https://i.ibb.co/9HQf1hhx/bed-118.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(415, 139, 'https://i.ibb.co/C5M27NPR/bed-120.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(416, 139, 'https://i.ibb.co/HLZF8fpW/bed-121.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(417, 139, 'https://i.ibb.co/mrTw7vKk/bed-56.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(418, 140, 'https://i.ibb.co/4nbR15r2/bed-122.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(419, 140, 'https://i.ibb.co/HLZF8fpW/bed-121.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(420, 140, 'https://i.ibb.co/mrTw7vKk/bed-56.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(421, 141, 'https://i.ibb.co/4nbR15r2/bed-122.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(422, 141, 'https://i.ibb.co/C5M27NPR/bed-120.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(423, 141, 'https://i.ibb.co/HLZF8fpW/bed-121.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(424, 142, 'https://i.ibb.co/84sGtDXw/bed-123.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(425, 142, 'https://i.ibb.co/gLNG5zBL/bed-124.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(426, 142, 'https://i.ibb.co/FkhCXSf8/bed-57.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(427, 143, 'https://i.ibb.co/HTLMnsk1/bed-125.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(428, 143, 'https://i.ibb.co/gLNG5zBL/bed-124.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(429, 143, 'https://i.ibb.co/FkhCXSf8/bed-57.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(430, 144, 'https://i.ibb.co/HTLMnsk1/bed-125.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(431, 144, 'https://i.ibb.co/84sGtDXw/bed-123.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(432, 144, 'https://i.ibb.co/gLNG5zBL/bed-124.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(433, 145, 'https://i.ibb.co/k6Gy2Wfz/bed-126.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(434, 145, 'https://i.ibb.co/Lzd10X7Z/bed-127.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(435, 145, 'https://i.ibb.co/v62B8vqB/bed-58.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(436, 146, 'https://i.ibb.co/tPx3g5r0/bed-128.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(437, 146, 'https://i.ibb.co/Lzd10X7Z/bed-127.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(438, 146, 'https://i.ibb.co/v62B8vqB/bed-58.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(439, 147, 'https://i.ibb.co/tPx3g5r0/bed-128.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(440, 147, 'https://i.ibb.co/k6Gy2Wfz/bed-126.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(441, 147, 'https://i.ibb.co/Lzd10X7Z/bed-127.jpg', '2025-05-31 14:09:48', '2025-05-31 14:09:48'),
(442, 148, 'https://i.ibb.co/k2YVSvfJ/bed-305.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(443, 148, 'https://i.ibb.co/1G6xp270/bed-306.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(444, 148, 'https://i.ibb.co/354bMNWN/bed-307.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(445, 149, 'https://i.ibb.co/nMVHhrtN/bed-308.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(446, 149, 'https://i.ibb.co/1G6xp270/bed-306.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(447, 149, 'https://i.ibb.co/354bMNWN/bed-307.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(448, 150, 'https://i.ibb.co/nMVHhrtN/bed-308.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(449, 150, 'https://i.ibb.co/k2YVSvfJ/bed-305.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07'),
(450, 150, 'https://i.ibb.co/1G6xp270/bed-306.jpg', '2025-05-31 14:12:07', '2025-05-31 14:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Single Room', '2025-05-28 12:15:45', '2025-05-28 12:15:45'),
(2, 'Double Room', '2025-05-28 12:15:45', '2025-05-28 12:15:45'),
(3, 'Deluxe Room', '2025-05-28 12:15:45', '2025-05-28 12:15:45');

-- --------------------------------------------------------

--
-- Table structure for table `transportation`
--

CREATE TABLE `transportation` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `type` enum('internal','external') NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('male','female') DEFAULT NULL,
  `mobile_num` varchar(15) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `date_of_birth`, `password`, `email`, `email_verified_at`, `age`, `sex`, `mobile_num`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Mohamed Magdy', '2004-03-25', '$2y$12$nw4L4UqjErd0TF6IG0q6CuKyGspI/OHMVw3L7ZYNgAosiBMgUcTLO', 'mohamed.magdy.elmagawry@gmail.com', '2025-05-31 14:08:41', 21, 'male', '+01022798785', 'admin', NULL, '2025-05-31 14:08:11', '2025-05-31 14:08:41');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `budget_min` decimal(8,2) DEFAULT NULL,
  `budget_max` decimal(8,2) DEFAULT NULL,
  `preferred_cities` text DEFAULT NULL,
  `preferred_entertainment` text DEFAULT NULL,
  `preferred_transport` enum('internal','external','both') NOT NULL DEFAULT 'both',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ai_model_metadata`
--
ALTER TABLE `ai_model_metadata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_room_id_foreign` (`room_id`),
  ADD KEY `bookings_hotel_id_foreign` (`hotel_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `entertainment_places`
--
ALTER TABLE `entertainment_places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entertainment_places_city_id_foreign` (`city_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotels_city_id_foreign` (`city_id`),
  ADD KEY `hotels_owner_id_foreign` (`owner_id`);

--
-- Indexes for table `hotel_booking_rooms`
--
ALTER TABLE `hotel_booking_rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_booking_rooms_hotel_id_foreign` (`hotel_id`),
  ADD KEY `hotel_booking_rooms_booking_id_foreign` (`booking_id`),
  ADD KEY `hotel_booking_rooms_room_id_foreign` (`room_id`);

--
-- Indexes for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_images_hotel_id_foreign` (`hotel_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_booking_id_foreign` (`booking_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recommendations_user_id_foreign` (`user_id`),
  ADD KEY `recommendations_hotel_id_foreign` (`hotel_id`),
  ADD KEY `recommendations_transportation_id_foreign` (`transportation_id`),
  ADD KEY `recommendations_restaurant_id_foreign` (`restaurant_id`),
  ADD KEY `recommendations_entertainment_place_id_foreign` (`entertainment_place_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurants_city_id_foreign` (`city_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`),
  ADD KEY `reviews_hotel_id_foreign` (`hotel_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_hotel_id_foreign` (`hotel_id`),
  ADD KEY `rooms_room_type_id_foreign` (`room_type_id`);

--
-- Indexes for table `room_images`
--
ALTER TABLE `room_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_images_room_id_foreign` (`room_id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transportation`
--
ALTER TABLE `transportation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transportation_city_id_foreign` (`city_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_mobile_num_unique` (`mobile_num`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_preferences_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ai_model_metadata`
--
ALTER TABLE `ai_model_metadata`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `entertainment_places`
--
ALTER TABLE `entertainment_places`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `hotel_booking_rooms`
--
ALTER TABLE `hotel_booking_rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hotel_images`
--
ALTER TABLE `hotel_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=331;

--
-- AUTO_INCREMENT for table `room_images`
--
ALTER TABLE `room_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=451;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transportation`
--
ALTER TABLE `transportation`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_preferences`
--
ALTER TABLE `user_preferences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `entertainment_places`
--
ALTER TABLE `entertainment_places`
  ADD CONSTRAINT `entertainment_places_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `hotels_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotels_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotel_booking_rooms`
--
ALTER TABLE `hotel_booking_rooms`
  ADD CONSTRAINT `hotel_booking_rooms_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotel_booking_rooms_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotel_booking_rooms_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD CONSTRAINT `hotel_images_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_entertainment_place_id_foreign` FOREIGN KEY (`entertainment_place_id`) REFERENCES `entertainment_places` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `recommendations_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `recommendations_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `recommendations_transportation_id_foreign` FOREIGN KEY (`transportation_id`) REFERENCES `transportation` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `recommendations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD CONSTRAINT `restaurants_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `room_images`
--
ALTER TABLE `room_images`
  ADD CONSTRAINT `room_images_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transportation`
--
ALTER TABLE `transportation`
  ADD CONSTRAINT `transportation_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD CONSTRAINT `user_preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
