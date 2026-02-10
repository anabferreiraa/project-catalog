<script lang="ts">
	let classH3 = 'font-bold';
	const currentYear = new Date().getFullYear();

	interface CompanyInformation {
		companyName: string;
		descrition: string;
		companyBrand: {
			brand: string;
			descrition: string;
		};
		cnpj?: string;
		contacts: {
			email?: string;
			phone?: string;
			whatsapp?: string;
		};
		social: {
			instagram: string;
			linkedin: string;
			facebook: string;
			youtube: string;
		};
		maps: string;
		address: {
			city?: string;
			cep?: string;
			road?: string;
			number?: number;
			district?: string;
			state?: string;
		};
		openingHours: string;
		paymentMethods: string[];
	}
	interface Props {
		company?: CompanyInformation;
	}

	const {
		company = {
			companyName: 'Lorenzo e Guilherme Ferragens ME',
			descrition: 'fassdad',
			companyBrand: {
				brand: 'string',
				descrition: 'string'
			},
			cnpj: '60.957.421/0001-37',
			contacts: {
				email: 'diretoria@guilhermeferragens.com.br',
				phone: '(16) 98345-5065',
				whatsapp: '(16) 98345-5065'
			},
			social: {
				instagram: '',
				linkedin: 'What is Lorem Ipsum? Why do we use it',
				facebook: 'What is Lorem Ipsum? Why do we use it',
				youtube: ''
			},
			maps: '',
			address: {
				city: 'Ribeirão Preto',
				cep: '14020-078',
				road: 'Travessa Macau',
				number: 275,
				district: 'Vila Seixas',
				state: 'RF'
			},
			openingHours: '',
			paymentMethods: []
		}
	}: Props = $props();
</script>

<section>
	<div class="flex flex-col items-start gap-7 px-5 py-10 lg:flex-row lg:justify-between lg:px-20">
		<div class="space-y-4">
			<div class="h-auto w-47.5">
				<img src={company.companyBrand.brand} alt={company.companyBrand.descrition} />
			</div>
			<div class="max-w-sm">
				<p>
					{company.descrition}
				</p>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class={classH3}>Fale conosco</h3>
			<a class="underline" target="_blank " href="mailto:{company}"> {company.contacts.email}</a>
			<a class="underline" target="_blank " href={company.contacts.whatsapp}
				>{company.contacts.phone}</a
			>
			<!-- <a target="_blank " href={company.maps}
					>
					{company.address.road + ', ' + company.address.district + ' '}
					<br />
					{company.address.city + ' ' + company.address.cep}
				</a> -->
		</div>
		<div class="flex flex-col gap-2">
			<h3 class={classH3}>Horário de Atendimento</h3>
			<p class="max-w-50">{company.openingHours}</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class={classH3}>Siga-nos</h3>
			{#if company.social.instagram}
				<a class="underline" target="_blank " href={company.social.instagram}> Instagram</a>
			{/if}
			{#if company.social.linkedin}
				<a class="underline" target="_blank " href={company.social.linkedin}> Linkedin</a>
			{/if}
			{#if company.social.facebook}
				<a class="underline" target="_blank " href={company.social.facebook}> Facebook</a>
			{/if}
			{#if company.social.youtube}
				<a class="underline" target="_blank " href={company.social.youtube}> You Tube</a>{/if}
		</div>
		<div class="flex flex-col gap-2">
			<h3 class={classH3}>Termos</h3>
			<a class="underline" href="/termos-de-uso">Termos de uso</a>

			<a class="" href="/">Politicas de Privacidade</a>
		</div>
	</div>
	<div class="flex flex-col items-center justify-center gap-7 px-5 pb-10">
		<div class="flex flex-col items-center justify-center gap-6">
			<h3>Formas de pagamento</h3>
			<div class="flex gap-6">
				{#each company.paymentMethods as itens}
					<div class=" rounded-xl border border-gray-600/40 px-3 py-1 shadow-md">
						<p>{itens}</p>
					</div>
				{/each}
			</div>
		</div>

		<div>
			<p class=" text-center text-sm font-extralight">
				&copy; {currentYear} · {company.companyName} · CNPJ: {company.cnpj}. {company.address.road +
					', ' +
					company.address.number +
					' - ' +
					company.address.district +
					' '}
				{company.address.city + ' / ' + company.address.state}
			</p>
		</div>
	</div>
</section>
