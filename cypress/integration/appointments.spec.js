describe("appointments", () => {
  beforeEach(function () {
    cy.visit("/");
  })
  it("should book an interview", () => {
    cy.request("GET", "/api/debug/reset")
    //Visit tuesday
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    // Clicks on the "Add" button in the second appointment
    cy.get(':nth-child(1) > .appointment__add > .appointment__add-button')
      .click()
    // Enters their name
    cy.get('[data-testid=student-name-input]')
      .click()
      .type('Cypress robot hihihi')
    // Chooses an interviewer
    cy.get(':nth-child(1) > .interviewers__item-image')
      .click()
    // Clicks the save button
    cy.get('.button--confirm')
      .click()
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Cypress robot hihihi");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    cy.get("[alt=Delete]").click({ force: true });
    // Clicks the confirm button
    cy.get('.appointment__actions > :nth-child(2)').click()
    // Sees that the appointment slot is empty
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .should("not.exist");
  });
});

