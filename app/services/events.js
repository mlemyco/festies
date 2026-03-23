import axios from "axios";
import festivalsData from "../data/festivals.json";

const API_URL = process.env.EXPO_PUBLIC_EDMTRAIN_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_EDMTRAIN_API_KEY;

const USE_CACHE = true;

export const getAllFestivals = async () => {
    if (USE_CACHE) {
        console.log("Using cache to retrieve all festivals.");
        return festivalsData;
    }

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
    if (USE_CACHE) {
        console.log(`Using cache to retrieve festival from id: ${id}.`);

        const festivalsWithId = festivalsData.find(
            (festival) => festival.id === Number(id),
        );
        return festivalsWithId;
    }

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
    if (USE_CACHE) {
        console.log(`Using cache to retrieve festival from name: ${name}.`);

        const festivalsWithName = festivalsData.filter(
            (festival) => festival.name === name,
        );
        return festivalsWithName;
    }

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
