import useCurrency from 'hooks/useCurrency';
import { HotelDataType } from 'model/hotel.model';
import { PriceDataType } from 'model/price.model';

import { Card, Col, Rate, Row, Tag, Tooltip } from 'antd';
import lodash from 'lodash';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { MAX_LENGTH_DESCRIPTION } from 'utils/constant';
import { getPercent } from 'utils/helper';

import ListOtherHotel from 'components/ListOtherHotel/ListOtherHotel';

interface IHotelCard {
  info: HotelDataType;
  priceInfo?: PriceDataType;
}

const HotelCard: React.FC<IHotelCard> = ({ info, priceInfo }) => {
  const { getRounding, getRoundingNumber } = useCurrency();
  const getMostExpensivePrice = (): number => {
    const dataCompetitors = lodash.get(priceInfo, 'competitors', 0);
    if (typeof dataCompetitors === 'number') {
      return 0;
    }

    const result = lodash.max(Object.values(dataCompetitors));
    return result || 0;
  };

  const renderTaxesIncluded = () => {
    const dataTaxes = lodash.get(priceInfo, 'taxes_and_fees', null);
    if (lodash.isNil(dataTaxes)) {
      return null;
    }

    const TaxesDetail = (
      <div style={{ fontSize: 12 }}>
        <div>
          <div style={{ width: 60, display: 'inline-block' }}>Taxes:</div>{' '}
          {getRounding(dataTaxes.tax)}
        </div>
        <div>
          <div style={{ width: 60, display: 'inline-block' }}>Hotel fees:</div>{' '}
          {getRounding(dataTaxes.hotel_fees)}
        </div>
      </div>
    );

    return (
      <Tooltip title={TaxesDetail} color="orange" placement="bottom">
        <div style={{ color: 'grey', textAlign: 'right', fontSize: 11 }}>
          Includes taxes and fee
        </div>
      </Tooltip>
    );
  };

  const shouldShowMostExpensive = (price: number, maxPrice: number) => {
    if (maxPrice === 0 || getRoundingNumber(price) >= getRoundingNumber(maxPrice)) {
      return false;
    }
    return true;
  };

  const renderPriceInfo = () => {
    if (!priceInfo?.price) {
      return <div style={{ color: 'red', textAlign: 'right' }}>Rates unavailable</div>;
    }

    const mostExpensivePrice = getMostExpensivePrice();
    const percentDiscount = getPercent(priceInfo.price, mostExpensivePrice);

    return (
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontSize: 13,
            textDecoration: 'line-through',
            visibility: shouldShowMostExpensive(priceInfo.price, mostExpensivePrice)
              ? 'visible'
              : 'hidden',
          }}
        >
          <div
            style={{
              visibility: percentDiscount !== 0 ? 'visible' : 'hidden',
            }}
          >
            <Tag color="red" style={{ margin: 0, fontSize: 12 }}>
              {percentDiscount}% OFF TODAY
            </Tag>
          </div>
          {getRounding(mostExpensivePrice)}
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'red',
          }}
        >
          {getRounding(priceInfo.price)}
        </span>
        {renderTaxesIncluded()}
      </div>
    );
  };
  return (
    <Card
      size="small"
      style={{
        position: 'relative',
        marginBottom: '10px',
        marginTop: '10px',
        borderRadius: '10px',
        border: '1px solid #e5e5e5',
      }}
    >
      <Row>
        <Col span={6}>
          <Image
            src={info.photo}
            alt="image-hotel"
            loading="lazy"
            height={250}
            width={300}
            objectFit="cover"
            style={{ borderRadius: 8 }}
          />
        </Col>
        <Col span={18} style={{ paddingLeft: 16 }}>
          <Row>
            <Col flex="1 0 75%" style={{ marginBottom: 16 }}>
              <div style={{ color: '#0071c2', marginBottom: 0, lineHeight: 1, fontWeight: 700 }}>
                {info.name} <Rate disabled defaultValue={info.stars} />
              </div>
              <span style={{ fontSize: 12, color: 'grey' }}>{info.address}</span>
            </Col>
            <Col
              style={{
                height: 'fit-content',
                backgroundColor: '#0450B1',
                color: 'white',
                fontSize: 16,
                fontWeight: 700,
                padding: 8,
                borderRadius: 6,
                borderBottomLeftRadius: 0,
              }}
            >
              {info.rating}
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(info.description.slice(0, MAX_LENGTH_DESCRIPTION) + '...'),
                }}
              />
            </Col>
            <Col span={6}>{renderPriceInfo()}</Col>
          </Row>
          <Col>
            <ListOtherHotel dataSource={priceInfo?.competitors} />
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

export default HotelCard;
