import { Component, OnInit } from '@angular/core';
import { ThingsService } from './things.service';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css'],
  providers: [ThingsService]
})
export class ThingsComponent implements OnInit {
//  currentRequestedPK: number = -1;
//  currentItemPK: number = -1;

  constructor(/*private slService: ThingsService*/) { 
  //  console.log('ThingsComponent.constructor:');
  }

  ngOnInit(): void {
//    console.log('ThingsComponent.ngOnInit:');

    // this.slService.onItemRequested.subscribe( (pk: number) => {
    //   console.log('ThingsComponent.onItemRequested(' + pk + ') received');
    //   this.requestItem(pk);
    // } )  
    
    // this.slService.onAPIItemFetched.subscribe( (success: boolean) => {
    //   console.log('ThingsComponent.onAPIItemFetched(' + success + ') received');
    //   this.currentItemPK = this.slService.getCurrentItemPK()
    // } )

  }

//   requestItem(pk: number){
//     console.log('ThingsComponent.requestItem:' + pk);
// //    this.slService.loadItemAPI(pk)
//   }

}
