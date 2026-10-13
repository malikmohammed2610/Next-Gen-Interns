require("dotenv").config();
const { testConnection } = require("../config/database");

(async () => {
  try {
    await testConnection();
    console.log("✅ MySQL connection successful.");
    process.exitCode = 0;
  } catch (error) {
    console.error("❌ MySQL connection failed.");
    console.error(error.message);
    console.error("Check that MySQL is running and your .env credentials are correct.");
    process.exitCode = 1;
  }
})();
