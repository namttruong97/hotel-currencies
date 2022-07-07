import { RenderResult, fireEvent, render, screen } from '@testing-library/react';

import 'mock/matchMedia';

import Header from '../Header';

describe('<Header />', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<Header />);
  });

  it('should match snapshot', () => {
    expect(wrapper.getByTestId('Header__title')).toMatchSnapshot();
  });

  it('should render correct content', () => {
    expect(screen.getByTestId('Header__title').textContent).toEqual('Hotel Currencies');
    expect(screen.queryAllByTestId('Header__item')).toBeTruthy();
    expect(screen.queryAllByTestId('Header__item')).toHaveLength(3);
  });

  it('should clickable on select currency', () => {
    fireEvent(
      wrapper.getByTestId('Header__combobox'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const listbox = wrapper.queryByRole('combobox');
    expect(listbox).not.toBeNull();
  });
});
