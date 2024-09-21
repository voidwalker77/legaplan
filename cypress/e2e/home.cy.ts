/// <reference types="cypress" />
import '../support/commands'

describe('Página Home - Tarefas', () => {
    beforeEach(() => {
        localStorage.clear()
        cy.visit('http://localhost:3000/home-tarefas')
    })

    it('deve renderizar o logo corretamente', () => {
        cy.get('img').should('have.attr', 'alt', 'Logo da Focal Point')
    })

    it('deve mostrar um texto de saudação ao usuário', () => {
        cy.get('h2').should('contain.text', 'Bem-vindo de volta, Marcus')
    })

    it('deve mostrar a data atual no cabeçalho', () => {
        cy.getCurrentDate().then((date) => {
            cy.get('p').contains(date)
        })
    })

    it("deve mostrar o título 'suas tarefas de hoje' na seção de novas tarefas", () => {
        cy.get('[data-cy="mainCard-title"]').should(
            'contain.text',
            'Suas tarefas de hoje',
        )
    })

    it("deve mostrar a mensagem de 'Nenhuma tarefa para fazer.' quando não houver tarefas", () => {
        cy.get('[data-cy="noTasksMessage"]').should(
            'contain.text',
            'Nenhuma tarefa para fazer.',
        )
    })

    it("deve mostrar o título 'tarefas finalizadas' na seção de tarefas finalizadas", () => {
        cy.get('[data-cy="mainCard-title"]').should(
            'contain.text',
            'Tarefas finalizadas',
        )
    })

    it("deve mostrar a mensagem de 'Nenhuma tarefa finalizada.' quando não houver tarefas", () => {
        cy.get('[data-cy="noTasksMessage"]').should(
            'contain.text',
            'Nenhuma tarefa finalizada.',
        )
    })

    it('deve adicionar uma nova tarefa', () => {
        cy.get('button').contains('Adicionar nova tarefa').click()
        cy.get('input').type('Nova tarefa')
        cy.get('[data-cy="addtask-modalbutton"]')
            .find('button')
            .eq(1)
            .contains('Adicionar')
            .click()
        cy.get('[data-cy="mainCard-title"]').contains('Suas tarefas de hoje')
        cy.get('[data-cy="tasks"]')
            .find('div')
            .find('span')
            .eq(1)
            .should('contain.text', 'Nova tarefa')
    })

    it('deve abrir o modal de adicionar tarefa e permitir o cancelamento', () => {
        cy.get('button').contains('Adicionar nova tarefa').click()
        cy.get('input').type('Nova tarefa')
        cy.get('button').contains('Cancelar').click()
        cy.get('button').contains('Adicionar nova tarefa').should('be.visible')
    })

    it('deve marcar uma tarefa como concluída', () => {
        cy.get('button').contains('Adicionar nova tarefa').click()
        cy.get('input').type('Nova tarefa teste')
        cy.get('[data-cy="addtask-modalbutton"]')
            .find('button')
            .eq(1)
            .contains('Adicionar')
            .click()
        cy.get('[data-cy="mainCard-title"]').contains('Suas tarefas de hoje')
        cy.get('[data-cy="tasks"]').find('div').find('span').eq(0).click()
        cy.get('[data-cy="mainCard-title"]').contains('Tarefas finalizadas')
        cy.get('[data-cy="tasks"]')
            .find('div')
            .find('span')
            .eq(1)
            .should('contain.text', 'Nova tarefa teste')
    })

    it('deve abrir o modal de deletar tarefa e confirmar a remoção', () => {
        cy.get('button').contains('Adicionar nova tarefa').click()
        cy.get('input').type('Tarefa para deletar')
        cy.get('[data-cy="addtask-modalbutton"]')
            .find('button')
            .eq(1)
            .contains('Adicionar')
            .click()
        cy.get('[data-cy="mainCard-title"]').contains('Suas tarefas de hoje')
        cy.get('[data-cy="tasks"]')
            .find('div')
            .find('span')
            .eq(1)
            .should('contain.text', 'Tarefa para deletar')

        cy.get('[data-cy="tasks"]').find('div').find('svg').first().click()

        cy.get('[data-cy="removeTask-modalbutton"]')
            .find('button')
            .eq(1)
            .contains('Deletar')
            .click()
    })
})
