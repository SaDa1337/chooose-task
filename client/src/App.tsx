import {
  ChakraProvider,
  Container,
  theme,
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { TripContext } from "./context/tripContext";
import { ITrip, TripState } from "./types/trip";
import * as React from "react";
import { TripList } from "./views/trip-list/tripList.component";
import { TripDetails } from "./views/trip-details/tripDetails.component";

export const App = () => {
  const [trips, setTrips] = React.useState<ITrip[]>([]);
  const [selectedTrip, setSelectedTrip] = React.useState<ITrip>();

  const state = React.useMemo(
      (): TripState => ({
          trips,
          setTrips,
          selectedTrip,
          setSelectedTrip,
      }),
      [trips, selectedTrip],
  );

  return  (
    <ChakraProvider theme={theme}>
      <TripContext.Provider value={state}>
        <Container maxW='100%' bgColor='gray.100'>
          <Routes>     
            <Route index element={<TripList/>}/> 
            <Route path={'/details/:id'} element={<TripDetails/>}/> 
          </Routes>
        </Container>
      </TripContext.Provider>
    </ChakraProvider>
  )

}
