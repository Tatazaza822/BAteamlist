'use client'

import { useState } from "react";

type FormData = {
  name: string;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  star: string;
  level: string;
  e1: string;
  e2: string;
  e3: string;
}

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", skill1: "", skill2: "", skill3: "", skill4: "", star: "", level: "", e1: "", e2: "", e3: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      // Send POST request to the API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Data submitted successfully!');
        setFormData({ name: '', skill1: "", skill2: "", skill3: "", skill4: "",star: "", level: "", e1: "", e2: "",e3: ""}); // Clear form after submit
      } else {
        setMessage('Error submitting data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto"  }}>
      <h1 className="text-2xl font-bold text-gray-800 text-center">Enter Data</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-gray-700">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Skill1:
          <input
            type="number"
            name="skill1"
            value={formData.skill1}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Skill2:
          <input
            type="number"
            name="skill2"
            value={formData.skill2}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Skill3:
          <input
            type="number"
            name="skill3"
            value={formData.skill3}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Skill4:
          <input
            type="number"
            name="skill4"
            value={formData.skill4}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label >
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Star:
          <input
            type="number"
            name="star"
            value={formData.star}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Level:
          <input
            type="number"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Equipment1:
          <input
            type="number"
            name="e1"
            value={formData.e1}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Equipment2:
          <input
            type="number"
            name="e2"
            value={formData.e2}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-700">
          Equipment3:
          <input
            type="number"
            name="e3"
            value={formData.e3}
            onChange={handleChange}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            required
          />
        </label>
        <br />
        <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
