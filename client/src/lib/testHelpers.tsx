import { ChakraProvider, theme } from "@chakra-ui/react"
import * as React from "react"
import { TripState } from "../types/trip"
import { TripContext } from "../context/tripContext";
import { BrowserRouter } from "react-router-dom";



export const renderWithState = (Component: React.ReactNode, state: TripState): React.ReactElement => {
    return (
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <TripContext.Provider value={state}>
                    {Component}
                </TripContext.Provider>
            </ChakraProvider>
        </BrowserRouter>
    );
};

export const mockState: TripState = {
    trips: [],
    setTrips: jest.fn(),
    selectedTrip: undefined,
    setSelectedTrip: jest.fn(),
}