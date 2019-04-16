import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  /** Base url of bank service */
  public baseUrl: string = 'http://localhost:3000/bank';
  /** Start point val of converter Api */
  public startPointVal: string = 'https://free.currencyconverterapi.com/api/v6/convert?q=';
  /** End point val of converter Api */
  public endPointVal: string = '&compact=ultra&apiKey=9e5dc89f83d241ab749b';

  constructor(private http: HttpClient) { }

  /**
   * Gets all data of  banks
   * @returns all bank data 
   */
  public getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.baseUrl);
  }

  /**
   * Adds bank
   * @param bankBody 
   * @returns bank added data
   */
  public addBank(bankBody: Bank):Observable<Object>{
    return this.http.post(this.baseUrl, bankBody);
  }

  /**
   * Gets currency value
   * @param midTypeCurrency  accept two currency code value ex : INR_USD
   * @returns currency value object
   */
  public getCurrencyValue (midTypeCurrency:string): Observable<Object> {
    return this.http.get<Object>(this.startPointVal + midTypeCurrency + this.endPointVal);
  }
}
