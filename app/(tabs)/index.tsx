import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FestivalList from "../components/FestivalList/FestivalList";
import SearchBar from "../components/SearchBar";
import { getAllFestivals } from "../services/events";
import { Festival } from "../types";

export default function Index() {
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const [displayedFests, setDisplayedFests] = useState<Festival[]>([]);
    const [search, setSearch] = useState<string>("");

    const fetchFestivals = async () => {
        const response = await getAllFestivals();
        setFestivals(response);
    };

    useEffect(() => {
        fetchFestivals();
    }, []);

    useEffect(() => {
        setDisplayedFests(
            festivals.filter((fest) =>
                fest.name?.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [search]);

    return (
        <SafeAreaView>
            <SearchBar setSearch={setSearch} />

            <FestivalList festivals={displayedFests} />
        </SafeAreaView>
    );
}
