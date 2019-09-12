import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Company } from '../company';


@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: Company[];

  @Output()
  deleteCompany: EventEmitter<Company> = new EventEmitter<Company>();

  constructor() { }

  ngOnInit() {
  }

  deleteClicked(c: Company) {
    this.deleteCompany.emit(c);
  }

}
