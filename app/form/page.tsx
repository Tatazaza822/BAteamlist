"use client";

import { useState, useEffect, useRef } from "react";

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

export default function AddStudentPage() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    Skill1: "",
    Skill2: "",
    Skill3: "",
    Skill4: "",
    Star: "",
    Level: "",
    E1: "",
    E2: "",
    E3: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch student list from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-data");
        const result = await response.json();
        if (response.ok) {
          setStudents(result);
        } else {
          setMessage(result.message || "Failed to fetch students");
        }
      } catch (error) {
        setMessage("Error fetching students");
      }
    };
    fetchData();
  }, []);

  // Handle selecting a student from the dropdown
  const handleStudentSelect = (student: StudentData) => {
    setFormData(student);
    setSearchQuery(student.name);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDropdownVisible(true); // Show dropdown when typing
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("Student added successfully!");
      setFormData({
        name: "",
        Skill1: "",
        Skill2: "",
        Skill3: "",
        Skill4: "",
        Star: "",
        Level: "",
        E1: "",
        E2: "",
        E3: "",
      });
      setSearchQuery(""); // Reset search field
    } else {
      setMessage(result.message || "Error adding student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Add New Student</h1>

        {message && (
          <div
            className={`p-4 mb-4 rounded ${
              message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          {Object.keys(formData).map((key) => (
            key !== "id" && (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )
          ))}

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
              Submit
            </button>
            <a href="/" className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
