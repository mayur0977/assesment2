import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../services/bank.service';
import { Bank } from '../bank.model';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  /** Bank detail of add bank component */
  public bankDetail: FormGroup;
  /** Single bank detail of add bank component */
  public singleBankDetail: Bank;
  /** Bank currncies of add bank component */
  public bankCurrncies: string[];
  constructor (private bankSerice: BankService, private fb: FormBuilder) {
    this.bankCurrncies = ['INR', 'USD', 'EUR','JPY','BGN','CZK','DKK','GBP','HUF','PLN',
                          'RON','SEK','CHF','NOK','HRK','RUB','TRY','AUD','BRL','CAD'];
  }
  /** on init */
  public ngOnInit():void  {
    this.resetBankDetailForm();
  }
  /** Resets bank detail form */
  public resetBankDetailForm():void {
    this.bankDetail = this.fb.group({
      bankName: ['', [Validators.required]],
      baseCur: ['', Validators.required],
      targetCur: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.bankDetail.reset({baseCur : null, targetCur: null});
  }
  /** Determines whether submit data or not */
  public onSubmit (): void{
    this.singleBankDetail = this.bankDetail.value;
    this.bankSerice.addBank(this.singleBankDetail).subscribe((res:Bank) => {
      this.resetBankDetailForm();
      console.log(res);
    });
  }

}
