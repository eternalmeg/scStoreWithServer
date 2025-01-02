import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoSpacesOrTabs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoSpacesOrTabsDirective,
      multi: true,
    },
  ],
})
export class NoSpacesOrTabsDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || value.trim() === '') {

      return { noSpacesOrTabs: true };
    }
    return null;
  }
}
