import { Container, Box, RadioGroup, HStack, Radio, VStack, Text, Image, Stack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Params, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index'
import ErrorComponent from './ErrorComponent';
import MyChart from './MyChart';



const CoinDetails = () => {

  const [coin, setCoin] = useState("inr");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartstates = (key) => {

    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:

        break;
    }
  }
  const params = useParams();
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        //console.log(data);
        //fetching chart data
        const { data: chartdata } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        setChartArray(chartdata.prices);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }

    };
    fetchCoins();
  }, [params.id, currency, days]);

  if (error)
    return <ErrorComponent message={"Error Fetching Data"} />

  return (
    <Container maxWidth={"container.xl"}>
      {
        loading ? <Loader /> : (
          <>

            <Box w={"full"} borderWidth={1}>
              <MyChart currency={currencySymbol} arr={chartArray} days={days} />
            </Box>
            <HStack p={"4"} overflowX={"auto"}>
              {
                btns.map((i) => (
                  <Button key={i} onClick={() => switchChartstates(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack spacing={"4"} >
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
                objectFit={"contain"} />
              <Stat>

                <StatLabel>
                  {coin.name}
                </StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0
                    ? "increase" :
                    "decrease"} />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"} rounded={"md"} px="3"
              >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomBar
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} />

              <Box w={"full"} p="4">
                <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulationg Supply"} value={coin.market_data.circulating_supply} />
                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>
            </VStack>

          </>
        )
      }
    </Container>
  )
}


const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>
      {value}
    </Text>
  </HStack>
)

const CustomBar = ({ low, high }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text>24H Range</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)
export default CoinDetails
