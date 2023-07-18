import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import Coins from "./Coins"
import { useGetCryptosQuery } from '../services/cryptoApi';
//import Cryptocurrencies from './Cryptocurrencies';
//import News from './News';
import Loader from './Loader';
import { Center, Container } from '@chakra-ui/react';

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Container css={{ alignItems: "center" }} maxW={"container.xl"}>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row gutter={[32, 32]}>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
          <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
          <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
          <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
        </Row>
        <div className="home-heading-container">
          <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
          <Title level={3} className="show-more"><Link to="/coins">Show more</Link></Title>
        </div>
         
        <div className="home-heading-container">
          <Title level={2} className="home-title">Latest Crypto News</Title>
          <Title level={3}><Link to="/news">Show more</Link></Title>
        </div>
      </Container>


    </>
  );
};

export default Home;
