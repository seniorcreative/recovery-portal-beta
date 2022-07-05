<template>
  <div class="md:rounded-xl md:bg-green-light py-3 md:px-5 flex justify-between items-center">
      <p class="hidden md:inline-block text-green mr-4 text-sm">{{status}}</p>
      <i class="icon-tick text-green text-xl" style="line-height: 0;"></i>
  </div>
</template>

<script>
export default {
    name: 'Recovery Status',
    props: {
        status: String
    }
}
</script>