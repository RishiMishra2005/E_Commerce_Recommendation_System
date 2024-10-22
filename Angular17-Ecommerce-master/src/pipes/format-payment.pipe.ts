import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard',
  standalone: true
})
export class FormatPaymentPipe implements PipeTransform {

  transform(value: string): string  {
    if (value && value.length === 16) {
      // Format the credit card number
      return value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 – $2 – $3 – $4');
    } else {
      return value;
    }
  }
  }


