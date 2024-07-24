import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import database from '../database.js';
import { validation } from './validation.js';

const generateAccessToken = (user) => {
    return jwt.sign(user,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};

export const loginController = async (req, res) => {
    try {
        const { username, password }= req.body.userData;

        const usernameValidation = validation(username,'username');
        const passwordValidation = validation(password,'password');
        if (typeof usernameValidation === 'string') {
            return res.status(400).json({ message: usernameValidation });
        };
        if (typeof passwordValidation === 'string') {
            return res.status(400).json({ message: passwordValidation });
        };

        const [rows] = await database.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        const userDataDB = rows[0];
        const passwordMatch = await bcrypt.compare(password, userDataDB.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        };

        const token = generateAccessToken({username, id: userDataDB.id, email: userDataDB.email});
        const refreshToken = generateRefreshToken({ username, id: userDataDB.id, email: userDataDB.email });

        await database.promise().query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userDataDB.id]);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ username,id: userDataDB.id, email: userDataDB.email, registratonDate: userDataDB.registratonDate });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Internal Server Error: Please try again` });
    }
};
