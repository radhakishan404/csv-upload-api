import customerSchema from "../../models/customer.model.js";

const readCustomer = async (
    find = {},
    select = {},
    sort = {},
    page = 0,
    limit = 10,
) => {
    try {
        const result = await customerSchema
            .find(find)
            .select(select)
            .sort(sort)
            .skip(page * limit)
            .limit(limit);

        const count = await customerSchema.countDocuments(find);

        return { result, count };
    } catch (error) {
        throw new Error(error);
    }
};

const createCustomer = async (bulkData) => {
    try {
        const result = await customerSchema.insertMany(bulkData);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    readCustomer,
    createCustomer,
}