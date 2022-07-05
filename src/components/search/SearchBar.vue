<template>
    <div class="my-3 md:mt-10 relative" @onsubmit="search()">
        <input type="text" class="w-full input is-medium focus:ring" placeholder="What can we help you with?" v-model="SearchValue">
        <button type="button" v-bind:disabled="!SearchValue" class="absolute p-3 top-0 right-0 text-black icon cursor-pointer" v-bind:class="btnDisabledClass" @click="search()">
            <i class="ws-recoveryicon_search"></i>
        </button>
         <p class="text-md my-4 text-left">
          <strong>Try something like</strong>&nbsp;<span class="text-gray-500"
            >"Find a provider for my injury"</span
          >
        </p>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        mountSearchValue: String
    },
    mounted(){
        this.SearchValue = this.mountSearchValue
    },
    data() {
        return {
            SearchValue:""
        }
    },
    methods: {
        search:function(){
            this.$emit('searching',this.SearchValue)
        }
    },
    computed: {
        btnDisabledClass () {
            return !this.SearchValue ? 'btnDisabled' : ''
        }
    }
}
</script>

<style lang="scss" scoped>
    input.input, a.button {
        background: #FFFFFF;
        color: #000000;
        border-radius: 12px;
        padding-left: 16px;
        height: 56px !important;
        &::-webkit-input-placeholder, &::placeholder {
            color: #787878;
            font-size: 1em;
        }
    }

    button[disabled], .btnDisabled {
        opacity: 0.3;
        pointer-events: none;
    }
</style>