import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReceiveDataService, Fresher, UserData } from './service/receive-data.service';
import { Router } from '@angular/router';

import { ApiCallService, MappedResources } from './service/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BuyToFeel';
  fresh: Fresher;
  user:UserData;
  token:String;
  mappedResources:MappedResources[];
  constructor(private service:ReceiveDataService,private http:HttpClient,private router:Router,private apiCall:ApiCallService) {

  }
  ngOnInit(){
    // sessionStorage.setItem("verifyuser","Hema");
    if(document.referrer.match("http://localhost:8080/GodsEyeFinal/login") || sessionStorage.getItem("verifyuser")!=null)
    {
      this.service.getDMInfo().subscribe((data:UserData)=>{
        this.user=data;
        if(this.user.authenticated)
        {
          sessionStorage.setItem(verifyuser,`${this.user.username}`);
          console.log(this.http.post<any>('http://localhost:9090/JWTRestAPI/authenticate',{
            username:this.user.username,
            password:this.user.password
          }).subscribe(data=>{
            // this.token=`Bearer ${data.token}`;
            sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
          }));
        }
        else{
          document.location.href="http://localhost:8080/GodsEyeFinal/login";
        }
      });
    }
    else{
      alert("You are not Authorized")
      document.location.href="http://localhost:8080/GodsEyeFinal/login";
    }

  }
  
}

export const verifyuser='verifyuser';

export const TOKEN="token";

export const context="http://localhost:9090/JWTRestAPI/api";