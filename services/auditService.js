const { getPool } = require("../config/database");

async function recordAudit({ actorId = null, action, entityType, entityId = null, details = null }) {
  await getPool().execute(
    "INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, details_json) VALUES (?, ?, ?, ?, ?)",
    [actorId, action, entityType, entityId, details ? JSON.stringify(details) : null]
  );
}

module.exports = { recordAudit };
