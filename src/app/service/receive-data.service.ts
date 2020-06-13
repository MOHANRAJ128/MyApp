import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TOKEN } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ReceiveDataService {

  constructor(private http:HttpClient) { }


  getDMInfo()
  {
    let headers=new HttpHeaders({
      Authorization:this.authHeader(),
    })
    return this.http.post<UserData>("http://localhost:8080/GodsEyeFinal/dmId",{headers});
  }
  getHeader()
  {
      let authCode=this.authHeader();
      let headers=new HttpHeaders({
        Authorization:sessionStorage.getItem(TOKEN),
      })
      return headers;
  }
  getFresherService()
  {
    let headers=this.getHeader();
    return this.http.get<Fresher>('http://localhost:9090/JWTRestAPI/hello',{headers});
  }

  authHeader()
  {
    let username="Mohan";
    let password="Mohan@98";
    let auth='Basic '+window.btoa(username+":"+password);
    return auth;
  }
}


export class Fresher{
  constructor(public id:number,public name:String,public interest:String){}
}

export class UserData{
  constructor(public username:String,public password:String,public authenticated:boolean){}
}
