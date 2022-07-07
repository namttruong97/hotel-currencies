import 'antd/dist/antd.css';
import 'styles/globals.scss';
import 'styles/override.scss';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
