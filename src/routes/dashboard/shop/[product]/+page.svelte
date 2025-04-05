<script lang="ts">
    let { data } = $props()

    let { product, productImages } = $derived(data)

    console.log(data)
</script>

<section>
    <h1>Item: {product?.name}</h1>
    <h1>Item: {product?.price}</h1>
   <img src="{product?.imageUrl}" alt="">
</section>


<style>
  img {
    max-width: 30svw;
  }
</style>