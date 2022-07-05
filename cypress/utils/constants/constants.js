const characters = [
    {
        scenario: 'Name omitido',
        payload: {
            alias: 'Mercurio',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        },
        response_message: '\"name\" is required'
    },
    {
        scenario: 'Name vazio',
        payload: {
            name: '',
            alias: 'Mercurio',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        },
        response_message: '\"name\" is not allowed to be empty'
    },
    {
        scenario: 'Alias omitido',
        payload: {
            name: 'Pietro Maximoff',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        },
        response_message: '\"alias\" is required'
    },
    {
        scenario: 'Alias vazio',
        payload: {
            name: 'Pietro Maximoff',
            alias: '',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
            active: true
        },
        response_message: '\"alias\" is not allowed to be empty'
    },
    {
        scenario: 'Team omitido',
        payload: {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            active: true
        },
        response_message: '\"team\" is required'
    },
    {
        scenario: 'Team vazio',
        payload: {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [''],
            active: true
        },
        response_message: '\"team[0]\" is not allowed to be empty'
    },
    {
        scenario: 'Active omitido',
        payload: {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'Vingadores da Costa Oeste',
                'Irmandade de Mutantes'
            ],
        },
        response_message: '\"active\" is required'                
    }
]

export default characters;