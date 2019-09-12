import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from './company/company.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  city = 'Melbourne';
  companiesCount$: Observable<number>;

constructor(
  private companyService: CompanyService
) {
}

  ngOnInit(): void {
    this.companiesCount$ = this.companyService.getCompanies()
      .pipe(map(l => l.length));
  }

}
