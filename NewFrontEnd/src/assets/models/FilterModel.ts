import { RoomType } from '../constants';

export interface FilterModel {
  distance: string;
  roomType: RoomLiteralType[];
  priceMin: number;
  priceMax: number;
  earlyInterval: string;
  earlyMonth: string;
  lateInterval: string;
  lateMonth: string;
  stayPeriod: number;
  other: string[];
  facilities: string[];
}

export interface Preferences {
  female: boolean;
  male: boolean;
  lgbtq: boolean;
  parking: boolean;
  pets: boolean;
  privateBath: boolean;
  _420: boolean;
}

export type RoomLiteralType = keyof typeof RoomType;
export type PreferenceLiteralType = keyof Preferences;
