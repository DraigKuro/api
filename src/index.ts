import express from 'express';
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connectDB from "./config/db";

import restaurantRoutes from "./routes/restaurant";
import dishRoutes from "./routes/dish";
import drinkRoutes from "./routes/drink";
import menuRoutes from "./routes/menu";
import promotionRoutes from "./routes/promotion";
import tableRoutes from "./routes/table";
import incidenciaRoutes from "./routes/incidencia";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

connectDB();

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/restaurant", restaurantRoutes);
app.use("/dishes", dishRoutes);
app.use("/drinks", drinkRoutes);
app.use("/menus", menuRoutes);
app.use("/promotions", promotionRoutes);
app.use("/tables", tableRoutes);
app.use("/incidencias", incidenciaRoutes);

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
