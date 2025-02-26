import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  isGettingReviews: true,
  isCreatingReview: true,
  reviews: [],

  getReviews: async () => {
    set({ isGettingReviews: true });
    try {
      const res = await axiosInstance.post("/secure/get-reviews");
      set({ reviews: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ reviews: [] });
    } finally {
      set({ isGettingReviews: false });
    }
  },
  
  createReview: async (data) => {
    set({ isCreatingHotel: true });
    try {
      const res = await axiosInstance.post("/secure/create-review", data);
      toast.success("Hotel created successfully");
      set({ reviews: [...hotels, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    //   set({ hotels: [] });
    } finally {
      set({ isCreatingReview: false });
    }
  },
 
}));
