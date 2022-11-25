import express from "express";
import { upload } from "../../middlewares/file.processing.js";
import { addCustomer, listCustomer } from "./customer.controller.js";

const router = express.Router();

router.get(
    "/customers",
    (req, res, next) => {
        listCustomer(req, res, next);
    }
)

router.post(
    "/customers",
    upload.single("file"),
    (req, res, next) => {
        addCustomer(req, res, next)
    }
)


export default router;