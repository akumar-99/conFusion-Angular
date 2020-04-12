import { browser, by, element } from 'protractor';

// export class AppPage {
//   navigateTo(): Promise<unknown> {
//     return browser.get(browser.baseUrl) as Promise<unknown>;
//   }

//   getTitleText(): Promise<string> {
//     return element(by.css('app-root .content span')).getText() as Promise<string>;
//   }
// }

export class AppPage {
  navigateTo(link: string) {
    return browser.get(link);
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }
}
