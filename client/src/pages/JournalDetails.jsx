import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../axios";

export default function JournalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/journals/${id}`)
      .then((res) => {
        setEntry(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Entry not found");
        navigate("/");
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (confirm) {
      try {
        await API.delete(`/journals/${id}`);
        navigate("/");
      } catch {
        alert("Failed to delete");
      }
    }
  };

  if (loading) return <p className="text-center p-4 text-gray-300">Loading...</p>;
  if (!entry) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">
          {entry.title}
        </h2>

        <p className="text-gray-400 text-sm mb-1">
          {new Date(entry.date || entry.createdAt).toLocaleDateString()}{" "}
          {entry.time && `at ${entry.time}`} •{" "}
          <span className="text-lg">{entry.mood}</span>
        </p>

        {entry.tags.length > 0 && (
          <p className="text-sm text-purple-300 mb-4">
            #{entry.tags.join(" #")}
          </p>
        )}

        <p className="text-gray-200 whitespace-pre-wrap mb-6">{entry.content}</p>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Link
            to={`/edit/${entry._id}`}
            className="text-center bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <i className="fa-solid fa-trash"></i> Delete
          </button>
          <Link
            to="/"
            className="text-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
