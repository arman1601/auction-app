

// es middleware y grel em,vorpeszi hetagayum menak mer IP nerin toxen kpnen es saytin;
const restrictAccessByIp = (allowedIP) => {
    return (req,res,next) => {
        const clientIP = req.ip;
        if(clientIP = allowedIP) {
            next();
        }else {
            res.status(403).json({error: 'Access forbiden!!!!'})
        }
    }
};

export default restrictAccessByIp;