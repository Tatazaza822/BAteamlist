'use client';

import { useState, useEffect, useRef } from 'react';

type StudentData = {
  id: number;
  name: string;
  Skill1: string;
  Skill2: string;
  Skill3: string;
  Skill4: string;
  Star: string;
  Level: string;
  E1: string;
  E2: string;
  E3: string;
};

export default function DatabaseView() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<StudentData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(true); // Keep dropdown visible initially
  const dropdownRef = useRef<HTMLUListElement | null>(null); // Ref for dropdown
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input field

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-data');
        const result = await response.json();

        if (response.ok) {
          setStudents(result);
        } else {
          setMessage(result.message || 'Failed to fetch data');
        }
      } catch (error) {
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, []);

  // Handle selection of students (toggle selection by clicking on buttons)
  const handleStudentClick = (student: StudentData) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.some((selected) => selected.id === student.id)
        ? prevSelected.filter((selected) => selected.id !== student.id) // Deselect
        : [...prevSelected, student] // Select
    );
    // Re-enable dropdown if search query exists
    if (searchQuery) {
      setDropdownVisible(true); // Show the dropdown again if there's a search
    }
  };

  // Handle changes in the search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Re-enable dropdown when the user types
    if (value) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false); // Optionally hide dropdown when input is empty
    }
  };

  // Close dropdown if clicked outside of the dropdown or the input field
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setDropdownVisible(false); // Close the dropdown if click is outside
    }
  };

  // Set up event listener for outside click
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Build a team</h1>
        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Student Dropdown */}
        <div className="mb-6 relative">
          <label htmlFor="student-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Students
          </label>
          <input
            id="student-search"
            ref={inputRef} // Set ref to input field
            type="text"
            placeholder="Search for a student..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {searchQuery && dropdownVisible && (
            <ul ref={dropdownRef} className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto mt-1">
              {students
                .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((student) => (
                  <li key={student.id}>
                    <div
                      className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        selectedStudents.some((selected) => selected.id === student.id) ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => handleStudentClick(student)}
                    >
                      <button className="w-full text-left">{student.name}</button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Display selected students in a single chunk of text */}
        {selectedStudents.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Selected Students</h2>
            <div className="whitespace-pre-wrap">
              {selectedStudents.map((student) => (
                <div key={student.id} className="text-sm mb-2">
                  {/* Display the data as a single chunk of text */}
                  {`${student.name} ${student.Skill1}${student.Skill2}${student.Skill3}${student.Skill4} ${student.Star} Lv.${student.Level} ${student.E1}${student.E2}${student.E3}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
