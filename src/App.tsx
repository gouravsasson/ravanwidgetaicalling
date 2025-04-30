import React, { useState } from 'react';
import { UserData } from './types';
import RavanExperience from './components/RavanExperience';

function App() {
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    selectedCategory: 0
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-10">
      <RavanExperience userData={userData} setUserData={setUserData} />
    </div>
  );
}

export default App;