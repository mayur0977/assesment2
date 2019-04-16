import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBankComponent } from './add-bank/add-bank.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'add',
    component:AddBankComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'add'
  },
  {
    path: 'list',
    component:ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
