import mongoose from "mongoose";

/**
 * 🩺 Application Health Check Controller
 * -------------------------------------
 * ✔ MongoDB status
 * ✔ Server uptime
 * ✔ Memory usage
 * ✔ Environment
 * ✔ Safe for Vercel / Serverless
 */

export const checkHealth = async (req, res) => {
  try {
    // MongoDB connection state mapping
    const dbStates = {
      0: "Disconnected ❌",
      1: "Connected ✅",
      2: "Connecting ⏳",
      3: "Disconnecting ⚠️"
    };

    const dbStateCode = mongoose.connection.readyState;
    const dbStatus = dbStates[dbStateCode] || "Unknown ❓";

    // Human readable uptime
    const uptimeSeconds = process.uptime();
    const uptime = {
      seconds: uptimeSeconds.toFixed(0),
      minutes: (uptimeSeconds / 60).toFixed(2),
      hours: (uptimeSeconds / 3600).toFixed(2)
    };

    const healthData = {
      status: "OK",
      service: "AlinGo Super App",
      version: process.env.APP_VERSION || "1.0.0",
      serverTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",

      database: {
        state: dbStateCode,
        status: dbStatus,
        name: mongoose.connection.name || "N/A",
        host: mongoose.connection.host || "N/A"
      },

      uptime,
      memory: {
        heapUsedMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        heapTotalMB: (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2),
        rssMB: (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
      }
    };

    return res.status(200).json(healthData);
  } catch (error) {
    console.error("❌ Health Check Failed:", error.message);

    return res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message
    });
  }
};
