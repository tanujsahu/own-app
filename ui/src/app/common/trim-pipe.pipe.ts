import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      console.log("blank value trim pipe Trim::)");
      return ''
    }
    const val = value.trim();
    console.log("Final Trim: trim pipe:)", val);
    return val;
  }

}
