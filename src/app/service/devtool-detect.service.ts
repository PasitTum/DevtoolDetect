import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './analytic.service';

@Injectable({
  providedIn: 'root',
})
export class DevToolsDetectionService {
  private devToolsOpened = false;
  private redirectCount = 0;
  private maxRedirects = 3;
  private intervalIds: number[] = [];

  constructor(
    private ngZone: NgZone, 
    private router: Router,
    private analyticsService: AnalyticsService,) {}

  startDetection(): void {
    this.detectDevTools();
    const intervalId = window.setInterval(() => this.detectDevTools(), 2000);
    this.intervalIds.push(intervalId);
  }

  private detectDevTools(): void {
    this.checkDevToolsRegular();
    this.checkDevToolsWithDebugger();
    this.checkDevToolsWithPerformance();
    this.checkDevToolsWithConsole();
  }

  private checkDevToolsRegular(): void {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile && (widthThreshold || heightThreshold)) {
      this.handleDevToolsOpen();
    }
  }

  private checkDevToolsWithDebugger(): void {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) {
      this.handleDevToolsOpen();
    }
  }

  private checkDevToolsWithPerformance(): void {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      this.handleDevToolsOpen();
    }
  }

  private checkDevToolsWithConsole(): void {
    const consoleCheck = () => {
      const startTime = performance.now();
      (console as any).profile();
      (console as any).profileEnd();
      const endTime = performance.now();
      if (endTime - startTime > 20) {
        this.handleDevToolsOpen();
      }
    };
    consoleCheck();
  }

  private handleDevToolsOpen(): void {
    if (!this.devToolsOpened) {
      this.devToolsOpened = true;
      this.redirectCount++;
      if (this.redirectCount <= this.maxRedirects) {
        this.redirectToHome();
      } else {
        this.disableApp();
      }
    }
  }

  // private redirectToHome(): void {
  //   this.ngZone.run(() => {
  //     var width = window.outerWidth +'/'+ window.innerWidth;
  //     var height = window.outerHeight+'/'+ window.innerHeight;
  //     this.analyticsService.eventEmitter('detect_tools', 'devtooldetect', width+','+height , 1 );
  //     this.router.navigate(['/detecttools']);
  //   });
  // }

  private redirectToHome(): void {
    try {
      this.ngZone.run(() => {
        let width = '0/0';
        let height = '0/0';
        
        try {
          width = `${window.outerWidth}/${window.innerWidth}`;
          height = `${window.outerHeight}/${window.innerHeight}`;
        } catch (windowError) {
          console.warn('Error accessing window dimensions:', windowError);
        }
  
        const dimensions = `${width},${height}`;
        
        try {
          this.analyticsService.eventEmitter('detect_tools', 'devtooldetect', dimensions, 1);
        } catch (analyticsError) {
          console.error('Error emitting analytics event:', analyticsError);
        }
  
        this.router.navigate(['/detecttools']).catch(navigationError => {
          console.error('Navigation error:', navigationError);
        });
      });
    } catch (error) {
      console.error('Unexpected error in redirectToHome:', error);
      // Fallback navigation if everything else fails
      window.location.href = '/detecttools';
    }
  }

  private disableApp(): void {
    document.body.innerHTML = '<h1>การเข้าถึงถูกปฏิเสธ</h1>';
    this.stopDetection();
  }

  stopDetection(): void {
    this.intervalIds.forEach((id) => window.clearInterval(id));
    this.intervalIds = [];
  }
}