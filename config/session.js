// Session options are configured in server.js for this starter.
// Before production, use a persistent MySQL session store and rotate secrets.
module.exports = {
  name: "ngi.sid",
  maxAgeMs: 4 * 60 * 60 * 1000
};
