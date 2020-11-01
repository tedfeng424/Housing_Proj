import { backEndAPI } from './apiBases';

const getHousing = async (): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.get('/getRoom');
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const searchHousing = async (room_json: string): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.post('/searchRoom', room_json, {
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const postHousing = async (): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.get('/postRoom');
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

getHousing().then((response) => {
  console.log(response);
});

export { getHousing, searchHousing };
