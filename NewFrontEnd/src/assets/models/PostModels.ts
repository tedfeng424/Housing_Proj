import { facilityToIcon } from '../../components/HouseProfile';

export interface HousePost {
  name: string;
  location: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  early: string;
  late: string;
  roomType: string;
  leaserName: string;
  leaserEmail: string;
  leaserPhone: string;
  leaserSchoolYear: string; // TODO number;
  leaserMajor: string;
  leaserIntro: string;
  photos: string[];
  profilePhoto: string;
  roomId: number;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
  negotiable: boolean;
  numBaths: string;
  numBeds: string;
}

export type HousePostDisplayedProperties = Omit<HousePost, 'roomId'>;

export interface CreateHousePostProperties
  extends Omit<
    HousePost,
    | 'leaserName'
    | 'leaserEmail'
    | 'leaserPhone'
    | 'leaserSchoolYear'
    | 'leaserMajor'
    | 'leaserIntro'
    | 'profilePhoto'
    | 'roomId'
    | 'photos' // change photos to be of File type
  > {
  photos: File[];
}

export type HousePostUserData = Pick<
  HousePost,
  | 'leaserName'
  | 'leaserEmail'
  | 'leaserPhone'
  | 'leaserSchoolYear'
  | 'leaserMajor'
  | 'leaserIntro'
  | 'profilePhoto'
>;
