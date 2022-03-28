import { Injectable} from '@angular/core';
import { HttpClient, /*HttpHeaders*/ } from '@angular/common/http';
import { map, Subject } from 'rxjs';

import { ThingsSLData, ThingItemData, ThingsSLAPI, ThingItemAPI, ThingItemSaveAPI } from './things.model'

@Injectable()
export class ThingsService{
  SLFetching = new Subject();
  ItemFetching = new Subject();
  ItemSaving = new Subject();
  ItemDeleting = new Subject();
  SLFetched = new Subject<boolean>();
  ItemFetched = new Subject<boolean>();
  ItemSaved = new Subject<boolean>();
  ItemDeleted = new Subject<boolean>();
//  onItemRequested = new EventEmitter<number>();
//  onRequerySL = new EventEmitter<number>();

  private apiUrl: string = 'https://came-api.azurewebsites.net';  //  'https://localhost:44356'; //  

  private slData: ThingsSLData[] = [];
  private currentItem: ThingItemData = this.newItem();  //new ThingItemData( 0, new Date("2000-01-01T00:00:00.000Z"), 0, 0, 'no data');
    
  private newItem(){
    return new ThingItemData( 0, new Date("2000-01-01GMT-0500"), 0, 0, 'no data');
  }

  constructor(private httpClient: HttpClient) { 
    console.log('ThingsService.constructor:');
    this.apiUrl = this.apiUrl + `/weatherforecast/`;
//    this.fetchSLAPI();
  }

  private fetchSLAPI(){
    console.log('ThingsService.fetchSLAPI:');
    this.SLFetching.next(true);
    this.httpClient
    .get<ThingsSLAPI[]>(this.apiUrl)  
    .pipe(
      map(
        responseData => {   
//          console.log('responseData:');
//          console.log(responseData);
          const thingsArray: ThingsSLData[] = [];           
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
//              console.log('key: ' + key);
//              console.log(responseData[key]);
              thingsArray.push(
                //{...responseData[key], id: key}
                new ThingsSLData(
                  responseData[key].id,
                  responseData[key].extra,
                  responseData[key].date,
                  responseData[key].temperatureC,
                  32 + (responseData[key].temperatureC / 0.5556)
                )
              );
//              console.log(thingsArray[key]);
            }
          }
          return thingsArray;
        }
      )
    )
    .subscribe(expectedData => { 
      console.log('ThingsService.fetchSLAPI: success');  //expectedData=
//      console.log(expectedData); 
      this.slData = expectedData;
      this.SLFetched.next(true);
    });
  }
    
  private fetchItemAPI(id: number){
    console.log('ThingsService.fetchItemAPI:' + id);
    this.ItemFetching.next(true);

    if (id <= 0) {
      this.currentItem = this.newItem();
      this.ItemFetched.next(true)
    } else {
//      console.log('ThingsService.fetchItemAPI: ');  // APIurl=' + x

      this.httpClient
      .get<ThingItemAPI>(this.apiUrl + id) 
      .pipe(

        map(
          (responseData) => {   
            // console.log('ThingsService.fetchItemAPI: map '); 
            // console.log(responseData); 
            const item: ThingItemData = this.newItem();           
            if (responseData.hasOwnProperty) {
              item.id = responseData.id;
              item.Date = responseData.date;
              item.TemperatureC = responseData.temperatureC;
              item.TemperatureF = responseData.temperatureF;
              item.Summary = responseData.summary;
            }
            return item;
          }
        )
      )
      .subscribe(
        expectedData => { 
          console.log('ThingsService.fetchItemAPI: success'); 
          console.log(expectedData); 
          this.currentItem = expectedData;
          this.ItemFetched.next(true)
        }
        , e => {
          console.log('ThingsService.fetchItemAPI: error '); 
          console.log(e); 
          this.ItemFetched.next(false)
        }
      );
    }
  }

  private saveItemAPI(){ 
    console.log('ThingsService.saveItemAPI: ' + this.currentItem.id); //  APIurl=' + x
    this.ItemSaving.next(true);

    if (this.currentItem.id <= 0) {
      //POST not PUT   
      this.httpClient
      .post<ThingItemSaveAPI>(this.apiUrl,
        {
          extra: false, 
          date: this.currentItem.Date, //'2000-05-02T00:00:00', 
          temperatureC: this.currentItem.TemperatureC, 
          summary: this.currentItem.Summary
        }
      ) 
      .subscribe(
        expectedData => { 
          console.log('ThingsService.saveItemAPI-POST: success'); 
          console.log(expectedData); 
          this.currentItem.id = expectedData['id'];
          this.ItemSaved.next(true)
          this.fetchSLAPI();// REQUERY  IF NECESSARY  
        }
        , e => {
          console.log('ThingsService.saveItemAPI-POST: error'); 
          console.log(e); 
          this.ItemSaved.next(false)
        }
      );


} else {
      //PUT
      this.httpClient
      .put<ThingItemSaveAPI>(this.apiUrl + this.currentItem.id,
        {
          extra: false, 
          date: this.currentItem.Date, //'2000-05-02T00:00:00', 
          temperatureC: this.currentItem.TemperatureC, 
          summary: this.currentItem.Summary
        }
      ) 
      .subscribe(
        expectedData => { 
          console.log('ThingsService.saveItemAPI-PUT: success'); 
          console.log(expectedData); 
          // this.currentItem = expectedData;
          this.ItemSaved.next(true)
          this.fetchSLAPI();// REQUERY  IF NECESSARY  
        }
        , e => {
          console.log('ThingsService.saveItemAPI-PUT: error '); 
          console.log(e); 
          this.ItemSaved.next(false)
        }
      );

    }
  }

  private deleteItemAPI(){ 
    console.log('ThingsService.deleteItemAPI: ' + this.currentItem.id); //  APIurl=' + x
    this.ItemDeleting.next(true);

    this.httpClient
    .delete<ThingItemSaveAPI>(this.apiUrl + this.currentItem.id) 
    .subscribe(
      expectedData => { 
        console.log('ThingsService.deleteItemAPI: success'); 
        console.log(expectedData); 
        this.currentItem = this.newItem();
        this.ItemDeleted.next(true)
        this.fetchSLAPI();// REQUERY  IF NECESSARY  
      }
      , e => {
        console.log('ThingsService.deleteItemAPI: error '); 
        console.log(e); 
        this.ItemDeleted.next(false)
      }
    );

  }  

  requestList(){
    console.log('ThingsService.requestList: ');
    this.fetchSLAPI();
  }

  requestItem(id: number){
    console.log('ThingsService.requestItem: ' + id);
    this.fetchItemAPI(id)
  }

  getCurrentSLData(){
    console.log('ThingsService.getSLData:');
    return this.slData.slice();
  }

  getCurrentItem(){
    console.log('ThingsService.getCurrentItem: current=' + this.currentItem.id);
    return this.currentItem;
  }

  saveItem(item: ThingItemData){
    console.log('ThingsService.SaveItem: current=' + this.currentItem.id);
    this.currentItem = item;
    this.saveItemAPI();
    // IF edit requires SL refresh ...
    //this.loadSLAPI();  // emits it's own async "I'm loaded"
 }

  deleteItem(){
    console.log('ThingsService.DeleteItem: current=' + this.currentItem.id);
    this.deleteItemAPI();
    this.fetchSLAPI();  // emits it's own async "I'm loaded"
  }

}