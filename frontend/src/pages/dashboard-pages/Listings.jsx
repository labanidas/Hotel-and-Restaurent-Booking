import React, { useState, useEffect  } from "react";
import { useHotelStore } from "../../store/useHotelStore";

const Listings = () => {
const { isGettingHotels, hotels, getHotels, setHotel } = useHotelStore();
  useEffect(() => {
    getHotels();
  }, [getHotels]);

  if(isGettingHotels) return <h1> Loading... </h1>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Hotel Listings</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <div key={hotel._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl">
              <a href={`/dashboard/listing/${hotel._id}`}>
                <img
                  src={hotel.images[0]} // Displaying the first image from the array
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.description}</p>
                  <p className="text-gray-800 font-semibold">${hotel.pricing}/night</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Listings