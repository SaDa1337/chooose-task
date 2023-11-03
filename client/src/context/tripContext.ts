import * as React from 'react';
import { TripState } from '../types/trip';

export const TripContext = React.createContext<TripState | null>(null);

// const TripProvider: React.FC<React.ReactNode> = ({children}) => {

//     const [trips, setTrips] = React.useState<ITrip[]>([]);

//     const state = React.useMemo(
//         (): TripState => ({
//             trips,
//             setTrips,
//         }),
//         [trips],
//     );
//     return (<TripContext.Provider value={state}> {children} </TripContext.Provider>);
// };

// export default TripProvider;