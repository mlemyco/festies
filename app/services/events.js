import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getAllFestivals = async () => {
    return axios
        .get(`${API_URL}/events?festivalInd=true&client=${API_KEY}`)
        .then((response) => {
            if (response.data.success) {
                return response.data.data;
            } else {
                console.error("Failure retrieving all festivals");
            }
        })
        .catch((error) => {
            console.error(error);
            throw new Error("Error retrieving all festivals");
        });
};

export const getFestivalFromId = async (id) => {
    return axios
        .get(`${API_URL}/events?eventIds=${id}&client=${API_KEY}`)
        .then((response) => {
            if (response.data.success) {
                console.log(response.data.data[0]);
                return response.data.data[0];
            } else {
                console.error("Failure retrieving festival from id");
            }
        })
        .catch((error) => {
            console.error(error);
            throw new Error("Error retrieving festival from id");
        });
};

export const getFestivalEntriesFromName = async (name) => {
    const formattedUrl = encodeURI(
        `${API_URL}/events?eventName=${name}&client=${API_KEY}`,
    );

    return axios
        .get(formattedUrl)
        .then((response) => {
            if (response.data.success) {
                console.log(response.data.data);
                return response.data.data;
            } else {
                console.error("Failure retrieving festival from name");
            }
        })
        .catch((error) => {
            console.error(error);
            throw new Error("Error retrieving festival from name");
        });
};
