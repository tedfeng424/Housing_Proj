import { backEndAPI } from './apiBases';
const userLogIn = async (userJson: string): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.post('/login', userJson, {
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
const userLogOut = async (userJson: string): Promise<any[] | undefined> => {
  try {
    const result = await backEndAPI.post('/logout', userJson, {
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
    console.error('logout fail');
    console.error(err);
    return undefined;
  }
};

export { userLogIn, userLogOut };
