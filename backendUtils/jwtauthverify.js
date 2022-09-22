import JWT from 'jsonwebtoken';

export default function VerifyJwtAuth(headerauth){
    const auth = headerauth.Authorization || headerauth.authorization;
    if(!auth){
        return;
    }
    if (auth && auth.startsWith('Bearer')) {
    const token =  auth.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if(!decoded.id)return {error:true,msg:"Token expired."}
    return decoded.id;
    }

}