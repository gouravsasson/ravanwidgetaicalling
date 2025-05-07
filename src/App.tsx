import React, { useState } from "react";
import { UserData } from "./types";
import RavanExperience from "./components/RavanExperience";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [showRavanExperience, setShowRavanExperience] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    selectedCategory: 0,
  });
  const queryClient = new QueryClient();

  const closeRavanExperience = () => {
    console.log("closeRavanExperience");
    setShowRavanExperience(false);
    setUserData({
      fullName: "",
      email: "",
      phone: "",
      selectedCategory: 0,
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!showRavanExperience && (
        <div className="w-full h-full flex flex-col justify-center items-center my-2">
          <button
            onClick={() => setShowRavanExperience(true)}
            // className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            <div className="w-28 h-28 rounded-full bg-white border-2 border-primary flex justify-center items-center relative shadow-lg shadow-primary/15 mx-auto mb-6 transform-gpu">
              <div className="absolute w-[150%] h-[150%] rounded-full border border-primary/20 animate-pulse-slow"></div>
              <div className="absolute w-[180%] h-[180%] rounded-full border border-primary/10 animate-pulse-slower"></div>
              <div className="w-16 h-16 relative transform-gpu">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/30 shadow-inner relative">
                  <div className="absolute w-full top-1/3 flex justify-around z-10">
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 relative overflow-hidden">
                      <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-0.5 left-0.5 opacity-80"></div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50 relative overflow-hidden">
                      <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-0.5 left-0.5 opacity-80"></div>
                    </div>
                  </div>
                  <div className="absolute w-8 h-1.5 bg-primary bottom-1/4 left-1/2 -translate-x-1/2 rounded-full shadow-sm animate-talk"></div>
                </div>
              </div>
            </div>
          </button>
          <p
            onClick={() => setShowRavanExperience(true)}
            className="text-center text-base text-white bg-primary px-4 py-2 rounded-lg"
          >
            Try AI Calling
          </p>
        </div>
      )}

      {showRavanExperience && (
        <div className="absolute inset-0 flex justify-center items-center">
          <RavanExperience
            userData={userData}
            setUserData={setUserData}
            onClose={closeRavanExperience}
          />
        </div>
      )}
    </QueryClientProvider>
  );
}

export default App;
