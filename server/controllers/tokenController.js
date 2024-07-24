import jwt from 'jsonwebtoken';
import database from '../database.js';

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};

export const updateToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(401);
    };

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const [rows] = await database.promise().query(`SELECT * FROM users WHERE id = ?`, [decoded.id]);
        if (!rows.length) {
            console.log('Sxal refresh token')
            return res.sendStatus(403);
        }

        const user = rows[0];
        const newAccessToken = generateAccessToken({ id: user.id, username: user.username, email: user.email });
        const newRefreshToken = generateRefreshToken({ id: user.id, username: user.username, email: user.email });

        await database.promise().query(`UPDATE users SET refresh_token = ? WHERE id = ?`, [newRefreshToken, user.id]);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.json({ accessToken: newAccessToken });
    } catch (e) {
        res.sendStatus(403);
    };
};
