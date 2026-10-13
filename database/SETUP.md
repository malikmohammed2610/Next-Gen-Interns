# MySQL setup (Windows)

1. Start the MySQL Server service.
2. Open MySQL Workbench and connect as `root`.
3. Open `schema.sql`, execute the whole script, and check for errors.
4. Open a new SQL query tab and create a restricted app user. Replace the password placeholder:

```sql
CREATE USER 'ngi_app'@'localhost' IDENTIFIED BY 'REPLACE_WITH_A_STRONG_UNIQUE_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON next_gen_interns.* TO 'ngi_app'@'localhost';
FLUSH PRIVILEGES;
```

5. Execute `seed.sql` to insert the Gold, Diamond and Platinum plan records.
6. Copy the root `.env.example` file to `.env`. Set `DB_USER=ngi_app`, `DB_PASSWORD` to the same password used above, and create a long random `SESSION_SECRET`.
7. In the project terminal, run `npm run db:test`.
8. Create an admin using a unique password of at least 12 characters:

```powershell
node scripts/create-admin.js "Platform Admin" "admin@example.com" "Replace-With-A-Unique-12-Character-Password"
```

Use your own admin email and password. Do not share them or commit `.env`.

The schema intentionally inserts no internship listings as verified. Verify employer identity and role details before an admin publishes any listing. Real payments are not enabled until the separate payment integration step.
