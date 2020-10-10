/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

const priceCenterCoordinates = '32.8797,-117.2362';

/**
 * Gets the duration of a trip on an average day from address to Price Center
 * @param address - the address to get duration (from address to Price Center)
 */
const getDuration = async (address: string): Promise<string | undefined> => {
  try {
    const result = await googleMapsAPI.get('/distancematrix/json', {
      params: {
        origins: address,
        destinations: priceCenterCoordinates,
        units: 'imperial',
        arrival_time: 1573088400, // need this so that the time is stays the same no matter when you make the post during the day. The time is November 6, 2019, @ 10:00 am PST (November 6, 2019, @ 5:00 pm UTC)
        mode: '[transit]',
        transit_mode: 'bus',
        key: 'AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY',
      },
    });

    // handle errors
    if (result.data?.status !== 'OK') throw Error('Bad request');
    if (result.data?.rows[0]?.status !== 'OK') throw Error('No existing route');

    console.log(result.data);
    return result.data?.rows[0]?.duration?.text as string;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

// TODO delete these tests
getDuration('9775 Genesee Ave, San Diego, CA 92121');
console.log();
getDuration('4313 Cozzens Ct, San Diego, CA 92122');
console.log();
getDuration('4588 Robbins St, San Diego, CA 92122');
console.log();
getDuration('11645 Thistle Hill Pl, San Diego, CA 92130');
console.log();
getDuration('28466 Foothill Dr, Agoura Hills, CA 91301');
console.log();

export default getDuration;
