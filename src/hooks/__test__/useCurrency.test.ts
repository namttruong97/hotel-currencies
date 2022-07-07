import { renderHook } from '@testing-library/react-hooks';
import useCurrency from 'hooks/useCurrency';

describe('Testing useCurrency', () => {
  it('should return rounding value - DOWN', () => {
    const myFuncComp = renderHook(() => useCurrency());
    const roundingValue = myFuncComp.result.current.getRounding(507.28);
    expect(roundingValue).toEqual('USD 507');
  });

  it('should return rounding value - UP', () => {
    const myFuncComp = renderHook(() => useCurrency());
    const roundingValue = myFuncComp.result.current.getRounding(507.82);
    expect(roundingValue).toEqual('USD 508');
  });

  it('should return rounding only number - DOWN', () => {
    const myFuncComp = renderHook(() => useCurrency());
    const roundingValue = myFuncComp.result.current.getRoundingNumber(507.12);
    expect(roundingValue).toEqual('507');
  });

  it('should return rounding only number - UP', () => {
    const myFuncComp = renderHook(() => useCurrency());
    const roundingValue = myFuncComp.result.current.getRoundingNumber(507.88);
    expect(roundingValue).toEqual('508');
  });
});
