<template>
  <div>
    <div class="bg-white py-6 md:mt-10 md:py-12">
      <div class="container">
        <recovery-heading
          :title="'Resources to support your recovery'"
          :para="'While you\'re receiving treatment for your injury there are plenty of activities you can do to keep you in the right head space, and aid your recovery.'"
        />
      </div>
    </div>
    <div class="bg-beige py-6 md:mt-10 md:py-12">
      <div class="container">
        <recovery-heading
          :title="'Free resources and articles'"
          :para="'Free resources from reputable organisations are a great place to start'"
        />
        <div id="scroller" class="overflow-x-scroll overflow-y-hidden">
          <div class="flex justify-start cursor-pointer">
            <recovery-article
              v-for="(item, index) in fra"
              class="flex flex-col mr-2 md:mr-6 mb-2 card"
              v-bind:key="`recovery_fra_article_${index}`"
              :img="item.img"
              :title="item.title"
              :para="item.para"
              :uri="item.uri"
              :border-classes="'border-b-8 border-yellow'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-6 md:mt-10 md:py-12">
      <div class="container">
        <recovery-heading
          :title="'Better Health Channel articles'"
          :para="'For information on health conditions, health services or tips for healthy living.'"
        />
        <div id="scroller" class="overflow-x-scroll overflow-y-hidden">
          <div class="flex justify-start cursor-pointer">
            <recovery-article
              v-for="(item, index) in fss"
              class="flex flex-col mr-2 md:mr-6 mb-2 card"
              v-bind:key="`recovery_fss_article_${index}`"
              :img="item.img"
              :title="item.title"
              :para="item.para"
              :uri="item.uri"
              :border-classes="'border-gray-variant-1 border-2'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecoveryArticle from './RecoveryArticle.vue'
import RecoveryHeading from './RecoveryHeading.vue'
export default {
  components: { RecoveryHeading, RecoveryArticle },
  name: 'Recovery - Resources',
  data() {
    return {
      fra: [
        {
          img: 'rr-fra-mindspot@2x.png',
          title: 'Mindspot',
          para: 'Free assessment and treatment courses for adults from the team at Macquarie University, Sydney.',
          uri: 'https://localhost:3000/'
        },
        {
          img: 'rr-fra-headtohealth@2x.png',
          title: 'Head to Health',
          para: 'Useful resources including apps, online programs, forums, and phone services. Provided by the Australian department of health.',
          uri: 'https://localhost:3000/'
        },
        {
          img: 'rr-fra-naturetherapy@2x.png',
          title: 'Nature therapy',
          para: 'Research indicates that spending time in nature improves your health. Read the article from the ABC and Parks Victoria.',
          uri: 'https://localhost:3000/'
        }
      ],
      fss: [
         {
          img: 'rr-fss-lifeline@2x.png',
          title: '131 144',
          para: 'A 24-hour telephone service that offers confidential support and advice to help you deal with stress and personal challenges.',
          uri: 'https://localhost:3000/'
        },
         {
          img: 'rr-fss-beyondblue@2x.png',
          title: '1300 244 636',
          para: 'An information line that offers expert information on depression; how to get help and how to stay well.',
          uri: 'https://localhost:3000/'
        },
         {
          img: 'rr-fss-nurseoncall@2x.png',
          title: '1300 606 024',
          para: 'A 24-hour telephone service that allows people to discuss any health-related issue with a registered nurse.',
          uri: 'https://localhost:3000/'
        }
      ],
      bhc: [
         {
          img: 'rr-bhc-logo@2x.png',
          title: '',
          para: '',
          uri: ''
        }
      ]
    }
  }
}
</script>
