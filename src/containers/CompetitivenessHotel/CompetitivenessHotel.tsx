import backgroundImage from 'assets/background.jpeg';
import { HotelDataType } from 'model/hotel.model';
import { PriceDataType } from 'model/price.model';
import { currencyAtom } from 'store/currencyAtom';
import { orderTagAtom } from 'store/orderTagAtom';

import { Card, Col, Empty, Row, Spin } from 'antd';
import { useAtom } from 'jotai';
import lodash from 'lodash';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getListInfoHotel, getListPriceHotel } from 'services/hotel';

import Header from 'components/Header/Header';
import HotelCard from 'components/HotelCard/HotelCard';
import TagOrder from 'components/TagOrder/TagOrder';

const CompetitivenessHotel = () => {
  const [orderTag] = useAtom(orderTagAtom);
  const [currency] = useAtom(currencyAtom);

  const {
    data: listInfoHotel,
    isLoading: isLoadingInfoHotel,
    isFetched,
  } = useQuery<HotelDataType[], Error>('getListHotel', () => getListInfoHotel(), {
    refetchOnWindowFocus: false,
  });

  const { data: listPriceHotel, isLoading: isLoadingCurrency } = useQuery<PriceDataType[], Error>(
    ['getListHotel', currency],
    () => getListPriceHotel(currency),
    {
      refetchOnWindowFocus: false,
    },
  );

  const renderListHotel = () => {
    if (isFetched && lodash.isEmpty(listInfoHotel)) {
      return <Empty />;
    }

    // Include field price into hotel info to support sorting
    const mappedListHotel = listInfoHotel?.map((item) => {
      const dataPrice = listPriceHotel?.find((price) => item.id === price.id);
      return { ...item, price: dataPrice?.price };
    });

    const orderedListHotel = lodash.orderBy(
      mappedListHotel,
      `${orderTag.key}`,
      `${orderTag.direction}`,
    );

    const result = orderedListHotel.map((hotel, index) => {
      const dataPrice = listPriceHotel?.find((item) => item.id === hotel.id);
      return <HotelCard info={hotel} key={index} priceInfo={dataPrice} />;
    });

    return result;
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />

      <Row style={{ paddingRight: 64, paddingLeft: 64, marginBottom: 50 }} gutter={[32, 32]}>
        <Col xl={9} xxl={10} style={{ maxHeight: '85vh' }}>
          <Image
            src={backgroundImage}
            alt="Picture of the hotel"
            style={{ borderRadius: 20 }}
            layout="fill"
            objectFit="cover"
            priority
          />
        </Col>

        <Col xl={15} xxl={14}>
          <Spin spinning={isLoadingInfoHotel || isLoadingCurrency}>
            <Card style={{ borderRadius: 20 }}>
              <TagOrder />
              <div style={{ overflow: 'auto' }}>{renderListHotel()}</div>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default CompetitivenessHotel;
