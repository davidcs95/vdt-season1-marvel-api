import characters from '../utils/constants/constants'

describe('POST /characters', function(){

    it('Deve cadastrar um personagem', function(){
        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        //Busca e remoção de personagem implementada devido o não reset do ambiente rodando pela interface do cypress
        cy.searchAndDeleteCharacters(character.name)
        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('Quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        }

        before(function(){
            cy.searchAndDeleteCharacters(character.name)
            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(201)
            })
        })

        it('Não deve cadastrar duplicado', function(){

            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    
    context('Valida campos obrigatórios', function(){

        characters.forEach(character =>{
            it('Validando campo ' + character.scenario, function(){
                cy.postCharacter(character.payload)
                    .then(function(response){
                        expect(response.status).to.eql(400)
                        expect(response.body.validation.body.message).to.eql(character.response_message)
                    })
            })
        })
    })
})