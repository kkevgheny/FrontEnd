import { SemanticFitPage } from './app.po';

describe('semantic-fit App', () => {
  let page: SemanticFitPage;

  beforeEach(() => {
    page = new SemanticFitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
