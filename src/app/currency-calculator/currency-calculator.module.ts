import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyCalculatorPageRoutingModule } from './currency-calculator-routing.module';

import { CurrencyCalculatorPage } from './currency-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyCalculatorPageRoutingModule
  ],
  declarations: [CurrencyCalculatorPage]
})
export class CurrencyCalculatorPageModule {}
