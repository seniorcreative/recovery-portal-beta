<template>
  <div class="border-t border-gray-dark mt-6 py-3">
    <div
      v-if="showVote"
      class="flex justify-center items-center px-10 md:px-96"
    >
      <p class="mr-6 leading-4 font-bold text-md">Was your question answered?</p>
      <div>
        <i
          @click="voteUp"
          class="icon-thumbs-up text-2xl mr-4"
          v-bind:class="btnDisabledUp"
        />
        <i
          @click="voteDn"
          class="icon-thumbs-down text-2xl"
          v-bind:class="btnDisabledDn"
        />
      </div>
    </div>
    <div v-if="!showVote" class="flex justify-center">
      <p class="m-0 p-2 text-md font-bold">
        Thanks for your feedback.
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import store from '../store/index'

export default {
  name: 'Feedback',
  props: {
    contentId: Number
  },
  data() {
    return {
      showVote: true,
      voting: false,
      score: null
    }
  },
  methods: {
    voteUp() {
      this.sendVote(1)
    },
    voteDn() {
      this.sendVote(0)
    },
    sendVote(score) {
      this.score = score
      this.voting = true
      const axiosInstance = axios.create()
      axiosInstance.post(`content/${this.contentId}/feedback/${score}`, {}, {})
        .then(response => {
          this.showVote = false
          this.voting = false
          // Store locally
          var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
          if (matomoSiteId !== '5') {
            window._paq.push(['trackEvent', 'Feedback', 'success', this.contentId])
          }
          store.commit('feedback/storeVoted', { ID: this.contentId, SCORE: score })
          return response.data
        }).catch((err) => {
          var matomoSiteId = window.location.host.split('.')[0] === 'wsv-innovation-centre' ? '3' : '5'
          if (matomoSiteId !== '5') {
            window._paq.push(['trackEvent', 'Feedback', 'error', this.contentId])
          }
          console.error('error with POST feedback score', err)
          return null
        })
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
    btnDisabledUp() {
      let classes = []
      if (this.score === 1) classes.push('text-yellow')
      if (this.voting) classes = classes.concat(['opacity-50', 'pointer-events-none'])
      if (!this.voting) classes.push('cursor-pointer')
      return classes.join(' ')
    },
    btnDisabledDn() {
      let classes = []
      if (this.score === 0) classes.push('text-yellow')
      if (this.voting) classes = classes.concat(['opacity-50', 'pointer-events-none'])
      if (!this.voting) classes.push('cursor-pointer')
      return classes.join(' ')
    }
  },
  mounted() {
    if (this.feedbackObject[this.contentId]) {
      this.showVote = !this.feedbackObject[this.contentId].voted
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
}
.top-border {
  border-top: 2px solid #f2f2f2;
  margin-top: 48px;
}
</style>