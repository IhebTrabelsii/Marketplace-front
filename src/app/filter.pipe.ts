import { Pipe, PipeTransform } from '@angular/core';
import { ProductAdmin } from './Models/ProductAdmin';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any[] | null, searchText: string): any[] | null {
    if (!value) return null; 
    if (!searchText) return value;

    searchText = searchText.toLowerCase();
    return value.filter((item: ProductAdmin) => {
      return JSON.stringify(item).toLowerCase().includes(searchText);
    });
  }
}
