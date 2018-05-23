import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'emptyIfNull' })
export class EmptyIfNullPipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if (value == null)
            return '';
        else
            return value;
    }
}