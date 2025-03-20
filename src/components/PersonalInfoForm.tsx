import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import type { PersonalInfo } from '../types';

interface PersonalInfoFormProps {
  onSave: (info: PersonalInfo) => void;
  initialInfo?: PersonalInfo;
}

export function PersonalInfoForm({ onSave, initialInfo }: PersonalInfoFormProps) {
  const [info, setInfo] = useState<PersonalInfo>(initialInfo || {
    dateOfBirth: '',
    bloodGroup: '',
    address: '',
    medicalConditions: '',
    allergies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(info);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={info.dateOfBirth}
              onChange={(e) => setInfo({ ...info, dateOfBirth: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select
              value={info.bloodGroup}
              onChange={(e) => setInfo({ ...info, bloodGroup: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
          <textarea
            value={info.medicalConditions}
            onChange={(e) => setInfo({ ...info, medicalConditions: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            rows={2}
            placeholder="List any medical conditions (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Allergies</label>
          <textarea
            value={info.allergies}
            onChange={(e) => setInfo({ ...info, allergies: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            rows={2}
            placeholder="List any allergies (optional)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Save Information
        </button>
      </form>
    </div>
  );
}