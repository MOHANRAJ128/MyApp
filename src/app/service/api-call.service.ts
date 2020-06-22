import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { context } from '../app.component';
import { ReceiveDataService } from './receive-data.service';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http:HttpClient,private headerService:ReceiveDataService) { }
  
  mappedResourceFunc()
  {
    let headers=this.headerService.getHeader();
    return this.http.get<MappedResources[]>(`${context}/mappedResources`,{headers}).pipe(
      map(
        data=>{
          return data;
        }
      )
    );
  }
}

export class MappedResources{
  constructor(public empId:number,public dmId:number,public ticketNo:number,public projectName:String,public interviewStatus:String,public dateIn:Date,public dateOut:Date){}
}
