import { GlobalOutlined, HomeOutlined } from '@ant-design/icons';

import { useEffect } from 'react';

import { Col, Row, Select, Space, Typography } from 'antd';
import { useAtom } from 'jotai';
import lodash from 'lodash';

import { DEFAULT_CURRENCY, currencyAtom } from 'store/currencyAtom';

const { Option } = Select;
const DATA_CURRENCIES = ['USD', 'SGD', 'CNY', 'KRW'];

const validCurrencyLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storageData = localStorage.getItem('currency');
    if (lodash.isNil(storageData) || !DATA_CURRENCIES.includes(storageData)) {
      return false;
    }
  }
  return true;
};

const Header = () => {
  const [currency, setCurrency] = useAtom(currencyAtom);

  useEffect(() => {
    const storageData = localStorage.getItem('currency');
    // Set default currency is USD if localStorage is not existed or not valid
    if (!storageData || !validCurrencyLocalStorage()) {
      localStorage.setItem('currency', DEFAULT_CURRENCY);
      setCurrency(DEFAULT_CURRENCY);
    } else {
      setCurrency(storageData);
    }
  }, [setCurrency]);

  const handleChangeCurrencies = (value: string) => {
    localStorage.setItem('currency', value);
    setCurrency(value);
  };

  return (
    <header>
      <Row style={{ padding: '16px 64px' }} justify="end">
        <Col span={8}>
          <Space align="center" style={{ cursor: 'pointer' }}>
            <HomeOutlined style={{ fontSize: 21 }} />
            <Typography.Title level={4} style={{ marginBottom: 0 }} data-testid="Header__title">
              Hotel Currencies
            </Typography.Title>
          </Space>
        </Col>

        <Col span={10} offset={6}>
          <Space size={55} style={{ width: '100%', justifyContent: 'right' }}>
            <Typography.Text type="secondary" data-testid="Header__item">
              About{' '}
            </Typography.Text>
            <Typography.Text type="secondary" data-testid="Header__item">
              Support
            </Typography.Text>
            <Typography.Text type="secondary" data-testid="Header__item">
              <GlobalOutlined style={{ marginRight: 5 }} />
              Language
            </Typography.Text>

            <Select
              value={currency}
              onChange={handleChangeCurrencies}
              data-testid="Header__combobox"
            >
              {DATA_CURRENCIES.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Space>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
