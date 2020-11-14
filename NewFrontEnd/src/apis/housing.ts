/* eslint-disable @typescript-eslint/camelcase */
import { HousePost } from '../assets/models/PostModels';
import { FilterModel } from '../assets/models/FilterModel';
import { backendAPI } from './apiBases';

const getHousingPostsAPI = async (): Promise<HousePost[] | undefined> => {
  try {
    const result = await backendAPI.get<HousePost[]>('/getRoom', {
      withCredentials: true,
    });
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');

    // TODO temporary fix because backend has photos as photo
    const houseData = result.data;
    houseData.forEach((house: any) => {
      house.photos = house.photo;
      house.photo = undefined;
    });

    return houseData;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const searchHousingPostsAPI = async ({
  distance,
  roomType,
  priceMin,
  priceMax,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  stayPeriod,
  other,
  facilities,
}: FilterModel): Promise<HousePost[] | undefined> => {
  try {
    const result = await backendAPI.post(
      '/searchRoom',
      JSON.stringify({
        distance,
        room_type: roomType,
        price_min: priceMin,
        price_max: priceMax,
        early_interval: earlyInterval,
        early_month: earlyMonth,
        late_interval: lateInterval,
        late_month: lateMonth,
        stay_period: stayPeriod,
        other,
        facilities,
      }),
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');

    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const newHousingPostAPI = async (
  roomForm: FormData,
): Promise<any[] | undefined> => {
  console.log('get called');
  try {
    const result = await backendAPI.post('/postRoom', roomForm, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(result, 'get result');
    // handle errors
    if (result.request?.status !== 201) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export { getHousingPostsAPI, searchHousingPostsAPI, newHousingPostAPI };
