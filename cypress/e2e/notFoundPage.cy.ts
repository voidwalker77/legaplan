
/// <reference types="cypress" />

describe("Página 404 - Not Found", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/erro");
    });

    it("deve renderizar o código 404 e a mensagem de página não encontrada", () => {
        cy.get("h1").should("contain.text", "404");
        cy.get("p").should("contain.text", "Página não encontrada");
    });

    it("deve exibir o botão de redirecionamento para a página inicial", () => {
        cy.get("button").contains("Voltar para Home").should("be.visible");
    });

    it("deve redirecionar para a página inicial ao clicar no botão", () => {
        cy.get("button").contains("Voltar para Home").click();
        cy.url().should("include", "/home-tarefas");
    });
});
