<script lang="ts">
	interface Images {
		dir: string;
		name: string;
		alt: string;
	}

	interface Props {
		images?: Images;
	}

	let {
		images = {
			dir: '/image/brandlogo/',
			name: 'OUSADA',
			alt: 'logo escrito ousada em azul escuro'
		}
	}: Props = $props();
</script>

<section>
    <div class="w-full flex justify-center p-8">
         <img src="{images.dir + images.name}.webp" alt={images.alt}>
    </div>
</section>