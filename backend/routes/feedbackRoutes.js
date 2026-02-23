// const express = require("express");
// const router = express.Router();
// const Feedback = require("../models/Feedback");
// const verifyToken = require("../middleware/authMiddleware");

// // CREATE feedback (protected)
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const feedback = new Feedback({
//       ...req.body,
//       user: req.userId // optionally store which user posted it
//     });
//     const saved = await feedback.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET all feedback (public, or can make protected)
// router.get("/", async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
//     res.json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE feedback (protected)
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     await Feedback.findByIdAndDelete(req.params.id);
//     res.json({ message: "Feedback deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getAllFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.post("/", createFeedback);
router.get("/", getAllFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;