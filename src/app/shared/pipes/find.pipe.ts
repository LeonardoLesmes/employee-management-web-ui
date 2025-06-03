import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find',
  standalone: true
})
export class FindPipe implements PipeTransform {
  transform<T>(array: T[], property: keyof T, value: any): T | undefined {
    if (!array || array.length === 0) {
      return undefined;
    }
    
    return array.find(item => item[property] === value);
  }
}
