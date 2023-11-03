export interface IAdvantage {
    title: string;
    description: string;
}

export interface ITrip {
    id: number;
    photoUrl: string;
    title: string;
    subtitle: string;
    countries: string[];
    days: number;
    co2kilograms: number;
    rating: number;
    description: string;
    advantages: IAdvantage[];
}

export type TripState = {
    trips: ITrip[];
    setTrips: (trips: ITrip[]) => void;
    selectedTrip?: ITrip;
    setSelectedTrip: (trip: ITrip) => void;
};