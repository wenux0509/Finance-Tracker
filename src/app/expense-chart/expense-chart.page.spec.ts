import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseChartPage } from './expense-chart.page';

describe('ExpenseChartPage', () => {
  let component: ExpenseChartPage;
  let fixture: ComponentFixture<ExpenseChartPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
