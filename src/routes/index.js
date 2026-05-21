const { Router } = require("express");
const submissionRoutes = require("./submission.routes");

const router = Router();

router.use("/submissions", submissionRoutes);

module.exports = router;
