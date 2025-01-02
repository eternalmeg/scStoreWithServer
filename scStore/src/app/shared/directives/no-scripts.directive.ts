import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoScripts]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoScriptsDirective,
      multi: true,
    },
  ],
})
export class NoScriptsDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;


    if (value && /<.*?>|<\/.*?>|script/gi.test(value)) {
      return { noScripts: true };
    }

    return null;
  }
}

