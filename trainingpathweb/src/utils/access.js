import axios from "axios";

export const post = async(urlAuth, body, config) => {
    try {
        console.log("post conexion");
        const res = await axios.post(urlAuth, body, config);
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const get = async(url, body, config) => {
    try {
        console.log("post conexion");
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["authorization"] = token;
    } else {
        delete axios.defaults.headers.common["authorization"];
    }
};