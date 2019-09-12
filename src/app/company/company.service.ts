import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from '../state';
import { Store } from '@ngrx/store';
import * as companyActions from '../state/company/actions';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    this.loadCompanies();
   }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  // companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  getCompanies(): Observable<Company[]> {
    return this.store.select(s => s.company.companies);
  }

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.handleError)
    ).subscribe(c => this.store.dispatch(companyActions.setCompanies({companies: c})));
  }


  handleError(e): Observable<any> {
    console.error('ERROR! OH NO!', e);
    return of({});
  }

  deleteCompany(company: Company) {
    console.log('Deleting Company');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .subscribe(c => this.loadCompanies());
  }

  addCompany(company: Company) {
    this.httpClient.post<Company>(`${this.API_BASE}/company`, company
    , { headers: new HttpHeaders().set('content-type', 'application/json') })
    .subscribe(c => this.loadCompanies());
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`);
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    )
    .subscribe(c => this.loadCompanies());
  }


}
