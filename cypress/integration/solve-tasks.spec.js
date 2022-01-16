describe("ols", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://app.erasmusplusols.eu/");
  });

  it("should read data", () => {
    cy.task("cleanUp");

    cy.get("#era-login").type(email);
    cy.get("#era-password").type(password);

    cy.get("button[type=submit]").click();
    cy.get(".access-course").click();

    // Modify here
    cy.get(".mission-lesson-title").eq(0).click();
    cy.get(".lesson-list-item-content").last(3).click();

    // On or of for different tasks
    cy.get(".center-content").click();

    for (let i = 0; i < 100; i++) {
      cy.get(".exercise-main-btn").click();
      cy.get(".input-answer-is-correct")
        .then(($els) => {
          // we get a list of jQuery elements
          // let's convert the jQuery object into a plain array
          return (
            Cypress.$.makeArray($els)
              // and extract inner text from each
              .map((el) => el.innerText.trim())
          );
        })
        .then((element) => cy.task("log", element));

      cy.get(".exercise-main-btn").click();
    }
  });

  it("should write data", () => {
    cy.get("#era-login").type(email);
    cy.get("#era-password").type(password);

    cy.get("button[type=submit]").click();
    cy.get(".access-course").click();

    // cy.get(".sidebar").scrollTo("top");
    // cy.get(".mission-title").eq(2).click();

    // Modify here
    cy.get(".mission-lesson-title").eq(0).click();
    cy.get(".lesson-list-item-content").last(3).click();

    // On or of for different tasks
    cy.get(".center-content").click();

    cy.task("readFile").then((data) => {
      console.log(data);

      for (let i = 1; i < data.split("#").length; i++) {
        cy.get(".question-input").each((el, index, elements) => {
          if (elements.length !== 1) {
            cy.wrap(el).type(data.split("#")[i].split(",")[index]);
          } else {
            cy.wrap(el).type(data.split("#")[i]);
          }
        });
        cy.get(".exercise-main-btn").click();
        cy.get(".exercise-main-btn").click();
      }
    });
  });
});
