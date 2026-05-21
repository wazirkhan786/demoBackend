const { connectDB } = require("./config/db");
const app = require("./app");
const { port, nodeEnv } = require("./config/env");

const start = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port} (${nodeEnv})`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
