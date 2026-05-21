const { Router } = require("express");
const {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  deleteAllSubmission,
} = require("../controllers/submission.controller");

const router = Router();

router.post("/create-submission", createSubmission);
router.get("/get-submissions", getAllSubmissions);
router.get("/get-submission/:id", getSubmissionById);
router.put("/update-submission/:id", updateSubmission);
router.delete("/delete-all-submissions", deleteAllSubmission);
router.delete("/delete-submission/:id", deleteSubmission);

module.exports = router;
