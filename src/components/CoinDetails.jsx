import { Container, Box, RadioGroup, HStack, Radio, VStack, Text,Image, Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Params, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index'
import ErrorComponent from './ErrorComponent';


const CoinDetails = () => {

  const [coin, setCoin] = useState("inr");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const params = useParams();
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }

    };
    fetchCoins();
  }, [params.id]);

  if (error)
    return <ErrorComponent message={"Error Fetching Data"} />

  return (
    <Container>
      {
        loading ? <Loader /> : (
          <>

            <Box w={"full"} borderWidth={1}>
              asdas
            </Box>
            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack spacing={"4"} padding={"8"} borderTop={"10vh"}>
                <Radio value={"inr"}>
                  INR
                </Radio>
                <Radio value={"eur"} >
                  EUR
                </Radio>
                <Radio value={"usd"}>
                  USD
                </Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}
            alignSelf={"center"} opacity={0.7}>
              <Text fontSize={"small"}>
                Last Upadted on {Date(coin.last_updated).split("G")[0]}
              </Text>

              <Image src={coin.image.large} w={"16"} h={"16"}
              objectFit={"contain"}/>
              <Stat>

                <StatLabel>
                  {coin.name}
                </StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
              </Stat>
            </VStack>

          </>
        )
      }
    </Container>
  )
}

export default CoinDetails
