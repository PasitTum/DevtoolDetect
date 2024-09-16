import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor() { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventLabel: string = '',
    eventValue: number = 0,
    formData?: FormGroup
  ) {
    let eventParams: any = {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    };

    if (formData) {
      // เพิ่มข้อมูลจาก form
      const safeFormData = this.getSafeFormData(formData);
      eventParams = { ...eventParams, ...safeFormData };
    }

    gtag('event', eventName, eventParams);
  }

  private getSafeFormData(form: FormGroup): any {
    const safeData: any = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.value) {
        // ตรวจสอบและปรับแต่งข้อมูลที่ละเอียดอ่อน
        if (this.isSensitiveField(key)) {
          safeData[key] = this.maskSensitiveData(control.value);
        } else {
          safeData[key] = control.value;
        }
      }
    });
    return safeData;
  }

  private isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = ['password', 'email', 'phone', 'creditCard'];
    return sensitiveFields.some(field => fieldName.toLowerCase().includes(field));
  }

  private maskSensitiveData(value: string): string {
    // ปกปิดข้อมูลที่ละเอียดอ่อน
    return value.replace(/./g, '*');
  }
}