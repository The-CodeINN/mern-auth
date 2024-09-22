import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from './lib/QueryProvider.tsx';
import theme from './theme/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryProvider>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools position='right' initialIsOpen={false} />
        </BrowserRouter>
      </QueryProvider>
    </ChakraProvider>
  </StrictMode>
);
