import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { LocationTracker } from './components/LocationTracker';
import { SOSButton } from './components/SOSButton';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EmergencyContacts } from './components/EmergencyContacts';
import type { User, Location, PersonalInfo, EmergencyContact } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // TODO: Implement actual authentication
    setUser({
      id: '1',
      name: 'Jane Doe',
      email: email,
      emergencyContacts: [],
    });
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // TODO: Implement actual registration
    setUser({
      id: '1',
      name: name,
      email: email,
      emergencyContacts: [],
    });
  };

  const handleLocationUpdate = (location: Location) => {
    // TODO: Implement location tracking logic
    console.log('Location updated:', location);
  };

  const handleSOS = () => {
    if (user?.emergencyContacts?.length) {
      const contacts = user.emergencyContacts.map(c => c.name).join(', ');
      alert(`Emergency alert sent to: ${contacts}`);
    } else {
      alert('Emergency alert sent to authorities!');
    }
  };

  const handlePersonalInfoSave = (info: PersonalInfo) => {
    setUser(prev => prev ? { ...prev, personalInfo: info } : null);
    alert('Personal information saved successfully!');
  };

  const handleEmergencyContactsSave = (contacts: EmergencyContact[]) => {
    setUser(prev => prev ? { ...prev, emergencyContacts: contacts } : null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Safety Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={() => setUser(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <LocationTracker onLocationUpdate={handleLocationUpdate} />
          <EmergencyContacts 
            contacts={user.emergencyContacts || []}
            onSave={handleEmergencyContactsSave}
          />
          <div className="md:col-span-2">
            <PersonalInfoForm 
              onSave={handlePersonalInfoSave}
              initialInfo={user.personalInfo}
            />
          </div>
        </div>
        <SOSButton onSOS={handleSOS} />
      </main>
    </div>
  );
}

export default App;