<script lang="ts">
	let classH3 = 'font-bold'
    const currentYear = new Date().getFullYear();

    interface CompanyInformation {
            name: string;
            imagelogo: {
                dir: string;
                alt: string;
            },
            biography: string;
			contacts : {
                email?: string;
                phone?: string;
                whatsapp?: string;
			},
            social: {
                instagram: string;
                linkedin:string;
                facebook:string;
                youtube:string;
            },
            cnpj?: string;
            maps:string;
            address: {
                city?: string;
                cep?: string;
                road?: string;
                number?: number;
                district?:string;
				state?:string;
            }
};
interface Props {
		company?: CompanyInformation;
	}

const {
    company = {
    name: 'Lorenzo e Guilherme Ferragens ME',
    imagelogo: {
        dir: "string",
        alt: "string",
    },
    biography: 'fassdad',
	contacts : {
        email: 'diretoria@guilhermeferragens.com.br',
        phone: '(16) 98345-5065',
        whatsapp: '(16) 98345-5065',
	},
    social: {
        instagram: 'What is Lorem Ipsum? Why do we use it',
        linkedin:'What is Lorem Ipsum? Why do we use it',
        facebook:'What is Lorem Ipsum? Why do we use it',
        youtube:'',
    },
    cnpj: '60.957.421/0001-37',
    maps:'',
    address: {
        city: 'Ribeirão Preto',
        cep: '14020-078',
        road: 'Travessa Macau',
        number: 275,
        district: 'Vila Seixas',
		state: 'RF'
    }
    }
}:Props = $props()

</script>

<section >
	<div class="flex flex-col lg:flex-row lg:justify-between gap-7 px-20 py-10 items-start ">
		<div class="space-y-4">
			<div class="w-47.5 h-auto">
              <img src={company.imagelogo.dir} alt={company.imagelogo.alt}>
			</div>
			<p >
				{company.biography}
			</p> 
		</div>
			<div class="flex flex-col gap-2">
				<h3 class={classH3} >Fale conosco</h3>
				<a
					target="_blank "
			       href="mailto:{company}"
				> {company.contacts.email}</a
				>
				<a
					target="_blank "
					
					href={company.contacts.whatsapp}>{company.contacts.phone}</a
				>
			  <!-- <a target="_blank " href={company.maps}
					>
					{company.address.road + ', ' + company.address.district + ' '}
					<br />
					{company.address.city + ' ' + company.address.cep}
				</a> -->
				<h3 class={classH3} >Horário de Atendimento</h3>
			</div>
			<div class="flex flex-col gap-2">
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
			 <div class="flex flex-col gap-2">
				<h3 class={classH3}>Termos</h3>
				<a href="/termos-de-uso">Termos de uso</a>
                 
				    <a class="" href="/">Politicas de Privacidade</a> 
			</div> 
		
	</div>
	<div class="flex flex-col justify-center items-center py-10 gap-7">
		<div>
			<h3>Formas de pagamento </h3>
		</div>
		<div>
      <p class=" font-extralight text-sm">
		&copy; {currentYear} - {company.name} CNPJ: {company.cnpj}. {company.address.road + ', ' + company.address.number + ' - '  + company.address.district + ' '}
			  {company.address.city + ' / ' + company.address.state}
	   </p>
		</div>
	
	</div>
</section>