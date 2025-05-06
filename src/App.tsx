import React, { useState } from "react";
import { UserData } from "./types";
import RavanExperience from "./components/RavanExperience";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    selectedCategory: 0,
  });
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-10">
        <RavanExperience userData={userData} setUserData={setUserData} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
