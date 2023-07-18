import React, { useEffect, useState } from 'react'
import axios from "axios";
import { server } from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from './CoinCard';
import {Input} from "antd";
import "../app.css"

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [searchTerm, setSearchTerm] = useState('');
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
        setCoins(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }

    };
    fetchCoins();
  }, [currency, page ,searchTerm]);

  if (error)
    return <ErrorComponent message={"Error Fetching Data"} />

  return (
    <div className='exchange-page'>
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : (
        <>
        <Container>
        <div className="search-exchange">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        </Container>
          <RadioGroup value={currency} onChange={setCurrency} color={"whiteAlpha.900"}>
            <HStack spacing={"4"} padding={"8"} borderTop={"10vh"}>
              <Radio value={"inr"} >
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
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {
              coins.map((i) => (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              ))
            }
          </HStack>
          {
            (searchTerm.length>1)?<></> :<HStack w={"full"} overflowX={"auto"} padding={"8"}>
            {
              btns.map((item, index) => (
                <Button
                  onClick={() => changePage(index + 1)}
                  colorScheme="blue">
                  {index + 1}
                </Button>
              ))
            }
          </HStack>
          }

        </>
      )}
    </Container>
    </div>
  )
}

export default Coins;
