const { Router } = require("express");
const submissionRoutes = require("./submission.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/submissions", submissionRoutes);

module.exports = router;
