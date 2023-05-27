import expresss from 'express';
import { register, login } from '../controller/authentication';

export default (router: expresss.Router) => {
   router.post('/auth/register', register);
   router.post('/auth/login', login);
};
