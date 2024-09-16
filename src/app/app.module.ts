
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevToolDetectComponent } from './page/devtool-detect/devtool-detect.component';
import { DevToolsDetectionService } from './service/devtool-detect.service';
import { HomeComponent } from './page/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DevToolDetectComponent,
    HomeComponent
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
