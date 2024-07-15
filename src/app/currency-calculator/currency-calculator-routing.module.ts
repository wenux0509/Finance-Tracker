import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyCalculatorPage } from './currency-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: CurrencyCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyCalculatorPageRoutingModule {}
