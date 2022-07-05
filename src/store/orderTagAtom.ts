import { atom } from 'jotai';

export type OrderTagType = {
  label?: string;
  key: string;
  direction: 'desc' | 'asc';
};

const DEFAULT_TAG_ORDERED: OrderTagType = {
  label: 'Top reviewed',
  key: 'rating',
  direction: 'desc',
};

export const orderTagAtom = atom<OrderTagType>(DEFAULT_TAG_ORDERED);
