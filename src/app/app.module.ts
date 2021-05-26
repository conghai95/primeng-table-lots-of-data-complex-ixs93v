import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { AppService } from './app.service';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, TableModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ AppService ]
})
export class AppModule { }
