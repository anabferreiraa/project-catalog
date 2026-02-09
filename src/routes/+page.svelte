<script>
	import bannerDate from '$cms/banners.json'
	import BannerCarousel from '$lib/Section/Banner/BannerCarousel.svelte';
	import Footer from '$lib/Section/Footer/Footer.svelte';
	import generalConfigurationData from '$cms/general-configuration.json'
</script>

<BannerCarousel banners = {bannerDate.banners}        />

<Footer company = {{ name: generalConfigurationData.companyInformation.companyName,
                 biography: generalConfigurationData.companyInformation.descrition,
                 imagelogo: {
                  dir: generalConfigurationData.companyInformation.companyBrand.brand,
                  alt: generalConfigurationData.companyInformation.companyBrand.descrition},
				  contacts: {
					email: generalConfigurationData.companyInformation.contacts.email,
					phone: generalConfigurationData.companyInformation.contacts.phone,
					whatsapp: generalConfigurationData.companyInformation.contacts.whatsapp
				  },
				  social: {
					instagram: generalConfigurationData.companyInformation.social.instagram,
					linkedin: generalConfigurationData.companyInformation.social.linkedin,
					facebook: generalConfigurationData.companyInformation.social.facebook,
					youtube: generalConfigurationData.companyInformation.social.youtube
				  },
				  cnpj: generalConfigurationData.companyInformation.cnpj,
				  maps: generalConfigurationData.companyInformation.maps,
				  address: {
					city: generalConfigurationData.companyInformation.adress.city,
					cep: generalConfigurationData.companyInformation.adress.cep,
					road: generalConfigurationData.companyInformation.adress.road,
					number: generalConfigurationData.companyInformation.adress.number,
					district: generalConfigurationData.companyInformation.adress.district,
					state: generalConfigurationData.companyInformation.adress.state

				  } }} />

