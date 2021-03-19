import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from 'angular-jwt';
import { User } from 'src/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:9090/';
  user: User | undefined;

  constructor(private http: HttpClient, private router : Router) { }

//   registerUser(user:User){
//     return this.http.post(this.userUrl+"user/signup",user);
//   }


registerUser(user : User) : Observable<any>
  {
      let url = this.userUrl + "user/signup";
      return this.http.post(url,user);
  }

  login(user : User) : Observable<any>
  {
      let url = this.userUrl + "user/login";
      return this.http.post(url, user);
  }

  isLoggedIn() { 

		// create an instance of JwtHelper class.
    let jwtHelper = new JwtHelperService();

		// get the token from the localStorage as we have to work on this token.
		let token = localStorage.getItem('token');

		// check whether if token have something or it is null.
		if(!token)
		{
			return false;
		}

		// get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accept a string value which is nothing but token.

		if(token)
		{
			let expirationDate = jwtHelper.getTokenExpirationDate(token);

			// check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.

			let isExpired = jwtHelper.isTokenExpired(token);

			return !isExpired;    
		}   
    return false;
  }
  
    

}
