import React, { useState, useEffect  } from "react";
import { useHotelStore } from "../../store/useHotelStore";
import { useParams } from 'react-router-dom';

const ListingPage = () => {
  const { id } = useParams();
  const { isGettingHotels, getSingleHotel, hotel } = useHotelStore();  
  useEffect(() => {
    if (id) {
      getSingleHotel(id);
    }
  }, [id, getSingleHotel]);
  

  if (isGettingHotels && !hotel) return <h1> Loading... </h1>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="rounded-lg shadow-lg w-full object-cover object-center"
            style={{ height: '400px' }}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{hotel.name}</h2>
            <p className="text-gray-500 mt-2">{hotel.description}</p>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">Facilities</h3>
              <ul className="list-disc list-inside text-gray-600">
                {hotel.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">
                {hotel.address.street}, {hotel.address.city},<br />
                {hotel.address.state} {hotel.address.zip},<br />
                {hotel.address.country}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-bold text-gray-800">${hotel.pricing}</span>
            <span className="text-md text-gray-600"> / night</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingPage