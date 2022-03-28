import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ThingItemData } from '../things.model'
import { ThingsService } from '../things.service';

@Component({
  selector: 'app-things-item',
  templateUrl: './things-item.component.html',
  styleUrls: ['./things-item.component.css']
})
export class ThingsItemComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  mySubServiceFetched: Subscription;
  mySubServiceDeleted: Subscription;
  mySubRouteParams: Subscription;
  thing: ThingItemData;
//  editMode: boolean = false;

  constructor(private service: ThingsService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void { 
    console.log('ThingsItem.ngOnInit:');

    // needed because form tries to populate and needs this.thing to be initialized. 
    // this happens before service can return the item.
    this.thing = this.service.getCurrentItem(); 
    // better to be initialized to a blank item.

    this.mySubServiceFetched = this.service.ItemFetched.subscribe( 
      (success: boolean) => {
        console.log('ThingsItem: service.ItemFetched(' + success + ') received');
        this.thing = this.service.getCurrentItem();
//        this.PopulateForm();
        this.router.navigate(['things',this.thing.id])  //, {relativeTo: this.route}
      }
    )

    this.mySubServiceDeleted = this.service.ItemDeleted.subscribe( 
      (success: boolean) => {
        console.log('ThingsItem: service.ItemDeleted(' + success + ') received');
//        this.thing = this.service.getCurrentItem();
//        this.PopulateForm();
        this.router.navigate(['things'])  //, {relativeTo: this.route}
}
    )

    this.mySubRouteParams = this.route.params.subscribe(
      (params: Params) => {
        console.log('ThingsItem: routeParams(' + params['id'] + ') received');
        this.service.requestItem( +params['id']);
      }
    );

  }

  ngOnDestroy(){
    this.mySubServiceFetched.unsubscribe();
    this.mySubServiceDeleted.unsubscribe();
    this.mySubRouteParams.unsubscribe();
  }

  PopulateForm(){
    this.slForm.setValue({
      date: this.thing.Date,
      temperatureC: this.thing.TemperatureC ,
      temperatureF: this.thing.TemperatureF,
      summary: this.thing.Summary
    });
}

  btnSave(frm: NgForm){
    console.log('------------------------------------')
    console.log('ThingItem.btnSave: ')

    const frmValues = frm.value;

    this.thing.Date = frmValues.date;
    this.thing.TemperatureC = frmValues.temperatureC;
    this.thing.Summary = frmValues.summary;

    this.service.saveItem(this.thing);
    frm.reset();
  }

  btnDelete(){
    console.log('------------------------------------')
    console.log('ThingItem.btnDelete: ')
    this.service.deleteItem();
    this.btnReset();
  }

  btnReset(){
    console.log('------------------------------------')
    console.log('ThingItem.btnReset: ')
    this.slForm.reset();
//    this.editMode=false;
  }

}
