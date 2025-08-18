import app from "./src/app.js";
import config from "./src/config/config.js";
import { dbConnection, sequelize } from "./src/config/db.js";


const startServer = async () => {
  await dbConnection();
  const PORT = config.PORT || 8080;

  await sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Database connected!"))
    .catch((err) => console.error("❌ Sync error", err));

  app.listen(PORT, () => {
    console.log(`🔥 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
