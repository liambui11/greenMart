import {get} from "../untils/request";

export const getProductList = async () => {
    const result = await get("products")
    return result;
}
