import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

//                  !!IMPORTANT!!
// FOR TESTS TO WORK, SET AUTH PROPERTY isLogged TO TRUE!
//                  !!IMPORTANT!!


describe('Posts section', () => {
  let helper: AppPage;

  beforeEach(async () => {
    helper = new AppPage();

    await browser.waitForAngularEnabled(false);
    await browser.get('/');  // reload your SPA
  });

  it('Navigate to the edit post page', async () => {
    // code here to test...await this.editMode = true;
    await element(by.css('.e2e-posts')).click();
    await browser.sleep(1000);

    await element.all(by.css('.e2e-edit')).first().click();
    await browser.sleep(1000);

    expect(await element(by.css('h3')).getText()).toEqual('Edit Post');
  });

  it('Navigate to the new post page', async () => {
    // code here to test...
    await browser.sleep(1000);

    await element(by.css('.e2e-posts')).click();
    await browser.sleep(1000);

    await element(by.id('newPostBtn')).click();
    await browser.sleep(1000);

    expect(await element(by.css('h3')).getText()).toEqual('Create New Post');
  });


  it('Create new post', async () => {
        await helper.navigateToPosts();
        await browser.sleep(1000);
        const postsBeforeAdding: number = await (await element.all(by.tagName('mat-card'))).length;

        await helper.clickNewPostButton();
        await browser.sleep(1000);
        await element(by.id('titleInput')).sendKeys('Test Post');
        await element(by.id('textInput')).sendKeys('This is the text of the Test Post');
        await element(by.id('savePost')).click();
        await browser.sleep(1000);

        const postsAfterAdding: number = await (await element.all(by.tagName('mat-card'))).length;

        expect(postsAfterAdding).toEqual(postsBeforeAdding + 1);

    });

  it('Delete post', async () => {
    await element(by.css('.e2e-posts')).click();
    await browser.sleep(1000);
    const postsBeforeDeleting: number = (await element.all(by.tagName('mat-card'))).length;
    await browser.sleep(1000);
    await element.all(by.css('.e2e-edit')).last().click();
    await browser.sleep(1000);
    await element(by.id('deletePost')).click();
    await browser.sleep(5000);
    const postsAfterDeleting: number = (await element.all(by.tagName('mat-card'))).length;

    expect(postsAfterDeleting).toBeLessThan(postsBeforeDeleting);

  });

  it('Update post', async() => {
    await element(by.css('.e2e-posts')).click();
    await browser.sleep(1000);

    await element.all(by.css('.e2e-edit')).first().click();

    await browser.sleep(1000);
    await element(by.id('titleInput')).sendKeys('Test Post');
    await element(by.id('textInput')).sendKeys('This is the text of the Test Post');
    await element(by.id('savePost')).click();
    await browser.sleep(1000);
    expect(element.all(by.tagName('mat-card-title')).first().getText()).toContain('Test Post');
  });
});
