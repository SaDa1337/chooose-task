import * as React from "react"
import { ITrip } from "../../types/trip"
import { Text, Button, Card, CardBody, Link as ChakraLink, Flex, Heading, Spacer, VStack } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import { Link as ReactRouterLink, generatePath } from 'react-router-dom'
import { formatWeight } from "../../lib/helpers"

type TripListTileProps = {
  trip: ITrip
}

export const TripListTile: React.FC<TripListTileProps> = (props) => (
  <Card p='0.5' bgColor='white' borderRadius='lg' data-testid="trip-tile">
    <CardBody>
      <VStack maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' backgroundImage={props.trip.photoUrl} p='5' color='white' minH='100%' minW='100%'>
        <Spacer minH='10px'></Spacer>

        <Heading size='lg' fontWeight='normal' textAlign='center'>{props.trip.title}</Heading>
        <Text>{props.trip.countries.length} Countries, {props.trip.days} days</Text>

        <Spacer minH='20px'></Spacer>
        <ChakraLink as={ReactRouterLink} to={generatePath('/details/:id', {id:props.trip.id.toString()})}>
        <Button backgroundColor='blue.400' borderRadius='lg' color='white' >Learn more</Button>

        </ChakraLink>
        <Spacer minH='20px'></Spacer>

        <Flex p='2' bgColor='#0d0b54'  borderRadius='lg' w='90%'>
          Emissions offset:
          <Spacer />
          <Text fontWeight='bold'>{formatWeight(props.trip.co2kilograms)} CO<sub>2</sub>e</Text>
        </Flex>

        <Flex bgColor='white' color='black' borderRadius='lg' fontWeight='bold' p='4' marginBottom='-7' w='90%'>
          Trip rating
          <Spacer />
          <Flex width={props.trip.rating*16+'px'} overflow='hidden' marginRight={2}>{[...Array(5).keys()]
            .map((number: number) => <StarIcon key={number} color='gold'></StarIcon> )
          }</Flex>
          {props.trip.rating}
        </Flex>

    </VStack>
    </CardBody>
  </Card>
)
