import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();
   }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.handleError)
    ).subscribe(c => this.companies$.next(c));
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
