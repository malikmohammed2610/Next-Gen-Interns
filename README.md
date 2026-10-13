# Next Gen Interns

A Node.js + Express + EJS foundation for a professional fresher internship platform.

## Requirements
- Node.js 20+
- MySQL 8+ (database setup comes in the next setup step)

## Install
1. Open this folder in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and create a long random `SESSION_SECRET`.
4. Configure MySQL credentials after completing the database setup step.
5. Run `npm run dev`.
6. Visit http://localhost:3000.

## Project areas
- `config/`: database and session configuration
- `controllers/`: request handlers
- `middleware/`: access control and errors
- `routes/`: URL routes
- `services/`: payment, email, audit and verification helpers
- `views/`: EJS pages
- `public/`: CSS, JavaScript and images
- `database/`: SQL schema and development seed data
- `tests/`: basic automated tests

## Important safety notes
- This scaffold does not yet collect real payments.
- Never put payment secrets in frontend JavaScript or commit `.env`.
- Internship verification is an admin review workflow, not a claim that an opportunity has been independently verified already.
- Configure secure production sessions, HTTPS, backups, email delivery, and payment webhooks before launch.
