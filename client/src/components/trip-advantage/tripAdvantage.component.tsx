import * as React from "react"
import { IAdvantage } from "../../types/trip"
import { Text, Box, Flex, Heading } from "@chakra-ui/react"

type TripAdvantageProps = {
  advantage: IAdvantage,
  number: number,
}

export const TripAdvantage: React.FC<React.PropsWithChildren<TripAdvantageProps>> = (props) => (
  <Flex>
      {props.children}  
      <Box marginLeft='4'>
        <Heading size='lg' fontWeight='normal' color='blackAlpha.700'>{props.advantage.title}</Heading>
        <Text>{props.advantage.description}</Text>
      </Box>
  </Flex>
)
