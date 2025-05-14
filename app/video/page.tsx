'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const firstGroup = [
    { id: 'a', label: 'Binah', message: 'Binah' },
    { id: 'b', label: 'Shiro&Kuro', message: 'Shiro&Kuro' },
    { id: 'c', label: 'Chesed', message: 'Chesed' },
    { id: 'd', label: 'Hieronymus', message: 'Hieronymus' },
    { id: 'e', label: 'KAITEN FX Mk.0', message: 'KAITEN FX Mk.0' },
    { id: 'f', label: 'Perorodzilla', message: 'Perorodzilla' },
    { id: 'g', label: 'Hod', message: 'Hod' },
    { id: 'h', label: 'Goz', message: 'Goz' },
    { id: 'i', label: 'Gregorius', message: 'Gregorius' },
    { id: 'j', label: 'Hovercraft', message: 'Hovercraft' },
    { id: 'k', label: 'Kurokage', message: 'Kurokage' },
  ];

  const secondGroup = [
    { id: '1', label: 'Indoor', message: 'Indoor' },
    { id: '2', label: 'Outdoor', message: 'Outdoor' },
    { id: '3', label: 'Urban', message: 'Urban' },
  ];

  const thirdGroup = [
    { id: 'x', label: 'Insane', message: 'Insane' },
    { id: 'y', label: 'Torment', message: 'Torment' },
    { id: 'z', label: 'Lunatic', message: 'Lunatic' },
  ];

  const fourthGroup = [
    { id: 'm1', label: 'Total Assault', message: 'Total Assault' },
    { id: 'm2', label: 'Grand Assault', message: 'Grand Assault' },
  ];

  const fifthGroup = [
    { id: 'g1', label: 'Heavy Armor', message: 'Heavy Armor' },
    { id: 'g2', label: 'Elastic Armor', message: 'Elastic Armor' },
    { id: 'g3', label: 'Special Armor', message: 'Special Armor' },
    { id: 'g4', label: 'Light Armor', message: 'Light Armor' },
  ];

  const [selectedMain, setSelectedMain] = useState<string | null>(null);
  const [selectedSecond, setSelectedSecond] = useState<string | null>(null);
  const [selectedThird, setSelectedThird] = useState<string | null>(null);
  const [selectedFourth, setSelectedFourth] = useState<string | null>(null);
  const [selectedFifth, setSelectedFifth] = useState<string | null>(null);

  const router = useRouter();

  const handleMainSelect = (id: string) => {
    setSelectedMain(id);
    setSelectedSecond(null);
    setSelectedThird(null);
    setSelectedFourth(null);
    setSelectedFifth(null);
  };

  const handleReset = () => {
    setSelectedMain(null);
    setSelectedSecond(null);
    setSelectedThird(null);
    setSelectedFourth(null);
    setSelectedFifth(null);
  };

  const handleHome = () => {
    router.push('/');
  };

  const selectedMainLabel = firstGroup.find(item => item.id === selectedMain)?.message;
  const selectedSecondLabel = secondGroup.find(item => item.id === selectedSecond)?.message;
  const selectedThirdLabel = thirdGroup.find(item => item.id === selectedThird)?.message;
  const selectedFourthLabel = fourthGroup.find(item => item.id === selectedFourth)?.message;
  const selectedFifthLabel = fifthGroup.find(item => item.id === selectedFifth)?.message;

  return (
    <main className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Video Title Generate</h1>

      {/* First group */}
      <div className="space-y-3">
        <h2 className="text-xl font-medium text-gray-700">Boss</h2>
        {firstGroup.map(option => (
          <label key={option.id} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all">
            <input
              type="checkbox"
              checked={selectedMain === option.id}
              onChange={() => handleMainSelect(option.id)}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
            />
            <span className="text-gray-800">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Second group */}
      {selectedMain && (
        <div className="space-y-3 mt-6">
          <h2 className="text-xl font-medium text-gray-700">Location</h2>
          {secondGroup.map(option => (
            <label key={option.id} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all">
              <input
                type="radio"
                name="location"
                checked={selectedSecond === option.id}
                onChange={() => setSelectedSecond(option.id)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Third group */}
      {selectedMain && (
        <div className="space-y-3 mt-6">
          <h2 className="text-xl font-medium text-gray-700">Difficulty</h2>
          {thirdGroup.map(option => (
            <label key={option.id} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all">
              <input
                type="radio"
                name="difficulty"
                checked={selectedThird === option.id}
                onChange={() => setSelectedThird(option.id)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Fourth group */}
      {selectedMain && (
        <div className="space-y-3 mt-6">
          <h2 className="text-xl font-medium text-gray-700">Mode</h2>
          {fourthGroup.map(option => (
            <label key={option.id} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all">
              <input
                type="radio"
                name="mode"
                checked={selectedFourth === option.id}
                onChange={() => {
                  setSelectedFourth(option.id);
                  setSelectedFifth(null);  // Reset armor selection when mode changes
                }}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Fifth group: only show if "Grand Assault" is selected */}
      {selectedFourth === 'm2' && (
        <div className="space-y-3 mt-6">
          <h2 className="text-xl font-medium text-gray-700">Choose Armor Type</h2>
          {fifthGroup.map(option => (
            <label key={option.id} className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-all">
              <input
                type="radio"
                name="armor"
                checked={selectedFifth === option.id}
                onChange={() => setSelectedFifth(option.id)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* Output */}
      {(selectedMainLabel || selectedSecondLabel || selectedThirdLabel || selectedFourthLabel || selectedFifthLabel) && (
        <p className="mt-6 text-xl font-semibold text-green-700">
          {[
            selectedMainLabel,
            selectedSecondLabel ? `(${selectedSecondLabel})` : null,
            selectedThirdLabel,
            selectedFifthLabel,  // Armor appears after difficulty
            selectedFourthLabel ? `- ${selectedFourthLabel}` : null,
          ]
            .filter(Boolean)
            .join(' ')}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8 justify-center">
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Reset
        </button>
        <button
          onClick={handleHome}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Return
        </button>
      </div>
    </main>
  );
}
