import { atom } from 'jotai';

export const DEFAULT_CURRENCY = 'USD';

export const currencyAtom = atom<string>(DEFAULT_CURRENCY);
