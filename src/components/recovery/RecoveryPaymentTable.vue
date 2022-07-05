<template>
  <table class="table-auto w-full" style="margin-bottom:5px;">
        <thead class="">
            <tr>
                <th class="rounded-tl-lg bg-gray-light text-left p-2"><strong>{{headings[0]}}</strong></th>
                <th class="rounded-tr-lg bg-gray-light text-right p-2"><span class="font-normal">{{headings[1]}}</span></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(payment, index) in payments" v-bind:key="index" class="pb-8 border-b-2 border-gray">
                <td class="p-2">{{payment.name}}</td>
                <td class="p-2 text-right"><strong>{{currencyValue(payment.amount)}}</strong></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { currencyValue } from "../../shared/utils"
export default {
    name: 'Recovery Table',
    data() {
        return {
            currencyValue
        }
    },
    props: {
        payments: Array,
        headings: Array
    }

}
</script>
