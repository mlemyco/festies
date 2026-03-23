import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FestivalList from "../components/FestivalList/FestivalList";
import SearchBar from "../components/SearchBar";
import { getAllFestivals } from "../services/events";
import { DisplayFestival, Festival } from "../types";
import { parseDate } from "../utils/_utils";

export default function Index() {
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const [displayedFests, setDisplayedFests] = useState<DisplayFestival[]>([]);
    const [search, setSearch] = useState<string>("");

    const fetchFestivals = async () => {
        const response = await getAllFestivals();
        setFestivals(response);
    };

    useEffect(() => {
        fetchFestivals();
    }, []);

    const getDisplayFests = () => {
        // Create map of festival name to list of entries
        const groupedFests = new Map<string, Festival[]>();
        festivals.forEach((fest) => {
            if (!groupedFests.has(fest.name)) {
                groupedFests.set(fest.name, []);
            }

            groupedFests.get(fest.name)?.push(fest);
        });

        // Get range of dates
        const displayFests: DisplayFestival[] = [];
        groupedFests.forEach((festList, festName) => {
            const sortedDates = festList
                .map((fest) => parseDate(fest.date))
                .sort((a, b) => a.getTime() - b.getTime());

            const startDate = sortedDates[0];
            const endDate = sortedDates[sortedDates.length - 1];

            // Combine ranges
            const ranges: Date[][] = [];
            let currentRange: Date[] = [];
            for (let i = 0; i < sortedDates.length; i++) {
                const currentDate = sortedDates[i];

                if (currentRange.length <= 0) {
                    currentRange.push(currentDate);
                    continue;
                }

                const prevDate = currentRange[currentRange.length - 1];
                const difference = Math.abs(
                    currentDate.getTime() - prevDate.getTime(),
                );
                const diffInDays = difference / (1000 * 60 * 60 * 24);

                // If the days are not consecutive, start a new range
                if (diffInDays > 1) {
                    ranges.push(currentRange);
                    currentRange = [];
                }

                currentRange.push(currentDate);
            }
            // Push the remaining dates
            if (currentRange.length) {
                ranges.push(currentRange);
            }

            // Format date ranges to be a string
            const rangesAsStrings: string[] = [];
            ranges.forEach((consecDates) => {
                const firstDate = consecDates[0];
                const lastDate = consecDates[consecDates.length - 1];

                let firstDateStr = firstDate.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                });
                let lastDateStr = lastDate.toLocaleDateString("default", {
                    day: "numeric",
                });

                if (firstDate === lastDate) {
                    rangesAsStrings.push(firstDateStr);
                } else {
                    // Check if first and last date are within same month or not
                    if (firstDate.getMonth() !== lastDate.getMonth()) {
                        lastDateStr = lastDate.toLocaleDateString("default", {
                            month: "long",
                            day: "numeric",
                        });
                    }

                    // Check if first and last date are within same year or not
                    if (firstDate.getFullYear() !== lastDate.getFullYear()) {
                        firstDateStr = firstDate.toLocaleDateString("default", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        });
                        lastDateStr = lastDate.toLocaleDateString("default", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        });
                    }

                    rangesAsStrings.push(`${firstDateStr}-${lastDateStr}`);
                }
            });

            const rangesAsFinalString = rangesAsStrings.join(", ");

            const firstEntry = festList[0];
            const newDisplayFest: DisplayFestival = {
                id: firstEntry.id,
                name: festName,
                startDate: startDate,
                endDate: endDate,
                dateRange: rangesAsFinalString,
                venue: firstEntry.venue,
            };

            displayFests.push(newDisplayFest);
        });

        // Sort festival list by start date first then end date
        displayFests.sort((a, b) => {
            const startDiff = a.startDate.getTime() - b.startDate.getTime();
            if (startDiff !== 0) {
                return startDiff;
            }
            return a.endDate.getTime() - b.endDate.getTime();
        });

        return displayFests;
    };

    useEffect(() => {
        const displayFests = getDisplayFests();

        setDisplayedFests(
            displayFests.filter((fest) =>
                fest.name?.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [festivals, search]);

    return (
        <SafeAreaView>
            <SearchBar setSearch={setSearch} />

            <FestivalList festivals={displayedFests} />
        </SafeAreaView>
    );
}
