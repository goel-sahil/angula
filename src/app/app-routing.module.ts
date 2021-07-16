import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListingComponent } from './student-listing/student-listing.component';


const routes: Routes = [
  {

    path: "list", component: StudentListingComponent,
  }


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
