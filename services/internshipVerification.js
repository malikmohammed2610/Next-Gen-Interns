/*
 * Admin review checklist. This helper does not independently verify employers.
 * Before publishing, an admin should validate the employer's identity, official
 * company domain/contact, internship description, stipend, and application URL.
 */
const REQUIRED_REVIEW_ITEMS = [
  "employer_identity_checked",
  "official_contact_checked",
  "role_and_tasks_reviewed",
  "stipend_and_duration_confirmed",
  "application_method_checked"
];

function reviewComplete(checklist = {}) {
  return REQUIRED_REVIEW_ITEMS.every((key) => checklist[key] === true);
}

module.exports = { REQUIRED_REVIEW_ITEMS, reviewComplete };
