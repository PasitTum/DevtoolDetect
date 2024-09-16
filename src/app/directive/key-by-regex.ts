import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[KeyByRegex]',
})
export class KeyByRegex {
  constructor(private el: ElementRef) {}

  @Input() KeyByRegex: string | undefined;

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    let e = <KeyboardEvent>event;
    if (this.KeyByRegex) {
      if (
        [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
        // keyCode 190 =  "." and "ใ" same code
        ([190].indexOf(e.keyCode) !== -1 && e.key.charCodeAt(0) != 3651) ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      let ch = e.key;
      let regEx = new RegExp(this.KeyByRegex);
      if (regEx.test(ch)) return;
      else e.preventDefault();
    }
  }
}
