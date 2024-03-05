
const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
      if(req.url === '/login' || req.url === '/posts') {
        return res.sendStatus(200);
      };
      if(req.url === '/item') {
        return res.sendStatus(200);
      };
    }
    next();
  };
  

export default corsMiddleware;