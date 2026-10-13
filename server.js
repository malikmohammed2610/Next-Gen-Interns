require("dotenv").config();

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const flash = require("connect-flash");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");
app.use(helmet());
app.use(express.urlencoded({ extended: false, limit: "30kb" }));
app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-7",
  legacyHeaders: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  name: "ngi.sid",
  secret: process.env.SESSION_SECRET || "development-only-change-this-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 4 * 60 * 60 * 1000
  }
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.flashSuccess = req.flash("success");
  res.locals.flashError = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/internships", require("./routes/internships"));
app.use("/applications", require("./routes/applications"));
app.use("/plans", require("./routes/plans"));
app.use("/payments", require("./routes/payments"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));

app.get("/health", (req, res) => res.status(200).json({
  status: "ok",
  application: "Next Gen Interns"
}));

app.use((req, res) => res.status(404).render("errors/404", { title: "Page not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).render("errors/500", {
    title: "Something went wrong",
    message: process.env.NODE_ENV === "production"
      ? "Please try again later."
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Next Gen Interns running at http://localhost:${PORT}`);
});

module.exports = app;
