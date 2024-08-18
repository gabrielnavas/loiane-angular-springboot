import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryUppercase'
})
export class CategoryUppercasePipe implements PipeTransform {

  transform(value: string): string {
    const firstLetter = value[0]
    const firstLetterUpperCase = firstLetter.toUpperCase();
    const restWord = value.substring(1);
    return `${firstLetterUpperCase}${restWord}`;
  }

}
