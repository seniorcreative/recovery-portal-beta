<template>
  <figure class="flex justify-center items-center border border-gray-dark rounded-lg p-4 my-6">
          <i class="icon-info mr-4 text-blue text-md" />
          <!-- TODO: Swap content for dynamic language...  -->
          <p class="flex-auto leading-6" v-bind:class="classNames">{{content}}</p>
    </figure>
</template>

<script>
export default {
    name: 'Recovery Notification Box',
    props: {
        content: String,
        classNames: String
    }
}
</script>
