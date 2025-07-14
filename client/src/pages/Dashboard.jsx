import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterEntries } from "../redux/journalSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { entries, loading } = useSelector((state) => state.journal);

  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");

  const handleFilter = () => {
    dispatch(filterEntries({ search, mood, tag, date }));
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
        Your Journal Entries
      </h2>

      {/* Filters Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-8 shadow-lg space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder=" Search keyword..."
            className="w-full px-3 py-2 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 ring-purple-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 ring-purple-500 outline-none"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">All Moods</option>
            <option value="Happy"> Happy</option>
            <option value="Sad"> Sad</option>
            <option value="Angry"> Angry</option>
            <option value="Neutral"> Neutral</option>
            <option value="Excited"> Excited</option>
          </select>
          <input
            type="text"
            placeholder="Tag"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-2 ring-purple-500 outline-none"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <input
            type="date"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 ring-purple-500 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="text-right pt-2">
          <button
            onClick={handleFilter}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            <i className="fa-solid fa-magnifying-glass"></i> Apply Filters
          </button>
        </div>
      </div>

      {/* Entries */}
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2"><i className="fa-solid fa-face-tired text-yellow-500"></i> Nothing here yet</p>
          <p className="text-sm text-gray-500">Try adjusting your filters or create a new entry.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow hover:shadow-purple-500/100 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {entry.title}
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(entry.date || entry.createdAt).toLocaleDateString()}
                  {entry.time ? ` at ${entry.time}` : ""} •{" "}
                  <span className="text-lg">{entry.mood}</span>
                </p>
                {entry.tags.length > 0 && (
                  <p className="text-sm text-purple-300 mb-2">
                    #{entry.tags.join(" #")}
                  </p>
                )}
                <p className="text-sm text-gray-300 line-clamp-3">
                  {entry.content}
                </p>
              </div>
              <div className="mt-4 text-right">
                <Link
                  to={`/entry/${entry._id}`}
                  className="text-purple-400 hover:underline text-sm"
                >
                  View Full Entry <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}


      <Link
        to="/new"
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white text-3xl px-4 py-2 rounded-full shadow-lg shadow-purple-500/30 md:hidden"
        title="New Entry"
      >
        <i className="fa-solid fa-plus"></i>
      </Link>
    </div>
  );
}
