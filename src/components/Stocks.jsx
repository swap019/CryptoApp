import React, { useEffect, useState } from 'react';
import axios from "axios";
import { server2, API_KEY } from '../index';
import { Container, HStack, Button, VStack, Input, Box, List, ListItem } from '@chakra-ui/react';
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Searchbar from './Searchbar';

const Coins = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [submitForm, setSubmitForm] = useState(false);
    const [results, setResults] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [stock, setStock] =useState([]);
    const [symbol,setSymbol] = useState('symbol');
    console.log(results);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitForm(true);
    }
    const handleOptionClick = (name) => {
      setSelectedName(name["2. name"]);
      setSymbol(name["1. symbol"]);
      setResults([]); // Close the search list
    };
    useEffect(() => {
        const fetchStock = async () => {
            try {
                const { data } = await axios.get(`${server2}query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=D50105FEH9ECZR97`);
                console.log(data);
                setStock(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };
        if (submitForm) {
            fetchStock();
            setSubmitForm(false);
        }
        fetchStock();
    }, [submitForm]);

    if (error)
        return <ErrorComponent message={"Error Fetching Data"} />

    return (
        <Container maxW={"container.xl"}>
            {loading ? <Loader /> : (
                <>
                    <VStack>
                    <Searchbar setResults={setResults} setSelectedName={setSelectedName} selectedName={selectedName} />
                        
                        <SearchResultList results={results} onOptionClick={handleOptionClick} />
                        <Button onClick={handleSubmit}>Submit Form</Button>
                    </VStack>
                    <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                        {/* Render coins */}
                    </HStack>

                </>
            )}
        </Container>
    );
}

export default Coins;

const SearchResultList = ({ results,onOptionClick }) => {
  return (
    <List overflowY="scroll" maxH="300" w="50%">
      {results &&
        results.map((result, id) => {
          return (
            <ListItem
              css={{
                "&:hover": {
                  backgroundColor: "#f2f2f2",
                  cursor: "pointer"
                }
              }}
              key={id}
               onClick={(e) => onOptionClick(result)}
            >
              {result["2. name"]} {/* Display only the name property */}
            </ListItem>
          );
        })}
    </List>
  );
};
