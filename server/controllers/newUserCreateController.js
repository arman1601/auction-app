import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import database from '../database.js';
import { validation } from './validation.js';

const generateRefreshToken = (user) => {
    return jwt.sign(user,process.env.JWT_REFRESH_SECRET,{ expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};

export const newUserCreateController = async (req,res) => {
    try {
       const { username, email, password } = req.body.userData;

       const usernameValidation = validation(username,'username');
       const passwordValidation = validation(password,'password');
       const emailValidation = validation(email,'email');

       if (typeof passwordValidation === 'string') {
           return res.status(400).json({ message: passwordValidation });
       };

       if (typeof usernameValidation === 'string') {
           return res.status(400).json({ message: usernameValidation });
       };

       if (typeof emailValidation === 'string') {
           return res.status(400).json({ message: emailValidation });
       };

       const [existingUser] = await database.promise().query(`SELECT * FROM users WHERE username = ? AND email = ?`,[username,email]);
       if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
       };
       const hashedPassword = await bcrypt.hash(password,10);
       const [result] = await database.promise().query(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,[username,email,hashedPassword]);
       const userId = result.insertId;

       const refreshToken = generateRefreshToken({ username, email, userId });

       await database.promise().query(`UPDATE users SET refresh_token = ? WHERE ID = ?`,[refreshToken,userId]);

       res.cookie('refreshToken',refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
       });

       res.status(201).send({
          message: 'User created successfully',
       });

    } catch (e) {
        console.log(e);
        res.status(501).send({ message: 'Internal server error.Please try later'});
    };
}