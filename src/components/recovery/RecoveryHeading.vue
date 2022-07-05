<template>
    <blockquote>
    <!-- TODO: Swap content for dynamic values from content.[CC].json -->
    <h3 v-if="title" class="font-bold text-2xl text-blue mb-4" v-bind:class="classNamesTitle">{{title}}</h3>
    <p v-if="para" class="text-black text-lg mb-4 leading-6" v-bind:class="classNamesPara">{{para}}</p>
    </blockquote>
</template>

<script>
export default {
    name: 'Recovery Heading',
    props: {
        title: String,
        para: String,
        classNamesTitle: String,
        classNamesPara: String
    }
}
</script>
