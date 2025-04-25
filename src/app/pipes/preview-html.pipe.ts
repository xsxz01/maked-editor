import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'previewHtml'
})
export class PreviewHtmlPipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }
}
