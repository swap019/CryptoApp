import React, { useEffect, useState } from 'react';
import axios from "axios";
import { server } from '../index';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { Input } from "antd";
import "../app.css";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
        (searchTerm.length !== 0) ? setExchanges(filteredData) : setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchExchanges();
  }, [searchTerm]);

  if (error)
    return <ErrorComponent message={"Error Fetching Data"} />;

  return (
    <div className='exchange-page'>
      <Container>
        <div className="search-exchange">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </Container>
      <Container maxW={"container.xl"}>
        {loading ? <Loader /> : (
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {exchanges.map((i) => (
              <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
            ))}
          </HStack>
        )}
      </Container>
    </div>
  );
};

const ExchangeCard = ({ id, name, img, rank, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} bgColor={"gray.300"}
      transition={"all 0.3s"} m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.06)",
          boxShadow: "0",
          filter: "drop-shadow(10px 10px 20px grey)"
        }
      }}>
      <Image src={img} w={'10'} h={"10"} objectFit={"contain"} alt={"Exchange"} />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>
        {name}
      </Text>
    </VStack>
  </a>
);

export default Exchanges;
