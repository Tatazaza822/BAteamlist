'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function EditPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState<string>('');

  // Fetch all students from the database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/students');
        const result = await response.json();
        if (response.ok) {
          setStudents(result);
        } else {
          setMessage(result.message || 'Failed to fetch students');
        }
      } catch (error) {
        setMessage('Error fetching students');
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    try {
      const response = await fetch(`/api/edit-student`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedStudent),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Student updated successfully!');
      } else {
        setMessage(result.message || 'Failed to update student');
      }
    } catch (error) {
      setMessage('Error updating student');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedStudent) return;
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.push('/form'); // Redirect to the form page
  };

  const handleStudentSelect = (student: StudentData) => {
    setSelectedStudent(student);
    setSearchQuery(''); // Clear the search query to hide the dropdown
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Student Information</h1>
        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Student Dropdown */}
        <div className="mb-6 relative">
          <label htmlFor="student-search" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Student to Edit
          </label>
          <input
            id="student-search"
            type="text"
            placeholder="Search for a student..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {searchQuery && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto mt-1">
              {students
                .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((student) => (
                  <li key={student.id}>
                    <button
                      onClick={() => handleStudentSelect(student)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {student.name} (Level: {student.Level})
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Edit Form */}
        {selectedStudent && (
          <form onSubmit={handleEdit} className="space-y-4">
            {Object.keys(selectedStudent).map((field) =>
              field !== 'id' ? (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-600 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={selectedStudent[field as keyof StudentData]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : null
            )}
            <div className="flex justify-end space-x-4">
              {/* Update Button */}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Back to Form Page
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
