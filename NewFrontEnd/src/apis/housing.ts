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

getHousing().then((response) => {
  console.log(response);
});

export { getHousing };
