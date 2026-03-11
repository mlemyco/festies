// interface Festival {
//     name: string;
//     startDate: Date;
//     endDate: Date;
//     city: string;
//     state?: string;
//     country: string;
//     tags: {
//         lineup: boolean;
//         "by day": boolean;
//         "set times": boolean;
//     };
// }

interface Venue {
    id: number;
    name: string;
    location: string;
    address: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface Artist {
    id: number;
    name: string;
    link: string;
    b2bInd: boolean;
}

interface Festival {
    id: number;
    link: string;
    name: string;
    ages: string;
    festivalInd: boolean;
    livestreamInd: boolean;
    electronicGenreInd: boolean;
    otherGenreInd: boolean;
    date: string;
    startTime: string;
    endTime: string;
    createdDate: string;
    venue: Venue;
    artistList: Artist[];
}

export type { Artist, Festival, Venue };
