import { Component, OnDestroy, OnInit } from '@angular/core';
import { DevToolsDetectionService } from './service/devtool-detect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'devtoolDetect';
  public constructor(

    private dtDevtool : DevToolsDetectionService
  ){

  }

  ngOnInit(){
    this.dtDevtool.startDetection();
  }
  ngOnDestroy(): void {
    this.dtDevtool.stopDetection();
  }

}
