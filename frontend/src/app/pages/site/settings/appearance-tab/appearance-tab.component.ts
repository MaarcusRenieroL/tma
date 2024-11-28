import { Component } from '@angular/core';

@Component({
  selector: 'appearance-tab',
  templateUrl: './appearance-tab.component.html',
})
export class AppearanceTabComponent {
  languages = [
    { name: "English", value: "en" },
    { name: "Spanish", value: "es" },
    { name: "Chinese (Simplified)", value: "zh-CN" },
    { name: "Chinese (Traditional)", value: "zh-TW" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Hindi", value: "hi" },
    { name: "Japanese", value: "ja" },
    { name: "Korean", value: "ko" },
    { name: "Portuguese", value: "pt" },
    { name: "Russian", value: "ru" },
    { name: "Arabic", value: "ar" },
    { name: "Italian", value: "it" },
    { name: "Dutch", value: "nl" },
    { name: "Turkish", value: "tr" },
    { name: "Thai", value: "th" },
    { name: "Vietnamese", value: "vi" },
    { name: "Indonesian", value: "id" },
    { name: "Bengali", value: "bn" },
    { name: "Polish", value: "pl" },
  ];
  selectedValueForLanguage: string = "";
  
  onOption(value: string) {
    // @ts-ignore
    this.selectedValueForLanguage = this.languages.find(language => language.value === value).name;
  }
}
