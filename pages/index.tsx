import CompetitivenessHotel from 'containers/CompetitivenessHotel/CompetitivenessHotel';

import Head from 'next/head';

export default function Homepage() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,700&display=swap"
          rel="stylesheet"
        />
        <title>Hotel Currencies</title>
      </Head>
      <div className="root">
        <CompetitivenessHotel />
      </div>
    </>
  );
}
