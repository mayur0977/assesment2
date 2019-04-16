import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Bank } from 'src/app/bank.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit,OnChanges {
 

  @Input() public bankAllData: Bank[];
  constructor() { }

  public ngOnInit():void {
  }
  public ngOnChanges (): void {
    this.getHeaderSummeryData();
  }

  public getHeaderSummeryData (): void{
    if (this.bankAllData) {
      console.log('for header data', this.bankAllData);
      
    }
  }

}
