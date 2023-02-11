import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { keyable } from 'src/models/keyable';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token:string):keyable{
    return jwt_decode(token)
  }
}
