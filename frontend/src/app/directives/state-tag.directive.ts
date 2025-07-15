import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: "[appStateTag]",
  standalone: true,

})
export class StateTagDirective {
  @HostBinding("style.backgroundColor") background: string = "";
  @HostBinding("style.color") color: string = "";
  
  @Input()
    set appStateTag(state: string) {
      if (state === "normal") {
        this.background = "var(--panel-black)";
        this.color = "var(--main-white)";
      } else if (state === "advertencia") {
        this.background = "var(--green)";
        this.color = "var(--main-black)";
      } else if (state === "alerta") {
        this.background = "var(--main-green)";
        this.color = "var(--main-black)";
      }
  }
}
