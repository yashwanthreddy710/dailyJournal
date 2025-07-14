const JournalEntry = require("../models/JournalEntry");

// Create a new journal entry
exports.createEntry = async (req, res) => {
  const { title, content, mood, tags, date, time } = req.body;

  if (!title || !content || !mood || !date || !time) {
    return res.status(400).json({ message: "Title, content, mood, date, and time are required" });
  }

  try {
    const entry = await JournalEntry.create({
      user: req.user.id,
      title,
      content,
      mood,
      tags,
      date,
      time,
    });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all journal entries for logged-in user
exports.getMyEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single entry by ID
exports.getEntryById = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an entry
exports.updateEntry = async (req, res) => {
  try {
    let entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Entry not found" });
    }

    const { title, content, mood, tags, date, time } = req.body;

    entry.title = title || entry.title;
    entry.content = content || entry.content;
    entry.mood = mood || entry.mood;
    entry.tags = tags || entry.tags;
    entry.date = date || entry.date;
    entry.time = time || entry.time;

    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an entry
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findById(req.params.id);
    if (!entry || entry.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await JournalEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Filter by mood, tag, date
exports.filterEntries = async (req, res) => {
  const { mood, tag, date, search } = req.query;
  let filter = { user: req.user.id };

  if (mood) filter.mood = mood;
  if (tag) filter.tags = tag;
  if (date) {
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    filter.date = { $gte: dayStart, $lte: dayEnd };
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const entries = await JournalEntry.find(filter).sort({ date: -1, time: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
