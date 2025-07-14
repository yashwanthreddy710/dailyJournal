import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios";

export default function JournalEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Happy");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      API.get(`/journals/${id}`).then((res) => {
        const { title, content, mood, tags, date, time } = res.data;
        setTitle(title);
        setContent(content);
        setMood(mood);
        setTags(tags.join(", "));
        setDate(date?.slice(0, 10));
        setTime(time || "12:00");
      });
    } else {
      const now = new Date();
      setDate(now.toISOString().slice(0, 10));
      setTime(now.toTimeString().slice(0, 5));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entryData = {
      title,
      content,
      mood,
      date,
      time, 
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (isEditing) {
        await API.put(`/journals/${id}`, entryData);
      } else {
        await API.post("/journals", entryData);
      }
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
        {isEditing ? "Edit Entry" : "New Journal Entry"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl space-y-5"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-3 text-lg rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 ring-purple-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="What’s on your mind today?"
          className="w-full px-4 py-3 min-h-[150px] rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 ring-purple-500 outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Mood</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-800 text-white focus:ring-2 ring-purple-500 outline-none"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option>Happy</option>
              <option>Sad</option>
              <option>Angry</option>
              <option>Neutral</option>
              <option>Excited</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 rounded-lg bg-gray-800 text-white focus:ring-2 ring-purple-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Time</label>
            <input
              type="time"
              className="w-full p-2 rounded-lg bg-gray-800 text-white focus:ring-2 ring-purple-500 outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="e.g. gratitude, goals"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 ring-purple-500 outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="text-right pt-3">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-base font-medium rounded-xl transition"
          >
            {isEditing ? "Update Entry" : "Create Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}
