import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'removeWhitespace'
})
export class RemoveWhitespacePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      console.log("blank value remove white space");
      return '';
    }
    const val = value.replace(/\s/g, "");
    console.log("remove white space::)", val);
    return val;
  }

  // custom validator to check that no white space in starting of input
  noWhiteSpace(control: AbstractControl): ValidationErrors | null | any {
  if (control.errors && !control.errors.whitespace) {
      return;
  }
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
  
}

  

}
