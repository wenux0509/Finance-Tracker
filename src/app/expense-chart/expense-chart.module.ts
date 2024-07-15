import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseChartPageRoutingModule } from './expense-chart-routing.module';

import { ExpenseChartPage } from './expense-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseChartPageRoutingModule
  ],
  declarations: [ExpenseChartPage]
})
export class ExpenseChartPageModule {}
