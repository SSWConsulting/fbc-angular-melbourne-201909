import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) { }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(e): Observable<any> {
    console.error('ERROR! OH NO!', e);
    return of({});
  }

  deleteCompany(company: Company) {
    console.log('Deleting Company');
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`);
  }

  addCompany(company: Company): Observable<Company>{
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company
    , { headers: new HttpHeaders().set('content-type', 'application/json') });
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${id}`);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    );
  }


}
