<template>
  <div class="bg-white rounded-xl py-4 px-4 md:px-8 md:py-8">
        <header class="flex justify-between pb-2 md:pb-6 items-center border-b-2 border-gray">
            <p class="font-bold text-lg">{{treatmentType}}</p>
            <recovery-status :status="'Available now'" />
        </header>
        <p class="pt-4 md:pt-6 pb-8 md:pb-24">{{desc}}</p>
        <recovery-payment-table :payments="payments" :headings="tableHeadings" />
        <router-link v-if="providerLink" class="inline-block text-blue block my-4 border-blue border-b-2" :to="{ path: '/provider'}" >Find a provider <i class="icon-arrow-right text-sm" style="line-height: 0;" /></router-link>
  </div>
</template>

<script>
import RecoveryStatus from "./RecoveryStatus.vue"
import RecoveryPaymentTable from "./RecoveryPaymentTable.vue"
import { currencyValue } from "../../shared/utils"

export default {
    name: 'Recovery Treatment Panel',
    components: { RecoveryStatus, RecoveryPaymentTable },
    props: {
        treatmentType: String,
        desc: String
    },
    data() {
        return {
            currencyValue,
            payments: [
                {
                    name: 'Initial',
                    amount: 11790
                },
                {
                    name: 'Standard',
                    amount: 6431
                },
            ],
            tableHeadings: [
                'Consultation',
                'WorkSafe will pay'
            ],
            providerLink: false
        }
    }
}
</script>