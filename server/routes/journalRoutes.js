const express = require("express");
const router = express.Router();
const {
  createEntry,
  getMyEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  filterEntries
} = require("../controllers/journalController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createEntry);
router.get("/", protect, getMyEntries);
router.get("/filter", protect, filterEntries);
router.get("/:id", protect, getEntryById);
router.put("/:id", protect, updateEntry);
router.delete("/:id", protect, deleteEntry);

module.exports = router;
