import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[addRounded]',
  standalone: true
})
export class ImgStyleDirectiveDirective {
  color: string = "red"
  @Input() radius1: string = "50px";
  @Input() radius2:string="5px dotted";

  constructor(private elementRef: ElementRef) {

  }
  ngOnChanges(): void {
  this.elementRef.nativeElement.style.border=`5px dotted ${this.color}`;

  }
@HostListener('mouseover') func1(){
  this.elementRef.nativeElement.style.opacity=".7";
  }
@HostListener('mouseout') func2(){
  this.elementRef.nativeElement.style.borderRadius=`${this.radius2}`;
  this.elementRef.nativeElement.style.opacity="1";
}
}
