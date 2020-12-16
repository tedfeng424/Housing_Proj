import { User } from '../assets/models/User';
import { backendAPI } from './apiBases';

export interface UserLoginResponse extends Omit<User, 'token'> {
  access_token: string;
  message: string;
}

/**
 * Login a user to a session.
 * @param name - the user's name
 * @param email - the user's email
 * @returns - undefined if error occured, otherwise UserLoginResponse, which includes an access token,
 *            email, message, user, imageUrl
 */
const userLogIn = async (name: string, email: string) => {
  try {
    const response = await backendAPI.post<UserLoginResponse>(
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

    const data: User = {
      name: response.data.name,
      email: response.data.email,
      token: response.data.access_token,
      description: response.data.description,
      major: response.data.major,
      schoolYear: response.data.schoolYear,
      phone: response.data.phone,
    };

    return data;
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
const userLogOut = async (token: string) => {
  try {
    const response = await backendAPI.post<string>(
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
