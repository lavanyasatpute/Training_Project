import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderBy',
  standalone: false
})
export class OrderBy implements PipeTransform {
  transform(value: { [key: string]: any }[], ...keys: string[]): { [key: string]: any }[] {
    if (!value || !Array.isArray(value)) return [];

    return value.sort((a, b) => {
      const aValue = this.deepValue(a, keys);
      const bValue = this.deepValue(b, keys);

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue; 
      }

     
      return ('' + bValue).localeCompare('' + aValue);
    });
  }

  private deepValue(obj: any, keys: string[]): any {
    return keys.reduce((acc, key) => (acc && acc[key] != undefined ? acc[key] : null), obj);
  }


}
