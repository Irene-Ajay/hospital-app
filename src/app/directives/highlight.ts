import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlight >= 4.8) {
      this.el.nativeElement.style.border = '2px solid gold';
      this.el.nativeElement.style.boxShadow = '0 0 8px rgba(255,215,0,0.5)';
    }
  }
}