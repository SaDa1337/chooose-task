import * as React from "react"
import { TripContext } from "../../context/tripContext";
import { ITrip, TripState } from "../../types/trip";
import { TripListTile } from "../../components/trip-list-tile/tripListTile.component";
import { SimpleGrid } from "@chakra-ui/react";
import { executeRequestWithCache } from "../../lib/httpClient";
import InfiniteScroll from "react-infinite-scroll-component";
import { checkHashEquality } from "../../lib/helpers";

export const TripList = () => {  
  const {trips, setTrips} = React.useContext(TripContext) as TripState;

  const [loadedTrips, setLoadedTrips] = React.useState<ITrip[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await executeRequestWithCache<ITrip[]>('/trips.json');
      if(!(await checkHashEquality(trips, response))){
        setTrips(response);
      }
      setLoadedTrips(response.slice(0, 30));
    }
  
    fetchData()
      .catch(console.error);
  }, [trips, setTrips]);

    const loadMore = () => {
      setLoadedTrips([...loadedTrips.concat(trips.slice(loadedTrips.length, Math.min(trips.length, loadedTrips.length+30)))]);
    }
  
    const hasMore = ():boolean => {
      return loadedTrips.length < trips.length; 
    }
    return (
      <InfiniteScroll
        dataLength={loadedTrips.length}
        next={loadMore}
        hasMore={hasMore()} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
      <SimpleGrid spacing={10} minChildWidth='380px' data-testid="trip-tile-container">
      {loadedTrips.map((trip: ITrip) => {
          return <TripListTile key={trip.id} trip={trip} />;
      })}
      </SimpleGrid>
      </InfiniteScroll>
    );
}
