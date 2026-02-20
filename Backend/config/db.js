const mongoose = require("mongoose");
const dns = require('dns');

// Workaround: c-ares (used by Node's dns.resolve*) can get ECONNREFUSED
// in some network / resolver setups. Set explicit public DNS servers so
// Node's resolver can reach SRV and A records for Atlas.
dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("Using DNS servers:", dns.getServers());

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MongoDB Connection Failed ❌ — MONGO_URI is not set in environment");
    process.exit(1);
  }

  // Mask credentials for logging
  const masked = uri.replace(/\/\/([^@]+)@/, "//<credentials>@");
  console.log(`Connecting to MongoDB: ${masked}`);

  try {
    // Newer MongoDB drivers no longer accept `useNewUrlParser` / `useUnifiedTopology`.
    // Let mongoose use its defaults; pass no deprecated driver options.
    await mongoose.connect(uri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌");
    console.error(error.stack || error);
    process.exit(1);
  }
};

module.exports = connectDB;
