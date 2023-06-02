import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    // (83) 9 9999-8888
    if (value.length == 11) {
      return '(' + value.substring(0, 2)
        + ') ' + value.substring(2, 3)
        + ' ' + value.substring(3, 7)
        + '-' + value.substring(7, 11);
    }else if(value.length == 8){
      return value.substring(0, 3)
        + '-' + value.substring(4, 7);
    }

    return value;
  }

}
