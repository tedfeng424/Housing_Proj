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
  leaserSchoolYear: number;
  leaserMajor: string;
  leaserIntro: string;
  photos: string[];
  profilePhoto: string;
  roomId: number;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
  negotiable: boolean;
}
