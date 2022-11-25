import { responseSend } from "../../helpers/responseSend.js";
import { createCustomer, readCustomer } from "./customer.services.js";
import csv from "csvtojson";

const select_customer_details = ["id", "customerfirstname", "customerlastname", "createdAt"];

const addCustomer = async (req, res, next) => {
    try {
        let fileData = await csv().fromFile(req.file.path);

        let payload = [];
        for (var x = 0; x < fileData.length; x++) {
            payload.push({
                customerfirstname: fileData[x]["First Name"],
                customerlastname: fileData[x]["Last Name"],
            })
        }

        const customerData = await createCustomer(payload);
        if (!customerData) throw new Error("Something went wrong while register");

        responseSend(res, 201, "Customer Created Successfully", customerData);
    } catch (error) {
        next(error);
    }
};

const listCustomer = async (req, res, next) => {
    try {
        let where = { is_active: true };

        let page = req.query.page || 0;
        let perPage = req.query.perPage || 10;
        let sortField = req.query.sortField || "createdAt";
        let sortBy = req.query.sortBy || "DESC";

        if (req.query.search) {
            where = {
                ...where,
                $or: [
                    { customerfirstname: { $regex: '.*' + req.query.search + '.*' } },
                    { customerlastname: { $regex: '.*' + req.query.search + '.*' } },
                ]
            }
        }

        const customerData = await readCustomer(where, select_customer_details, { [sortField]: sortBy }, page, perPage);

        responseSend(res, 201, "Customer Data Fetched Successfully", customerData.result, customerData.count);
    } catch (error) {
        next(error);
    }
}

export {
    addCustomer,
    listCustomer,
}