import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Categories } from '../model/categories.model';

const env = environment.DEV

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  /* SERVICE */
  private _httpClient = inject(HttpClient)

  public getList(): Observable<HttpResponse<any[]>> {
    return this._httpClient.get<any[]>(`${env}control-price/accounts.json`, {
      observe: 'response',
      responseType: 'json'
    });
  };

  public getListExpense(configAccountId: number): Observable<HttpResponse<any[]>> {
    return this._httpClient.get<any[]>(`${env}control-price/expense/expenses.json?configAccountId=${configAccountId}`, {
      observe: 'response',
      responseType: 'json'
    });
  };

  public getListCategory(): Observable<HttpResponse<Categories[]>> {
    return this._httpClient.get<any[]>(`${env}control-price/categories.json`, {
      observe: 'response',
      responseType: 'json'
    });
  };


}
