import { Pipe, PipeTransform } from '@angular/core';
import { product } from './interfaces/product';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(productlist:product[],term:string): product[] {
    return productlist.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
  }

}
