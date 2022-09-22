
import JWT from 'jsonwebtoken'
const generateCookieResponse = (statusCode, res, id, role,active=false,walletAddress,userdata) => {
    const token = JWT.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
 
   return res.status(statusCode).json({
      success: true,
      token,
      active,
      id,walletAddress,userdata
    });
  };
  
  //  Generate JWT
  const generateToken = (id, role) => {
    return JWT.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };

  export default generateCookieResponse;