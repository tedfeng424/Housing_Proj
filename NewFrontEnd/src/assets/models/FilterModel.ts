import { roomTypeUnchosen } from '../icons/all';

export interface FilterModel {
  // TODO make a model for this and name it better
  distance: string;
  room_type: RoomLiteralType[];
  price_min: number;
  price_max: number;
  early_interval: string;
  early_month: string;
  late_interval: string;
  late_month: string;
  stay_period: number;
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
