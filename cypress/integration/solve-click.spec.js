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
    cy.get(".lesson-list-item-content").eq(6).click();

    for (let i = 0; i < 100; i++) {
      cy.get(".exercise-main-btn").click();

      cy.get("body")
        .then(($body) => {
          if ($body.find(".multiple-choice-result-item-is-correct").length) {
            return ".multiple-choice-result-item-is-correct";
          }
          return ".input-answer-is-correct";
        })
        .then((selector) =>
          cy
            .get(selector)
            .then(($els) =>
              Cypress.$.makeArray($els).map((el) => el.innerText.trim())
            )
            .then((element) => cy.task("log", element))
        );

      cy.get(".exercise-main-btn").click();
    }
  });

  it("should write data", () => {
    cy.get("#era-login").type(email);
    cy.get("#era-password").type(password);

    cy.get("button[type=submit]").click();
    cy.get(".access-course").click();

    // Modify here
    cy.get(".mission-lesson-title").eq(0).click();
    cy.get(".lesson-list-item-content").eq(6).click();

    cy.task("readFile").then((data) => {
      for (let i = 1; i < data.split("#").length; i++) {
        cy.get("body")
          .then(($body) => {
            if ($body.find(".question-gap").length) {
              return ".question-gap";
            }
            return "";
          })
          .then((selector) => {
            if (selector === ".question-gap") {
              cy.get(".question-gap").each((gap, gapIndex, gaps) => {
                cy.get(".multiple-choice-btn").each((el, index, elements) => {
                  cy.wrap(el)
                    .invoke("text")
                    .then((text) => {
                      if (gaps.length === 1) {
                        if (text.trim() === data.split("#")[i]) {
                          cy.wrap(el).click();
                        }
                      } else {
                        if (
                          text.trim() ===
                          data.split("#")[i].split(",")[gapIndex]
                        ) {
                          cy.wrap(el).click();
                        }
                      }
                    });
                });
              });
            } else {
              cy.get(".multiple-choice-btn").each((el, index, elements) => {
                cy.wrap(el)
                  .invoke("text")
                  .then((text) => {
                    if (text.trim() === data.split("#")[i]) {
                      cy.wrap(el).click();
                    }
                  });
              });
            }

            cy.get(".exercise-main-btn").click();
            cy.get(".exercise-main-btn").click();
          });
      }
    });
  });
});

// cy.get("body")
//   .then(($body) => {
//     console.log($body.find(".btn-primary-ghost"));
//     if ($body.find(".btn-primary-ghost").length) {
//       return ".btn-primary-ghost";
//     }

//     return ".exercise-main-btn";
//   })
//   .then((selector) => {
//     if (selector === ".btn-primary-ghost") {
//       cy.task("readFile").then((data) => {
//         for (let i = 1; i < data.split("#").length; i++) {
//           cy.get(".multiple-choice-btn").each((el) => {
//             cy.wrap(el)
//               .invoke("text")
//               .then((text) => {
//                 console.log({
//                   text,
//                   data: data.split("#"),
//                   isTrue: data.split("#") === text.trim(),
//                 });

//                 if (text.trim() === data.split("#")[i]) {
//                   cy.wrap(el).click();
//                 }
//               });
//           });
//           cy.get(".exercise-main-btn").click();
//           cy.get(".exercise-main-btn").click();
//         }
//       });
//     }
//   });
