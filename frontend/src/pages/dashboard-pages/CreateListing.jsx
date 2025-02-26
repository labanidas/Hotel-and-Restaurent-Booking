import React, { useState, useEffect  } from "react";
import { useHotelStore } from "../../store/useHotelStore";
import { useNavigate } from "react-router-dom";
import { ImagesIcon } from "lucide-react";
import {Loader} from "lucide-react"

const CreateListing = () => {
  const navigate = useNavigate();
  const { isCreatingHotel, createHotel } = useHotelStore();
  const [formData, setFormData] = useState({
    type: "Hotel",
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    description: "",
    facilities: [],
    pricing: "",
    images: [],
  });

  const [newFacility, setNewFacility] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const newImageUrls = images.map(image => {
      const url = URL.createObjectURL(image);
      return url;
    });
    setImagePreviews(newImageUrls);
  
    // Clean up URLs to avoid memory leaks
    return () => newImageUrls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addFacility = () => {
    if (newFacility.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, newFacility.trim()],
      }));
      setNewFacility("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    createHotel(formData, images, navigate)
  };

  if(isCreatingHotel) return <h1> Loading...</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Create a Hotel Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Hotel Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="address.zip"
              placeholder="ZIP Code"
              value={formData.address.zip}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md h-24"
            required
          />
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium">Facilities</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              className="border p-2 rounded-md flex-grow"
            />
            <button
              type="button"
              onClick={addFacility}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.facilities.map((facility, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div>
          <label className="block text-sm font-medium">Price per Night ($)</label>
          <input
            type="number"
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
            className="w-full border p-2 rounded-md"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt="Preview" className="w-20 h-20 rounded-md object-cover" />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateListing




// import React from 'react'

// const ListingPage = () => {
//   return (
//     <div>ListingPage</div>
//   )
// }

// export default ListingPage