import { roomTypeUnchosen } from '../icons/all';

export interface FilterModel {
  // TODO make a model for this and name it better
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

export type RoomLiteralType = keyof typeof roomTypeUnchosen;
export type PreferenceLiteralType = keyof Preferences;
