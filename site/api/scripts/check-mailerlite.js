require("dotenv").config();

function isRealEnvValue(value) {
  return Boolean(value) && !/PASTE|YOUR|HERE/i.test(value);
}

function normalizeMailerLiteToken(token) {
  return token.trim().replace(/^Bearer\s+/i, "");
}

async function main() {
  const token = normalizeMailerLiteToken(process.env.MAILERLITE_API_TOKEN || "");
  const groupId = (process.env.MAILERLITE_GROUP_ID || "").trim();

  if (!isRealEnvValue(token)) {
    console.log("MailerLite token is not configured yet. Add MAILERLITE_API_TOKEN to site/api/.env.");
    process.exitCode = 1;
    return;
  }

  const response = await fetch("https://connect.mailerlite.com/api/groups?limit=1000", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.log(`MailerLite token check failed with status ${response.status}.`);
    process.exitCode = 1;
    return;
  }

  if (!isRealEnvValue(groupId)) {
    const groups = Array.isArray(data.data) ? data.data : [];
    console.log("MailerLite token works. Add one of these group ids to MAILERLITE_GROUP_ID:");
    groups.forEach((group) => {
      console.log(`- ${group.name}: ${group.id}`);
    });
    process.exitCode = 1;
    return;
  }

  const group = Array.isArray(data.data)
    ? data.data.find((item) => String(item.id) === String(groupId))
    : null;

  if (!group) {
    console.log("MailerLite token works, but the configured group id was not found.");
    process.exitCode = 1;
    return;
  }

  console.log(`MailerLite is connected. Target group: ${group.name}`);
}

main().catch((error) => {
  console.log(`MailerLite check failed: ${error.message}`);
  process.exitCode = 1;
});
