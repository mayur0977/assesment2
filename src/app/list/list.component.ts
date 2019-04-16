import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Bank, CustomCurrency } from '../bank.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  /** All banks of list component */
  public allBanks: Bank[];
  /** Store currency values of list component */
  public calledCurrencyValues: CustomCurrency[];
  // public singleCurrency: CustomCurrency;
  // public convertValue: number;
  constructor (private bankService: BankService) {
    this.calledCurrencyValues = [];
  }
  
  /** on init : Initilize and get all bank data */
  public ngOnInit (): void {
    this.bankService.getAllBanks().subscribe((res: Bank[]) => {
      this.allBanks = res;
      // this.allBanks[0].convertedAmount = 120;
      this.setConvertedValueToBank();
    });

    /*  this.getBankCurData().then((res) => {
       this.allBanks = res;
       this.setConvertedValueToBank();
     }); */

  }

  /** Sets converted value to bank after getting all banks data */
  public setConvertedValueToBank (): void {

    this.allBanks.forEach((_singleBank: Bank) => {
      let currencyFullType: string = _singleBank.baseCur + '_' + _singleBank.targetCur;
      this.getNewCurrencyValue(currencyFullType, _singleBank);
      /* if (this.calledCurrencyValues.length > 0) {
        this.calledCurrencyValues.forEach((element: CustomCurrency) => {
          console.log('called');
          if (element.curName === currencyFullType) {
            this.convertValue = element.curValue;
            console.log('Found Dup',this.convertValue);
            return;
          }
        });
      }
      else {
        this.convertValue = this.getNewCurrencyValue(currencyFullType);
        console.log('New Val',this.convertValue);
      } */
    });
  }

  /**
   * Gets new currency value for every bank
   * @param curruncycustomContacted accept concated value of base and target currency ex : INR_USD
   * @param singleBank single bank object to get  and store converted ammount
   */
  public getNewCurrencyValue (curruncycustomContacted: string, singleBank: Bank): void {
    this.getCurrencyValue(curruncycustomContacted).then((res) => {
      // console.log(res);
      singleBank.convertedAmount = (singleBank.amount * res[curruncycustomContacted]);
      singleBank.curRate = res[curruncycustomContacted];
    });
  }

  /**
   * Gets currency value from API
   * @param curruncycustomContacted accept concated value of base and target currency ex : INR_USD
   * @returns currency value as a promise
   */
  public getCurrencyValue (curruncycustomContacted: string): Promise<any> {
    // console.log(curruncycustomContacted, ' curVale ', res);
    /* this.singleCurrency = { curName: curruncycustomContacted, curValue: res[curruncycustomContacted] };
     this.calledCurrencyValues.push(this.singleCurrency);*/
    const promise = new Promise((resolve, reject) => {
      this.bankService.getCurrencyValue(curruncycustomContacted)
        .subscribe((res: Object) => {
        resolve(res);
      },           (err:Error) => {
            reject();
            console.error('BAD REQUEST FOR CONVERT CURRENCY');
            
      });
    });
    return promise;
  }

}
