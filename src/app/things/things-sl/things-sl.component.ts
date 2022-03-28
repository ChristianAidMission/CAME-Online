import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThingsSLData } from '../things.model'
import { ThingsService } from '../things.service';

@Component({
  selector: 'app-things-sl',
  templateUrl: './things-sl.component.html',
  styleUrls: ['./things-sl.component.css']
})
export class ThingsSLComponent implements OnInit {
  slData: ThingsSLData[] ;
  requeryPK: number;
  isFetching = false;
  
  constructor( private service: ThingsService,
    private router: Router,
    private route: ActivatedRoute) {  }  /* API  */

  ngOnInit(): void {
    console.log('Things-SL.ngOnInit: ')

    this.service.SLFetching.subscribe(
      (x: boolean) => {
        console.log('Things-SL: service.SLFetching(' + x + ') recieved ');
        this.isFetching = true;
      }
    )

    this.service.SLFetched.subscribe(
      (x: boolean) => {
        console.log('Things-SL: service.SLFetched(' + x + ') recieved ');
        this.isFetching = false;
        this.slData = this.service.getCurrentSLData()
      }
    )

    this.service.requestList();
    }

  btnNew(){
    console.log('------------------------------------')
    console.log('Things-SL.btnNew: ')
    //this.RequestItem(0)
    this.router.navigate(['0'], {relativeTo: this.route})
   }

  // RequestItem(pk: number){
  //   console.log('Things-SL.RequestItem: ' + pk)
  //   this.slService.onItemRequested.emit(pk)
  // }
  
}
