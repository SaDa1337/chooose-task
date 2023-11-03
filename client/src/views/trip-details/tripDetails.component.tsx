import * as React from "react"
import { IAdvantage, ITrip, TripState } from "../../types/trip"
import { Text, Icon, Card, CardBody, Link as ChakraLink, Flex, Heading, Image, ListItem, UnorderedList, Box, Divider, Spacer, SimpleGrid } from "@chakra-ui/react"
import { Link as ReactRouterLink } from 'react-router-dom'
import { TripContext } from "../../context/tripContext";
import { formatWeight } from "../../lib/helpers";
import { TripAdvantage } from "../../components/trip-advantage/tripAdvantage.component";
import { BsFlag } from 'react-icons/bs'
import { PiGlobeHemisphereEast } from 'react-icons/pi'
import { LiaBriefcaseSolid } from 'react-icons/lia'
import { GoPeople } from 'react-icons/go'
import { httpClient } from "../../lib/httpClient";

export const TripDetails = () => {  
  const {selectedTrip, setSelectedTrip} = React.useContext(TripContext) as TripState;

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await httpClient().get<ITrip>('/single trip.json');
      if(selectedTrip==null || selectedTrip.id !== response.data.id) {
        setSelectedTrip(response.data);
      }
    }
  
    if(selectedTrip==null) {
      fetchData()
        .catch(console.error);
    }
  });

  const iconList: Map<number, React.ReactNode> = new Map([
    [0, <Icon boxSize={8} color='blackAlpha.700' as={BsFlag}></Icon>],
    [1, <Icon boxSize={8} color='blackAlpha.700' as={PiGlobeHemisphereEast}></Icon>],
    [2, <Icon boxSize={8} color='blackAlpha.700' as={LiaBriefcaseSolid}></Icon>],
    [3, <Icon boxSize={8} color='blackAlpha.700' as={GoPeople}></Icon>],
  ]);

  return selectedTrip == null 
  ? (<React.Fragment></React.Fragment>)
  : (
    <Box minH='100vh' minW='100%' paddingTop={2} paddingLeft={10} paddingRight={10} color='gray.400' data-testid="details-container">
      <ChakraLink as={ReactRouterLink} to='..' textDecoration='underline'>Go back</ChakraLink>

      <Heading size='lg' marginTop='12' fontWeight='bold' color='black'>{selectedTrip.title}</Heading>
      <Text marginBottom='6'>{selectedTrip.subtitle}</Text>

      <Flex color='gray.400' flexWrap='wrap-reverse'>
        <Box flex={10}>
          <Image src={selectedTrip.photoUrl} borderRadius='lg' w='100%'></Image>
          
          <Heading size='md' fontWeight='bold' color='blackAlpha.700' marginBottom='6' marginTop='6'>Overview</Heading>
          <SimpleGrid spacing={10} minChildWidth='330px'>
            {selectedTrip.advantages
              .map((advantage:IAdvantage, index: number)=>
              <TripAdvantage advantage={advantage} number={index+1} key={index}>
                {iconList.get(index)}
              </TripAdvantage>)}
            </SimpleGrid>

            <Divider marginTop={15} marginBottom={15}></Divider>

            <Box color='blackAlpha.700' marginBottom={15}>{selectedTrip.description}</Box>
        </Box>
        <Spacer></Spacer>
        <Box marginBottom={15}>
          <Card p={4} borderRadius='lg'>
            <CardBody  color='gray.400'>
              <Heading size='lg' fontWeight='bold' color='blackAlpha.700' marginBottom={2}>{selectedTrip.days} days</Heading>
              <Text fontWeight='bold'>Emissions: {formatWeight(selectedTrip.co2kilograms)} CO<sub>2</sub>e</Text>
              <Divider marginTop={15} marginBottom={15}></Divider>
              <b>Countries included:</b>
              <UnorderedList style={{columns: 2, columnGap: 80}}>
                {selectedTrip.countries.map((country: string) => <ListItem key={country}>{country}</ListItem>)}
              </UnorderedList>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}