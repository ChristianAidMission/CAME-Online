import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ThingsComponent } from "./things/things.component";
import { MinistryWorksComponent } from "./MinistryWorks/MinistryWorks.component";
import { ThingsItemComponent } from "./things/things-item/things-item.component";
import { MinistryWorksItemComponent } from "./MinistryWorks/MinistryWorks-item/MinistryWorks-item.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: 'things', component: ThingsComponent, children: [
        //{ path: '', component: RecipeStartComponent}, // "please pick a Thing"
        { path: ':id', component: ThingsItemComponent},
    ]},
    { path: 'works', component: MinistryWorksComponent, children: [ { path: ':id', component: MinistryWorksItemComponent} ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}