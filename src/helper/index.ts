import* as crypto from "crypto"
import * as jwt from "jsonwebtoken"
 
 
 // Get the hashed string from a ​payload string
  export function getHashed(payload: string): string {
    return crypto.createHash("sha1").update(payload).digest("hex")
}

// Get the jwt token from payload string
 export function getToken(payload: any): string {
    return jwt.sign(payload, 'socket-test')
}

export function verifyToken(token:string){
  return jwt.verify(token,'socket-test')
}