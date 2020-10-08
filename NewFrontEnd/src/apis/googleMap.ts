/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

const distanceMatrixAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/json',
});

const priceCenterCoordinates = '32.8797,117.2362';

const getDuration = async (
  latitude: string | number,
  longitude: string | number,
) => {
  try {
    const result = await distanceMatrixAPI.get('', {
      params: {
        origins: `${latitude},${longitude}`,
        destinations: priceCenterCoordinates,
        units: 'imperial',
        arrival_time: 1573088400, // need this so that the time is stays the same no matter when you make the post during the day. The time is November 6, 2019, @ 5:00 pm
        mode: 'transit',
        transit_mode: 'bus',
        key: '', // TODO copy over from the GoogleMap component
      },
    });

    console.log(result.data);
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export default getDuration;
