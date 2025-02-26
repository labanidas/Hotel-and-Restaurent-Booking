import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  isCheckingAuth: true,

  // --------------- check auth------------------
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data});
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // --------------- register/signup-------------------
  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  // --------------- login-------------------
  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // --------------- logout-------------------
  logout: async () => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/logout");      
      toast.success(res.data.message );
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ authUser: null });
      set({ isLoggingIn: false });
    }
  }, 
}));
