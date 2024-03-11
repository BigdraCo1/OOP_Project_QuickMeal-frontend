import Cookies from 'js-cookie';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export const LoginSchema = z.object({
  username: z.string()({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character",
  }),
});

async function login(data) {
  try {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await api.post('/auth/token', formData);

    if (response.status === 200) {
      // Set cookie with expiration time 30 minutes from now
      const expirationTime = new Date(new Date().getTime() + 30 * 60000);
      Cookies.set('token', response.data.access_token, { expires: expirationTime });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export default login;