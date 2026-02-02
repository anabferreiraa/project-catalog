<script lang="ts">
	let classH3 = 'font-bold'

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
                numero: number;
                bairro:string;
            }
};
interface Props {
		company?: Company;
	}

const {
    company = {
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
        numero: 275,
        bairro: 'Vila Seixas'
    }
    }
}:Props = $props()

</script>

<section >
	<div class="flex flex-col lg:flex-row lg:justify-center gap-7 p-6 lg:items-center">
		<div class="space-y-4">
			<img src={company.imagelogo.dir} alt={company.imagelogo.alt}>
			<p >
				{company.copywriter.biography}
			</p> 
		</div>
		<div class="grid grid-cols-1 space-y-4 lg:grid-cols-3 lg:space-x-10 lg:space-y-0 xl:space-x-0">
			<div class="flex flex-col">
				<h3 class={classH3} >Contate-nos</h3>
				<a
					target="_blank "
			       href="mailto:{company}"
				> {company.social.email}</a
				>
				<a
					target="_blank "
					
					href={company.social.whatsapp}>{company.social.phone}</a
				>
				<a target="_blank " href={company.maps}
					>
					{company.address.rua + ', ' + company.address.bairro + ' '}
					<br />
					{company.address.cidade + ' ' + company.address.cep}
				</a>
			</div>
			<div class="flex flex-col">
				<h3 class={classH3}>Siga-nos</h3>
				<a
					target="_blank "
					
					href={company.social.instagram}
				>
			 Instagram</a
				>
				<a
					target="_blank "
					href={company.social.linkedin}
				>
					Linkedin</a
				>
				<a
					target="_blank "
					href={company.social.facebook}
				>
					 Facebook</a
				>
				<a
					target="_blank "
					href={company.social.youtube}> You Tube</a
				>
			</div>
			<div class="flex flex-col">
				<h3 class={classH3}>Termos</h3>
				<a href="/termos-de-uso">Termos de uso</a>
                 
				   <!-- <a class="" href="/">Politicas de Privacidade</a> -->
			</div>
		</div>
	</div>
</section>