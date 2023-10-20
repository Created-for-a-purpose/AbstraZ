import axios from "axios";

export default async function page(params) {
    const page = await axios.get("https://twitter.com/anert_03");
    return page.data;
};
