import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LandingPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleGetStarted = () => {
    if (authUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <section className="relative  text-white overflow-hidden  ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: "url('home-bg-image.webp')",
            filter: "brightness(0.4)"
          }}
        ></div>

        <div className="container mx-auto lg:px-12 px-5 py-24 md:py-32 relative z-10 lg:h-[90vh]">
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 relative">
              {/* <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight ">
                Book Your Stay &
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Dine with Us
                </span>
              </h1> */}

              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                Book Your Stay &
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-green-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Dine with Us
                </span>
              </h1>


              <p className="text-xl mb-5 text-gray-300 ">
                Discover the best hotels & restaurants for a memorable experience.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ">
                <button
                  onClick={handleGetStarted}
                  className="group relative w-full sm:w-auto px-6 py-3 min-w-[160px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-white font-medium">Get Started</span>
                    <svg
                      className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </button>

                <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg text-white/70 hover:bg-white/10 hover:text-white transition-all min-w-[160px]">
                  Learn More
                </button>
              </div>

            </div>

            <div className="w-full md:w-2/5 md:pl-12">
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] bg-opacity-30 backdrop-blur-xl relative rounded-xl p-8 shadow-2xl border border-blue-500/30">
                {/* Heading */}
                <h2 className="text-3xl font-semibold mb-6 text-white">Why Choose Us?</h2>

                {/* Logo */}
                <img
                  src="/logo.webp"
                  alt="Logo"
                  className="h-16 right-4 top-4 drop-shadow-lg lg:block md:block hidden absolute"
                />

                {/* Features List */}
                <ul className="space-y-6">
                  <li className="flex items-center text-white font-medium">
                    <svg
                      className="w-7 h-7 mr-3 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span>Top-Rated Hotels & Restaurants</span>
                  </li>

                  <li className="flex items-center text-white font-medium">
                    <svg
                      className="w-7 h-7 mr-3 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span>Easy & Fast Booking</span>
                  </li>

                  <li className="flex items-center text-white font-medium">
                    <svg
                      className="w-7 h-7 mr-3 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      ></path>
                    </svg>
                    <span>Best Prices & Exclusive Offers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
      <div>
      <main className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Hotel & Restaurant</span> Booking
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Find the best places to stay and eat, all in one place. Seamless bookings, premium services, and the best deals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Start Searching Button with Navigation Logic */}
            <button
              onClick={handleGetStarted}
              className="relative inline-block px-8 py-3 font-medium text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg"
            >
              Start Searching
            </button>

            {/* Explore More Button */}
            <a
              href="#explore"
              className="relative inline-block px-8 py-3 font-medium text-gray-900 border border-gray-400 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-500"
            >
              Explore More
            </a>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default LandingPage;
