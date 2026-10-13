require("dotenv").config();
const bcrypt = require("bcryptjs");
const { getPool } = require("../config/database");

(async () => {
  const [fullName, email, password] = process.argv.slice(2);
  if (!fullName || !email || !password || password.length < 12) {
    console.error('Usage: node scripts/create-admin.js "Admin Name" admin@example.com "A-Strong-Password-12+"');
    console.error("Use a unique password of at least 12 characters.");
    process.exit(1);
  }

  try {
    const pool = getPool();
    const normalizedEmail = email.trim().toLowerCase();
    const [existing] = await pool.execute("SELECT id, role FROM users WHERE email = ?", [normalizedEmail]);

    if (existing.length) {
      console.error("That email already exists. This script will not change an existing account.");
      process.exitCode = 1;
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await pool.execute(
      "INSERT INTO users (full_name, email, password_hash, role, status) VALUES (?, ?, ?, 'admin', 'active')",
      [fullName.trim(), normalizedEmail, passwordHash]
    );
    console.log("✅ Admin account created. Sign in at http://localhost:3000/admin/login");
  } catch (error) {
    console.error("❌ Could not create admin:", error.message);
    process.exitCode = 1;
  } finally {
    // Close the pool so the command exits cleanly.
    try { await getPool().end(); } catch (_) {}
  }
})();
