import { backEndAPI } from './apiBases';

const getHousing = async (): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.get('/getRoom', { withCredentials: true });
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const searchHousing = async (roomJson: string): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.post('/searchRoom', roomJson, {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
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
    const result = await backEndAPI.get('/postRoom', { withCredentials: true });
    console.log(result);
    // handle errors
    if (result.request?.status !== 200) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export { getHousing, searchHousing, postHousing };
