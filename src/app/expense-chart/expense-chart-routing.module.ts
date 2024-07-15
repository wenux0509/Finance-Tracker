import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseChartPage } from './expense-chart.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseChartPageRoutingModule {}
