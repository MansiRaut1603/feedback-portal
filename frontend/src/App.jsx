

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/api/feedback");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/feedback", form);
    setForm({ name: "", email: "", message: "", rating: 5 });
    fetchFeedbacks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/feedback/${id}`);
    fetchFeedbacks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          💬 Feedback Dashboard
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-purple-600">
            Submit Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <textarea
              placeholder="Your Feedback"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg font-semibold hover:scale-105 transition transform duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            📝 All Feedback
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-lg font-bold text-purple-600">
                  {fb.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{fb.email}</p>
                <p className="mb-3">{fb.message}</p>
                <p className="text-yellow-500 font-semibold">
                  {"⭐".repeat(fb.rating)}
                </p>

                <button
                  onClick={() => handleDelete(fb._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
