<template>
  <div class="py-3 md:w-3/4">
    <div v-if="!feedbackGiven">
      <div v-if="optionType == 'thumbs'">
        <p v-if="!voting" class="font-bold mt-4 mb-0 text-md">
          Was your question answered?
        </p>
        <div class="mt-2 mb-4">
          <i
            @click="voteUp"
            class="icon-thumbs-up text-2xl cursor-pointer mr-4"
            v-bind:class="btnVotedUp"
          />
          <i
            @click="voteDn"
            class="icon-thumbs-down text-black text-2xl cursor-pointer"
            v-bind:class="btnVotedDn"
          />
        </div>
      </div>
      <div v-if="optionType == 'stars'">
        <p v-if="!voting" class="font-bold mt-4 mb-2 text-md">
          Please rate your experience using this page</p>
          <div class="flex justify-start items-center">
            <i class="text-4xl mr-2 p-0" v-bind:class="starClass1" @click="voteScore(1)"></i>
            <i class="text-4xl mr-2 p-0" v-bind:class="starClass2" @click="voteScore(2)"></i>
            <i class="text-4xl mr-2 p-0" v-bind:class="starClass3" @click="voteScore(3)"></i>
            <i class="text-4xl mr-2 p-0" v-bind:class="starClass4" @click="voteScore(4)"></i>
            <i class="text-4xl mr-2 p-0" v-bind:class="starClass5" @click="voteScore(5)"></i>
          </div>
      </div>
      <div class="mt-6 mb-4" v-if="feedbackScore !== 0">
        <p class="mb-4 text-md font-bold">Could you please tell us more?</p>
        <div
          class="inline-block mb-6"
          v-for="(answer, index) in answers"
          v-bind:key="index"
        >
          <input
            type="checkbox"
            class="hidden"
            v-model="answerSelections"
            :value="answer"
            :id="`answer_${index}`"
          />
          <label
            class="
              rounded-full
              text-black
              py-2
              px-4
              cursor-pointer
              mr-3
              text-sm
              md:text-md
              select-none
            "
            :for="`answer_${index}`"
          >
            {{ answer }}
          </label>
        </div>
        <textarea
          class="
            mt-0
            p-2
            mb-4
            block
            border border-gray-dark
            rounded-lg
            w-full
            md:w-96
          "
          rows="3"
          maxlength="500"
          placeholder="other..."
          v-model="feedbackText"
        ></textarea>
      </div>
      <button
        type="button"
        @click="submitFeedback"
        class="
          inline-block
          flex
          justify-between
          items-center
          rounded-xl
          mt-2
          px-4
          py-3
          bg-yellow
          font-bold
        "
        v-bind:disabled="isDisabled"
        v-bind:class="btnDisabled"
        v-if="feedbackScore != 0"
      >
        <span v-if="!voting">Submit</span
        ><i v-if="!voting" class="icon-arrow-right ml-3 text-black"></i>
        <span v-if="voting"> Submitting... </span>
      </button>
    </div>
    <div v-if="feedbackGiven">
      <p v-if="!voting" class="mt-4 text-md" v-html="responseText"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import store from '../store/index'

export default {
  name: 'Feedback Plus',
  props: {
    contentPageId: String,
    optionType: String // 'stars' or 'thumbs'
  },
  data() {
    return {
      allowFeedback: true,
      voting: false,
      isContactable: false,
      feedbackText: '',
      emailAddress: '',
      btnYesClass: 'is-outlined',
      btnNoClass: 'is-outlined',
      feedbackScore: 0,
      answerOptions: {
        'thumbs': {
          '1': ['easy to navigate', 'great layout', 'I found what I was looking for quickly'],
          '-1': ['confusing to read', 'too much text', 'I didn\'t find what I was looking for', 'information is too general'],
        },
        'stars': {
          '1': ['Confusing to read', 'Too much text', 'I didn\'t find what I was looking for', 'Unclear layout', 'Information is too general'],
          '2': ['Confusing to read', 'Too much text', 'Unclear layout', 'I didn\'t find what I was looking for', 'Information is too general'],
          '3': ['Too much text', 'Information is too general', 'Easy to read', 'Easy to navigate', 'Good layout'],
          '4': ['Easy to read', 'Good layout', 'Easy to navigate', 'Relevant information', 'I found what I was looking for'],
          '5': ['Easy to read', 'Good layout', 'Easy to navigate', 'Relevant information', 'I found what I was looking for'],
        }
      },
      answerSelections: []
    }
  },
  methods: {
    voteUp() {
      this.feedbackScore = 1
      this.answerSelections = []
    },
    voteDn() {
      this.feedbackScore = -1
      this.answerSelections = []
    },
    voteScore(score) {
      this.feedbackScore = score
      this.answerSelections = []
    },
    submitFeedback() {
      this.voting = true
      // note - content page feedback is for pages , not content records which have an ID index. So setting that to zero in this case.
      const feedbackObject = { feedback: { CONTENT_PAGE: this.contentUri, SCORE: this.feedbackScore, FEEDBACK: JSON.stringify(this.feedbackConcat) } }
      const axiosInstance = axios.create()
      axiosInstance.post(`/content/${this.contentPageId}/feedback/`, feedbackObject, {}).then(response => {
        this.allowFeedback = false
        this.voting = false
        // Store locally
        var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
        if (matomoSiteId !== '5') {
          window._paq.push(['trackEvent', 'Feedback Plus', 'success', this.contentUri])
        }
        store.commit('feedback/storeFeedback', feedbackObject)
        return response.data
      }).catch((err) => {
        var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
        if (matomoSiteId !== '5') {
          window._paq.push(['trackEvent', 'Feedback Plus', 'error', this.contentUri])
        }
        console.error('error with POST feedback detailed', err)
        return null
      })
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  },
  computed: {
    ...mapState(['content', 'feedback']),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    feedbackObject() {
      return this.$store.state && this.$store.state.feedback.feedbackData
    },
    isDisabled() {
      return this.voting || this.feedbackConcat.length < 1
    },
    btnDisabled() {
      return this.feedbackConcat.length > 0 ? '' : 'disabled select-none'
    },
    feedbackGiven() {
      const fbObject = this.feedbackObject[this.contentUri]
      return fbObject
    },
    contentUri() {
      return this.$router.currentRoute.value.fullPath
    },
    responseText() {
      let feedback = ''
      if (this.feedbackGiven) {
        feedback = `<strong>Thank you for your feedback.</strong><br>Your experience matters to us.<br><br>The Innovation Team at WorkSafe Victoria`
      }
      return feedback
    },
    btnVotedUp() {
      return this.feedbackScore === 1 ? 'text-yellow' : 'text-black'
    },
    btnVotedDn() {
      return this.feedbackScore === -1 ? 'text-yellow' : 'text-black'
    },
    answers() {
      return this.answerOptions[this.optionType][String(this.feedbackScore)]
    },
    feedbackConcat() {
      const copySelections = JSON.parse(JSON.stringify(this.answerSelections))
      return this.feedbackText ? copySelections.push(this.feedbackText) && copySelections : copySelections
    },
    starClass1 () {
      return this.feedbackScore > 0 ? 'icon-star text-yellow' : 'icon-star-outline text-gray-dark'
    },
    starClass2 () {
      return this.feedbackScore > 1 ? 'icon-star text-yellow' : 'icon-star-outline text-gray-dark'
    },
    starClass3 () {
      return this.feedbackScore > 2 ? 'icon-star text-yellow' : 'icon-star-outline text-gray-dark'
    },
    starClass4 () {
      return this.feedbackScore > 3 ? 'icon-star text-yellow' : 'icon-star-outline text-gray-dark'
    },
    starClass5 () {
      return this.feedbackScore > 4 ? 'icon-star text-yellow' : 'icon-star-outline text-gray-dark'
    },
  }
}
</script>

<style scoped lang="scss">
i {
  line-height: 0 !important;
}
input[type="checkbox"] ~ label {
  background-color: white;
  border: 1px solid #bababa;
}

input[type="checkbox"]:checked ~ label {
  background-color: #fdb813;
  border: 1px solid #fdb813;
}

button.disabled,
button[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>