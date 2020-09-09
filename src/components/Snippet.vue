<template>
	<pre>
		{{ code }}
	</pre>
</template>

<script>
import { VColumn } from '@pathscale/vue3-ui'

const Snippet = {
		name: 'Snippet',
		props: {
				code: String
		},
		components: { VColumn }
};
export default Snippet;
</script>
