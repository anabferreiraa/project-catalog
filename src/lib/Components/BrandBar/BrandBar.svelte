<script lang="ts">
	interface Images {
		name: string;
		alt: string;
	}

	interface Props {
		images?: Images;
	}

	let {
		images = {
			name: 'logoipsum',
			alt: 'logo marca da loja'
		}
	}: Props = $props();
</script>

<section>
    <div class="w-full flex justify-center p-8">
         <img src="{images.name}" alt={images.alt}>
    </div>
</section>