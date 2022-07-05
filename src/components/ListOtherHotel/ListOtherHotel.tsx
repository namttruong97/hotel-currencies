import { BankOutlined } from '@ant-design/icons';
import useCurrency from 'hooks/useCurrency';

import { Divider, List } from 'antd';
import lodash from 'lodash';

interface IListOtherHotel {
  dataSource?: {
    [key: string]: number;
  };
}

const ListOtherHotel: React.FC<IListOtherHotel> = ({ dataSource }) => {
  const { getRounding } = useCurrency();
  if (lodash.isEmpty(dataSource)) {
    return null;
  }

  const mappedData = lodash.map(dataSource, function (value, name) {
    return {
      name,
      value,
    };
  });

  const orderData = lodash.orderBy(mappedData, 'value', 'desc');
  return (
    <>
      <Divider orientation="left">Another choice</Divider>
      <List
        itemLayout="horizontal"
        dataSource={orderData}
        size="small"
        renderItem={(item) => (
          <List.Item actions={[<>{getRounding(item.value)}</>]}>
            <span>
              <BankOutlined style={{ marginRight: 10 }} />
              {item.name}
            </span>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListOtherHotel;
