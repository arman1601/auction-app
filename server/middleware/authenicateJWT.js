import jwt from 'jsonwebtoken';

const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    console.log(token)
    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, user) => {
      if(err) {
        console.log(err)
        if (err.name === 'TokenExpiredError') {
          return res.status(403).send({ error: 'Your session has expired.' });
        }else if (err.name === 'JsonWebTokenError') {
          return res.status(403).send({error : 'Invalid Token'})
        }
        console.warn('JWT Verification error',err);
        return res.status(500).json({message : 'Internal server error authenicateJWT'});
      }
      req.user = user;
      next();
    });
  };
  
  export default authenticateJWT;
  