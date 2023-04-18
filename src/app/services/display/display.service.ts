import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  displayValue(value: string): string {    
    if (value === null || value === undefined) {
      console.log('value is null or undefined');
      return '';
    }
    else if (/^\d+(\.\d+)?$/.test(value as any)){
    const size = parseFloat(value);

      if (size >= 1 && size < 1024) {
        return size.toFixed(0);
      }
      else if (size > 0 && size < 1) {
        return (size * 100).toFixed(2) + '%'
      }
      else if (size === 0) {
        return '0';
      }
      else{
      const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
      const roundedSize = (size / Math.pow(1024, exponent)).toFixed(1);
      return roundedSize + " " + units[exponent];
      }
    }
    else if ((value as any).length > 10) {
      return (value as any).substring(0, 10) + "...";
    }
    return (value as any).toString();
  }
}

