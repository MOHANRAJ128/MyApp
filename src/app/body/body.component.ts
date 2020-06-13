import { Component, OnInit } from '@angular/core';
import { ApiCallService ,MappedResources} from '../service/api-call.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  mappedResources:MappedResources[];
  intervalId:any;
  constructor(private apiCallService:ApiCallService) {
   
   }

  ngOnInit(): void 
  {

    this.intervalId=setInterval(()=>{
      this.apiCallService.mappedResourceFunc().subscribe((data:MappedResources[])=>
      {
          this.mappedResources=data;
      })
    },3600000)
    
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  newResourceFunc()
  {
    
  }

}