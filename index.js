"use strict";

import connectDB from "./app/config/database.js";
import express from "express";
import bodyParser from "body-parser";


// Internal Dependencies
import { responseSend } from "./app/helpers/responseSend.js";

// All routes
import allRoutes from "./app/routes/index.js";

const port = process.env.PORT || 4000;

const app = express();
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
connectDB();

// app.use(morgan("dev"));

// app.use('/public', express.static(path.join(__dirname, "public")));

app.use("/", allRoutes);

// After Processing
app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }
    console.log(error, "error");
    responseSend(res, 406, error.message);
});

// Server Connection
app.listen(port, () => {
    console.log("== Server running on Port ==", port);
});