import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peopleHeight'
})
export class PeopleHeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value > 200) return 'High';
    else if (100 < value && value < 200) return 'Normal';
    else return 'Low';
  }
}
