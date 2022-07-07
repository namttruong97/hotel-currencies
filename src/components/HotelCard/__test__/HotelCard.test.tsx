import { RenderResult, render } from '@testing-library/react';

import 'mock/matchMedia';

import HotelCard, { IHotelCard } from '../HotelCard';

const mockHotelCard: IHotelCard = {
  info: {
    id: 1,
    name: 'Hotel name',
    description: 'Hotel description',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    address: 'Hotel address',
    rating: 5,
    stars: 5,
  },
  priceInfo: {
    id: 5,
    price: 150,
  },
};

describe('<HotelCard />', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<HotelCard {...mockHotelCard} />);
  });

  it('should render fully content', () => {
    expect(wrapper.getByTestId('HotelCard__thumbnail')).toBeTruthy();
    expect(wrapper.getByTestId('HotelCard__name').textContent).toContain(mockHotelCard.info.name);
    expect(wrapper.getByTestId('HotelCard__rating').textContent).toContain(
      mockHotelCard.info.rating.toString()
    );
    expect(wrapper.getByTestId('HotelCard__description').textContent).toEqual(
      mockHotelCard.info.description + '...'
    );
    expect(document.querySelectorAll('.ant-rate-star-full')).toHaveLength(
      mockHotelCard.info.rating
    );
  });

  it('should not show max price', async () => {
    const mockHasNotPrice: IHotelCard = { ...mockHotelCard, priceInfo: { price: 0, id: 5 } };
    const wrapper = render(<HotelCard {...mockHasNotPrice} />);

    expect(wrapper.getByTestId('HotelCard__maxPrice')).toHaveStyle('visibility: hidden');
  });

  it('should not show percent discount', async () => {
    expect(wrapper.getByTestId('HotelCard__discount')).toHaveStyle('visibility: hidden');
  });

  it('should show percent discount when have other higher price', () => {
    const mockHasPercent: IHotelCard = {
      ...mockHotelCard,
      priceInfo: {
        price: 10,
        id: 5,
        competitors: {
          A: 200,
          B: 6,
        },
      },
    };
    const wrapper = render(<HotelCard {...mockHasPercent} />);
    expect(wrapper.queryAllByTestId('HotelCard__discount')[1]).toHaveStyle('visibility: visible');

    const percent = (10 / 200) * 100;
    expect(wrapper.queryAllByTestId('HotelCard__discount')[1].innerHTML).toContain(
      `${percent.toString()}% OFF TODAY`
    );
  });
});
