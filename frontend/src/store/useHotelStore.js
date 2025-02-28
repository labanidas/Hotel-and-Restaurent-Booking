// useHotelStore.js


import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useHotelStore = create((set, get) => ({
  hotels: [],
  hotel: null,
  isCreatingHotel: false,  
  isGettingHotels: false, 
  singleHotel: null,
  
  // ---------------- get hotels ---------------
  getHotels: async () => {
    set({ isGettingHotels: true });
    try {
      const res = await axiosInstance.get("/listings");
      set({ hotels: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ hotels: [] });
    } finally {
      set({ isGettingHotels: false });
    }
  },

  // ---------------- get single hotel ---------------
  getSingleHotel: async (id) => {
    set({ isGettingHotels: true });
    try {
      const res = await axiosInstance.get(`/listings/${id}`);
      set({ hotel: res.data });
      console.log(get().hotel);
    } catch (error) {
      toast.error("Error fetching hotel");
      console.log(error);
      set({ hotel: null });
    } finally {
      set({ isGettingHotels: false });
    }
  },


  // ---------------- create hotel ---------------
  createHotel: async (data, images, navigate) => {
    set({ isCreatingHotel: true });    
    const urlArr = await get().uploadImagesCloudinary(images); //upload images
    if(urlArr.length > 0){
      data.images = urlArr;    
      try {
        const res = await axiosInstance.post("/listings", data);
        toast.success("Hotel created successfully");
        // set({ hotels: [...hotels, res.data] });
        console.log(res.data._id)
        navigate(`/dashboard/listing/${res.data._id}`);
      } catch (error) {
        toast.error(error.response.data.message);
      //   set({ hotels: [] });
      } finally {
        set({ isCreatingHotel: false });
      }
    }
  },


  // --------------- upload image ------------------
  uploadImagesCloudinary: async (images) => {
    let urlArr = [];
    try {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]); 
      }
      const res = await axiosInstance.post("/listings/user-upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      urlArr = res.data.images;
    } catch (error) {
      toast.error('Failed to upload images');
    }
    return urlArr;
  },  
}));
