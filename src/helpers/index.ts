import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = 'ini-sangat-rahasia';

export const createSessionToken = (userId: string): string => {
   const payload = { userId };

   const option = {
      expiresIn: '1d',
   };

   const token = jwt.sign(payload, secretKey, option);
   return token;
};

export const validateSessionToken = (token: string): object | null => {
   try {
      const decoded = jwt.verify(token, secretKey);
      return decoded as object;
   } catch (error) {
      console.log('gagal memvalidasi session token : ' + error);
      return null;
   }
};

export const hashPassword = async (password: string) => {
   try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(password, salt);

      return hashedPassword;
   } catch (error) {
      throw error;
   }
};

export const validatePassword = async (
   plainPassword: string,
   hashedPassword: string
) => {
   try {
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

      return isMatch;
   } catch (error) {
      throw error;
   }
};
