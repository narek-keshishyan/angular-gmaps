import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum, LanguageShortEnum } from './core/enums/language.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  selectedLanguage = LanguageEnum.ENGLISH;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(LanguageShortEnum.EN);
    translate.use(LanguageShortEnum.EN);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    if (lang === LanguageShortEnum.EN) {
      this.selectedLanguage = LanguageEnum.ENGLISH;
    } else if (lang === LanguageShortEnum.GR) {
      this.selectedLanguage = LanguageEnum.GREEK;
    }
  }

  ngOnInit() {
  }

}
