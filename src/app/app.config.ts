import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
// 导入全部图标
import * as bootstrapIcons from '@ng-icons/bootstrap-icons';
import * as heroiconsOutline from '@ng-icons/heroicons/outline';
import * as heroiconsSolid from '@ng-icons/heroicons/solid';
// 导入路由
import { routes } from './app.routes';
// 导入动画
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// 导入markdown
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
        },
      },
    }),
    importProvidersFrom(
      NgIconsModule.withIcons({
        ...bootstrapIcons,
        ...heroiconsOutline,
        ...heroiconsSolid,
      }),
    )
  ]
};
