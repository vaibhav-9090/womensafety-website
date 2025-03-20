import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface SOSButtonProps {
  onSOS: () => void;
}

export function SOSButton({ onSOS }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleSOS = () => {
    setIsPressed(true);
    onSOS();
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <button
        onClick={handleSOS}
        disabled={isPressed}
        className={`
          flex items-center gap-2 px-6 py-4 rounded-full text-white font-bold
          transform transition-all duration-200
          ${
            isPressed
              ? 'bg-red-700 scale-95'
              : 'bg-red-600 hover:bg-red-700 hover:scale-105'
          }
          focus:outline-none focus:ring-4 focus:ring-red-300
        `}
      >
        <AlertCircle className="w-6 h-6" />
        {isPressed ? 'Sending Alert...' : 'SOS Emergency'}
      </button>
    </div>
  );
}