import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyCalculatorPage } from './currency-calculator.page';

describe('CurrencyCalculatorPage', () => {
  let component: CurrencyCalculatorPage;
  let fixture: ComponentFixture<CurrencyCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
