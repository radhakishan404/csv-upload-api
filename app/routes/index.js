import express from "express";

const app = express();

import userRoutes from "../features/customer/customer.route.js";

app.use("/", userRoutes);

export default app;