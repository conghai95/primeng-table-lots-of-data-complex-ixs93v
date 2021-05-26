import { Component, ChangeDetectorRef  } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';

import { AppService } from './app.service';

@Component({
  selector: 'my-app',
  template: `
    <p-table
      [value]="dataSource"
      [scrollable]="true"
      [rows]="10"
      scrollHeight="700px"
      [virtualScroll]="true"
      [virtualRowHeight]="85"
      (onLazyLoad)="loadDataOnScroll($event)"
      [lazy]="true"
      [totalRecords]="totalRecords"
    >
      <ng-template pTemplate="header">
        <tr>
          <th *ngFor="let col of cols">{{col.field}}</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-car>
        <tr style="height: 85px;">
          <td *ngFor="let col of cols">{{car[col.field]}}</td>
        </tr>
      </ng-template>
    </p-table>
  `
  })
export class AppComponent  {
  public dataSource: any[];
  public data: any[];
  public cols: any[];
  public totalRecords;

  constructor(private service: AppService,
              private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.data = this.service.getData(100000);
    this.totalRecords = this.data.length;

    this.cols = [
      { field: 'ThreadId', header: 'ThreadId' },
      { field: 'Timestamp', header: 'Timestamp' },
      { field: 'TrackingId', header: 'TrackingId' },
      { field: 'UserId', header: 'UserId' },
    ];
  }

  public loadDataOnScroll(event: LazyLoadEvent) {
    if (this.data) {
      console.log('start ' + +new Date());
      console.log(event.first);
      console.log(event.rows);
      this.dataSource = this.data.slice(event.first, (event.first + event.rows));
      this._cdr.detectChanges();
      console.log('ende ' + +new Date());
    }
  }
}