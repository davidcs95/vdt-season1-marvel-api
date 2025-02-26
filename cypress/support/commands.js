// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//adiciona comandos customizados ao Cypress
Cypress.Commands.add('setToken', function(){
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'david@qacademy.io',
            password: 'qa-cademy'
        },
        failOnStatusCode: false
    }).then(function(response){
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast', function(){
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/62c3471ee4fe300016cd911a',
        failOnStatusCode: false
    }).then(function(response){
        expect(response.status).to.eql(200)
    })
})

// POST requisição que testa o cadastro de personagens
Cypress.Commands.add('postCharacter', function(payload){
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

// GET requisição que testa a obtenção de personagens
Cypress.Commands.add('getCharacters', function(){
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

// GET requisição que testa a obtenção de personagens dado um ID
Cypress.Commands.add('getCharacterById', function(characterId){
    cy.api({
        method: 'GET',
        url: '/characters/'+ characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

// DELETE requisição que testa a remoção de personagens dado um ID
Cypress.Commands.add('deleteCharacterById', function(characterId){
    cy.api({
        method: 'DELETE',
        url: '/characters/'+ characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

// GET requisição que testa a busca de um personagem
Cypress.Commands.add('searchCharacters', function(characterName){
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {name: characterName},
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

Cypress.Commands.add('searchAndDeleteCharacters', function(characterName){
    cy.searchCharacters(characterName).then(function(response){
        if(response.body.length > 0){
            cy.deleteCharacterById(response.body[0]._id)
        }
    })
})

Cypress.Commands.add('populateCharacters', function(characters){
    characters.forEach(function(c){
        cy.postCharacter(c)
    })
})