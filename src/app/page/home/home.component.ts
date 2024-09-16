import { Component, OnDestroy, OnInit } from "@angular/core";
import { DevToolsDetectionService } from "src/app/service/devtool-detect.service";

@Component({
    selector: 'home-components',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})


export class HomeComponent  {


    title = 'devtoolDetect';
}