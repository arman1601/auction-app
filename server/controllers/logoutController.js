import database from '../database.js';

export const logoutController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.sendStatus(401);
    };

    try {
        const [rows] = await database.promise().query(`UPDATE users SET refresh_token = NULL WHERE refresh_token = ?`, [refreshToken]);
        if (!rows.affectedRows) {
            return res.sendStatus(204); 
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    };
};
