/* eslint no-unsafe-finally: "error"*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchTerm: any, searchBy: string): any {
    // when our serach is undefined or null
    if (!searchTerm) {
      return items;
    }

    // when there is partial or full match of the search term
    return items.filter((item: any) => {
      const currentItem = item[searchBy];
      /* eslint-disable */
      return currentItem.toString().toLowerCase().includes(searchTerm.trim().toLowerCase());
    });
  }
}
