<template>
    <div class="field has-addons">
        <p  class="control is-expanded">
        <input type="number" class="input" placeholder="Hours per week worked" :v-bind="AverageWeeklyHours">
        <input type="number" class="input" placeholder="Hours per week worked" :v-bind="payment_OrdinaryEarnings">
        <select v-bind="payment_TimePeriod">
            <option :for="option in TimePeriods" :key="`item-${index}`">
                {{ option }}
            </option>
        </select>
        </p>
        <p  class="control">
        <a class="button" @click="search()">
            search
        </a>
        </p>
    </div>
</template>
<script>
const TimePeriods={
    DAY:1,
    WEEK:5,
    FORTNIGHT:10,
}
const BenefitTypes = {
    NonPercuniaryBenefits:1
}

function benefit(amount, deductible, type, ...args) {
    console.logs(args)
    this.amount = amount;
    this.deductible = deductible;
    if(Object.values(BenefitTypes).indexOf(type)) {
        this.type = type
    }
}

export default {
    name: 'PaymentsCalc',
    components:{
    },
    mounted(){
        this.SearchValue = this.mountSearchValue
    },
    data() {
        return {
            isEmployer:true,
            AverageWeeklyHours:36,
            payment_OrdinaryEarnings:1322.50,
            payment_TimePeriod:TimePeriods.WEEK,
            Benefits:[]
        }
    },
    methods: {
        search:function(){
            this.$emit('searching',this.SearchValue)
        },
        Calculate:function(){

        },
        AddBenefit:function(amount, deductible, type) {
            this.Benefits.push(new benefit(amount, deductible, type))
        }
    }
}
</script>