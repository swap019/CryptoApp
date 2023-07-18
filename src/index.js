import { ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import store from './app/store';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>

    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>

  </React.StrictMode>

);
export const API_KEY = `VWNEC9XA3U2FJZ0W`;
export const server = `https://api.coingecko.com/api/v3`
export const server2 = `https://www.alphavantage.co/`