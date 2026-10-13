


require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./config/db");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Basic security headers
app.use(helmet());

// Parse incoming form submissions and JSON
app.use(express.urlencoded({
    extended: false,
    limit: "20kb"
}));

app.use(express.json({
    limit: "20kb"
}));

// Serve public assets
app.use(express.static(path.join(__dirname, "public")));

// Limit repeated requests
app.use(
    "/",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 300,
        standardHeaders: "draft-7",
        legacyHeaders: false
    })
);

// Configure EJS for upcoming pages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Homepage
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0">
            <title>Next Gen Interns</title>
            <style>
                body {
                    margin: 0;
                    min-height: 100vh;
                    display: grid;
                    place-items: center;
                    background: #07111f;
                    color: #f3f6fc;
                    font-family: Arial, sans-serif;
                }
                main {
                    text-align: center;
                    padding: 32px;
                }
                h1 {
                    font-size: clamp(2.5rem, 7vw, 5rem);
                    margin-bottom: 12px;
                }
                span {
                    color: #64d9ff;
                }
                p {
                    color: #a9b7ca;
                    line-height: 1.8;
                }
            </style>
        </head>
        <body>
            <main>
                <h1>Next Gen <span>Interns</span></h1>
                <p>
                    Your next opportunity starts here.
                    <br>
                    The platform foundation is running.
                </p>
            </main>
        </body>
        </html>
    `);
});

// Application health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        application: "Next Gen Interns"
    });
});

// PostgreSQL connection health check
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                current_database() AS database,
                current_user AS database_user,
                NOW() AS server_time
        `);

        res.status(200).json({
            success: true,
            application: "Next Gen Interns",
            databaseConnected: true,
            database: result.rows[0].database,
            databaseUser: result.rows[0].database_user,
            serverTime: result.rows[0].server_time
        });
    } catch (error) {
        console.error(
            "PostgreSQL health check failed:",
            error.message
        );

        res.status(503).json({
            success: false,
            application: "Next Gen Interns",
            databaseConnected: false,
            message: "Database connection failed. Check PostgreSQL configuration."
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found.");
});

// Central error handler
app.use((err, req, res, next) => {
    console.error("Application error:", err.message);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).send("An unexpected error occurred.");
});

// Start server
const server = app.listen(PORT, () => {
    console.log(
        `Next Gen Interns running at http://localhost:${PORT}`
    );

    console.log(
        `Application health: http://localhost:${PORT}/health`
    );

    console.log(
        `Database health: http://localhost:${PORT}/api/health`
    );
});

// Graceful shutdown
async function shutdown() {
    console.log("Shutting down Next Gen Interns...");

    server.close(async () => {
        try {
            await pool.end();
            console.log("PostgreSQL connection pool closed.");
            process.exit(0);
        } catch (error) {
            console.error("Shutdown error:", error.message);
            process.exit(1);
        }
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
