import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { API_KEY } from '..';

const Searchbar = ({ setResults, setSelectedName ,selectedName}) => {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        const { bestMatches } = json;
        setResults(bestMatches);
        //console.log(bestMatches);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    fetchData(value);
  };

  return (
    <div>
      <Input
        type="text"
        value={input}
        placeholder="Type here"
        onChange={handleChange}
      />
      {selectedName && <p>Selected name: {selectedName}</p>}
    </div>
  );
};

export default Searchbar;

