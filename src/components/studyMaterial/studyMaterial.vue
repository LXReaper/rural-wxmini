<template>

</template>
<script setup lang="ts">
import {withDefaults, defineProps} from "vue"

interface Props {
  products: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})
</script>


<style scoped lang="scss">

</style>
