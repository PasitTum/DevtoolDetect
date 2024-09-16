
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevToolDetectComponent } from './page/devtool-detect/devtool-detect.component';
import { DevToolsDetectionService } from './service/devtool-detect.service';
import { HomeComponent } from './page/home/home.component';
import { TwoDigitDecimaNumberDirective } from './directive/two-digit-decimal-number.directive';
import { NumberDirective } from './directive/numbers-only.directive';
import { KeyByRegex } from './directive/key-by-regex';
import { NumbersOnlyComponent } from './page/numbers-only/numbers-only.component';

@NgModule({
  declarations: [
    AppComponent,
    DevToolDetectComponent,
    HomeComponent,
    NumbersOnlyComponent,
    TwoDigitDecimaNumberDirective,
    NumberDirective,
    KeyByRegex
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DevToolsDetectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
