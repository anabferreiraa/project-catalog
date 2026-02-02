interface Company {
            name: string;
            imagelogo: {
                dir: string;
                alt: string;
            },
            copywriter:{
                biography: string;
            },
            social: {
                email: string;
                phone: string;
                whatsapp: string;
                instagram: string;
                linkedin:string;
                facebook:string;
                youtube:string;
            },
            cnpj: string;
            maps:string;
            address: {
                cidade: string;
                cep: string;
                rua: string;
                numero: string;
                bairro:string;
            }
};

export const company: Company = {
    
    name: 'Lorenzo e Guilherme Ferragens ME',
    imagelogo: {
        dir: "string",
        alt: "string",
    },
    copywriter:{
        biography: 'fassdad'
    },
    social: {
        email: 'diretoria@guilhermeferragens.com.br',
        phone: '(16) 98345-5065',
        whatsapp: '(16) 98345-5065',
        instagram: 'What is Lorem Ipsum? Why do we use it',
        linkedin:'What is Lorem Ipsum? Why do we use it',
        facebook:'What is Lorem Ipsum? Why do we use it',
        youtube:'',
    },
    cnpj: '60.957.421/0001-37',
    maps:'Lorem Ipsum',
    address: {
        cidade: 'Ribeirão Preto',
        cep: '14020-078',
        rua: 'Travessa Macau',
        numero: '275',
        bairro: 'Vila Seixas'
    }
    
}
