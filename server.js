import app from "./src/app.js";
import config from "./src/config/config.js";
import { dbConnection, sequelize } from "./src/config/db.js";
import { syncPlansToDb } from "./src/controllers/subscriptionController.js";

const startServer = async () => {
  await dbConnection();
  const PORT = config.PORT || 8080;

  try {
    await sequelize.authenticate();
    console.log("✅Database connected!");
  } catch (err) {
    console.error("❌Connection error", err);
  }
  
  await syncPlansToDb();

  app.listen(PORT, () => {
    console.log(`🔥 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
