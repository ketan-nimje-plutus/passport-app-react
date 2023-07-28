import { getData } from "../../http/http.class";

export const getChartData = async (url) => {
    return await getData(url, "");
}