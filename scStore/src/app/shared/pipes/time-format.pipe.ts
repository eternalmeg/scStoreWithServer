import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(date: string | undefined): string {
    if (!date) {
      return 'Invalid date'; // Ако датата е празна
    }

    const parsedDate = moment(date, moment.ISO_8601, true);

    if (!parsedDate.isValid()) {
      return 'Invalid date';
    }

    return parsedDate.fromNow();
  }
}
