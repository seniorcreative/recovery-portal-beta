<template>
  <div class="rounded-lg bg-white" style="height: fit-content;">
      <header @click="toggleExpanded()" class="p-4 cursor-pointer w-full flex justify-center items-center">
        <i class="icon-tick text-green text-xl mr-4" style="line-height: 0;" />
        <p class="font-bold flex-auto">{{title}}</p>
        <i class="text-gray-dark text-4xl" v-bind:class="iconClass" style="line-height: 0;" />
      </header>
      <div class="px-4 pb-4" v-if="expanded">
          <p class="py-4 border-t-2 border-gray-light">{{desc}}</p>
          <recovery-payment-table :payments="payments" :headings="tableHeadings" />
          <router-link v-if="providerLink" class="inline-block text-blue block my-4 border-blue border-b-2" :to="{ path: '/provider'}" >Find a provider <i class="icon-arrow-right text-sm" style="line-height: 0;" /></router-link>
      </div>
  </div>
</template>

<script>
import RecoveryPaymentTable from "./RecoveryPaymentTable.vue"

export default {
    name: 'Recovery service item',
    components: { RecoveryPaymentTable },
    props: {
        title: String,
        desc: String,
        payments: Array,
        tableHeadings: Array,
        providerLink: Boolean
    },
    data() {
        return {
            expanded: false
        }
    },
    methods: {
        toggleExpanded () {
            this.expanded = !this.expanded
        }
    },
    computed: {
        iconClass () {
            return this.expanded ? 'icon-chevron-up' : 'icon-chevron-down'
        }
    }
}
</script>
