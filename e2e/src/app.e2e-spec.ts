import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('conFusion app is running!');
  // });

  it('should display message saying Ristorante Con Fusion', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about page on link click', () => {
    page.navigateTo('/');
    let navlink = page.getAllElements('a').get(1);
    navlink.click();

    expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it('should enter comment for first dish', () => {
    page.navigateTo('/dishdetail/0');

    const newAuthor = page.getElement('input[type=text]');
    newAuthor.sendKeys('Test Author');

    const newComment = page.getElement('textarea');
    newComment.sendKeys('Test Comment');

    const newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();

    browser.pause();
  })

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
