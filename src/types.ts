export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emergencyContacts?: EmergencyContact[];
  personalInfo?: PersonalInfo;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PersonalInfo {
  dateOfBirth: string;
  bloodGroup: string;
  address: string;
  medicalConditions?: string;
  allergies?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}