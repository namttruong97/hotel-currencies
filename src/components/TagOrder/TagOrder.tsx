import { OrderTagType, orderTagAtom } from 'store/orderTagAtom';

import { Tag } from 'antd';
import { useAtom } from 'jotai';

const { CheckableTag } = Tag;

const tagsData: OrderTagType[] = [
  {
    label: 'Top reviewed',
    key: 'rating',
    direction: 'desc',
  },
  {
    label: 'Stars (highest first)',
    key: 'stars',
    direction: 'desc',
  },
  {
    label: 'Stars (lowest first)',
    key: 'stars',
    direction: 'asc',
  },
  {
    label: 'Price (highest first)',
    key: 'price',
    direction: 'desc',
  },
  {
    label: 'Price (lowest first)',
    key: 'price',
    direction: 'asc',
  },
];

const TagOrder = () => {
  const [orderTag, setOrderTag] = useAtom(orderTagAtom);

  return (
    <>
      {tagsData.map((tag) => (
        <CheckableTag
          key={tag.label}
          checked={orderTag.label === tag.label}
          onChange={() => {
            setOrderTag(tag);
          }}
          style={{ border: '1px solid #c5c5c5' }}
        >
          {tag.label}
        </CheckableTag>
      ))}
    </>
  );
};

export default TagOrder;
