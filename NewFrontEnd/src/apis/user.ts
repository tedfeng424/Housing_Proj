import { backendAPI } from './apiBases';

export interface UserLoginResponse {
  access_token: string;
  email: string;
  message: string;
  user: string; // the user's name
  imageUrl: string; // TODO i don't get an imageurl when logging in for some reason?
}

/**
 * Login a user to a session.
 * @param name - the user's name
 * @param email - the user's email
 * @param imageUrl - the user's profile image Url
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
const userLogIn = async (
  name: string,
  email: string,
): Promise<UserLoginResponse | undefined> => {
  try {
    const response = await backendAPI.post(
      '/login',
      JSON.stringify({ name, email }),
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );

    if (response.request?.status !== 200) throw Error('Bad request');
    return response.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

// export interface UserLogoutResponse {
//   // TODO
// }

/**
 * Logout a user from a session.
 * @param token - the token for the user's session.
 * @returns - undefined if error occured, string result message otherwise
 */
const userLogOut = async (token: string): Promise<string | undefined> => {
  try {
    const response = await backendAPI.post(
      '/logout',
      // eslint-disable-next-line @typescript-eslint/camelcase
      { access_token: token },
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log(response);

    if (response.request?.status !== 200) throw Error('Bad request');
    return response.data;
  } catch (err) {
    console.error(`Logout error: ${err}`);
    return undefined;
  }
};

export { userLogIn, userLogOut };
