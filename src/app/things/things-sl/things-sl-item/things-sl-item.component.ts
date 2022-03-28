import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThingsSLData } from '../../things.model'
import { ThingsService } from '../../things.service';

@Component({
  selector: 'app-things-sl-item',
  templateUrl: './things-sl-item.component.html',
  styleUrls: ['./things-sl-item.component.css']
})
export class ThingsSlItemComponent implements OnInit {
  @Input() slItem: ThingsSLData;

  constructor(private service: ThingsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
//this.slItem.Date.toLocaleString() //'%d-%b-%Y'
  }

  onSelect(){
    console.log('------------------------------------')
    console.log('Thing-SL-Item.onSelect ' + this.slItem.id)
//    this.slService.onItemRequested.emit(this.slItem.pk)
//    this.service.requestItem(this.slItem.id)
  this.router.navigate([this.slItem.id], {relativeTo: this.route})

  }
    
}
