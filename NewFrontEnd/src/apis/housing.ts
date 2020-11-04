import { backendAPI } from './apiBases';

const getHousing = async (): Promise<any[] | undefined> => {
  try {
    const result = await backendAPI.get('/getRoom', { withCredentials: true });
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
    const result = await backendAPI.post('/searchRoom', roomJson, {
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

const postHousing = async (roomForm: FormData): Promise<any[] | undefined> => {
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

export { getHousing, searchHousing, postHousing };
