const submissionRepository = require("../repositories/submission.repository");

/* CREATE */
const createSubmission = async (req, res, next) => {
  try {
    const params = req.body;

    if (!params || typeof params !== "object" || Array.isArray(params)) {
      return res
        .status(400)
        .json({ error: "Request body must be a JSON object" });
    }

    if (Object.keys(params).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one parameter is required" });
    }

    // get client IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    // add IP to params
    params.ip = ip;

    const submission = await submissionRepository.create(params);

    res.status(201).json({
      message: "Parameters saved successfully",
      data: submission,
    });
  } catch (err) {
    next(err);
  }
};

/* GET ALL */
const getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await submissionRepository.findAll();

    res.status(200).json({
      message: "Submissions fetched successfully",
      data: submissions,
    });
  } catch (err) {
    next(err);
  }
};

/* GET BY ID */
const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const submission = await submissionRepository.findById(id);

    if (!submission) {
      return res.status(404).json({
        error: "Submission not found",
      });
    }

    res.status(200).json({
      message: "Submission fetched successfully",
      data: submission,
    });
  } catch (err) {
    next(err);
  }
};

/* UPDATE */
const updateSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const params = req.body;

    if (!params || typeof params !== "object" || Array.isArray(params)) {
      return res
        .status(400)
        .json({ error: "Request body must be a JSON object" });
    }

    if (Object.keys(params).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one parameter is required" });
    }

    const updated = await submissionRepository.update(id, params);

    if (!updated) {
      return res.status(404).json({
        error: "Submission not found",
      });
    }

    res.status(200).json({
      message: "Submission updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

/* DELETE */
const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await submissionRepository.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Submission not found",
      });
    }

    res.status(200).json({
      message: "Submission deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};
/* DELETE ALL */
const deleteAllSubmission = async (req, res, next) => {
  try {
    const result = await submissionRepository.removeAll();

    res.status(200).json({
      message: "All submissions deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  deleteAllSubmission,
};
