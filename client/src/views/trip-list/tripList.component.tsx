import * as React from "react"
import { TripContext } from "../../context/tripContext";
import { ITrip, TripState } from "../../types/trip";
import { TripListTile } from "../../components/trip-list-tile/tripListTile.component";
import { SimpleGrid } from "@chakra-ui/react";
import { httpClient } from "../../lib/httpClient";
import InfiniteScroll from "react-infinite-scroll-component";

export const TripList = () => {  
  const {trips, setTrips} = React.useContext(TripContext) as TripState;

  const [loadedTrips, setLoadedTrips] = React.useState<ITrip[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await httpClient().get<ITrip[]>('/trips.json');
      setTrips(response.data);
      setLoadedTrips(response.data.slice(0, 30));
    }
  
    if(trips == null || trips.length === 0){
      fetchData()
        .catch(console.error);
    }
    else{
      setLoadedTrips(trips.slice(0, 30));      
    }
  }, [trips, setTrips]);

  return React.useMemo(()=>{

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
    )
  }, [loadedTrips, trips]);
}
