import React, { useState } from 'react';
import { Phone, Plus, X } from 'lucide-react';
import type { EmergencyContact } from '../types';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onSave: (contacts: EmergencyContact[]) => void;
}

export function EmergencyContacts({ contacts, onSave }: EmergencyContactsProps) {
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: '',
    relationship: '',
    phone: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onSave([...contacts, newContact]);
    setNewContact({ name: '', relationship: '', phone: '' });
  };

  const handleRemove = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    onSave(updatedContacts);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Phone className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Emergency Contacts</h2>
      </div>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.relationship}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        <form onSubmit={handleAdd} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Relationship</label>
              <input
                type="text"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}