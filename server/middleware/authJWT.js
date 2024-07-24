import jwt from 'jsonwebtoken';

export const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    };
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
            if(err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).send({ error: 'Your session has expired.' });
                }else if (err.name === 'JsonWebTokenError') {
                    return res.status(403).send({error : 'Invalid Token'})
                }else {
                    console.warn('JWT Verification error',err);
                    return res.status(500).json({message : 'Internal server error.'});
                };
            };
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}