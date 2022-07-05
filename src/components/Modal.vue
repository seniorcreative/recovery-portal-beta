<template>
  <div class="modal overflow-y-scroll top-0 left-0 w-full h-full z-50" v-bind:class="activeClass">
    
    <div
      class="
        fixed
        inset-0
        bg-gray-dark bg-opacity-50
        overflow-y-auto
        h-full
        w-full
      "
      @click="closeModal"
    ></div>

    <div
      class="
        relative
        top-10
        mx-auto
        p-8
        border-2
        border-gray
        md:w-3/4
        w-10/12
        rounded-xl
        bg-white
      "
    >
      <div class="text-left">
        <header class="p-0 relative">
          <p class="font-bold text-lg">Personalise your experience</p>
          <button
            class="absolute top-0 right-0 rounded-md py-2 text-black text-right"
            aria-label="close"
            @click="closeModal"
          ><i class="icon-x-close text-2xl relative -top-4 -right-2"></i></button>
        </header>
        <div class="">
          <!-- Content ... -->
          <form action="" class="">
            <div class="my-4">
              <label class="flex text-blue font-bold">Select your WorkSafe agent</label>
              <p class="my-1 text-sm block">This will help make things easier to understand in the information you read.</p>

                <div class="min-w-1/4 my-3 inline-block border-gray-dark border-2 px-2 rounded-md select-wrapper">
                  <select v-model="agentName" class="w-full p-2 focus:outline-none" placeholder="Select...">
                    <option value="undefined">Select...</option>
                    <option v-for="(item, index) in agents" v-bind:key=index v-bind:value=item>{{item}}</option>
                  </select>
                </div>
            </div>

            <div class="my-4">
              <label class="flex text-blue font-bold">Select your language <TranslateIcon class="ml-2 text-black w-6 h-6" /></label>
              <p class="my-1 text-sm block">Information will be translated wherever possible into your native language.</p>
                <div class="my-3 inline-block border-gray-dark border-2 px-2 rounded-md select-wrapper">
                  <select v-model="userLanguage" class="w-full p-2 focus:outline-none" placeholder="Select language...">
                    <option v-for="(item, index) in languages" v-bind:disabled="item.disabled" v-bind:key=index v-bind:value=item>{{item.name}}</option>
                  </select>
                </div>
            </div>
          </form>
        </div>
      </div>
      <footer class="flex flex-col md:flex-row justify-start items-center">
        <button class="w-full md:w-auto bg-blue py-2 px-6 mb-4 md:mb-0 md:mr-4 rounded-lg text-white text-md" @click="saveModal">
          Save changes
        </button>
        <button class="w-full md:w-auto bg-gray py-2 px-6 rounded-lg text-black text-md" @click="cancelModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'
import { TranslateIcon } from '@heroicons/vue/solid'

export default {
  props: {
    activeClass: String,
  },
  components: { TranslateIcon },
  data() {
    return {
      agentName: '',
      userLanguage: null,
      agents: [
          'Allianz', 'Gallagher Bassett', 'EML', 'X-changing'
      ],
      languages: [
          { name: 'English', disabled: false},
          { name: '中国人', disabled: true}
      ]
    }
  },
  name: 'Modal',
  methods: {
    closeModal() {
      this.$emit('onCloseModal')
    },
    saveModal() {
      store.commit('content/setPersonalisation', this.personalisationObject)
      this.$emit('onCloseModal')
    },
    cancelModal() {
      this.$emit('onCloseModal')
    }
  },
  computed: {
    ...mapState(['content']),
    personalisationObject() {
      return {
        agentName: this.agentName,
        userLanguage: this.userLanguage
      }
    }
  },
  mounted() {
    if (this.content.contentData && this.content.contentData.personalisation) {
      this.agentName = this.content.contentData.personalisation.contentFilterData.agentName
    }
    this.userLanguage = this.languages[0] // Hard wired as English for now
  }
}
</script>

<style lang="scss">
    .select-wrapper {
            min-width: 200px;
    }
</style>