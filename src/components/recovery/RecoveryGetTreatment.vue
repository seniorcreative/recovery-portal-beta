<template>
  <div v-if="contentObject && contentObject.dataCategories">
    <!-- Take note of the semantic html tags used here. There is a cure for divitis. -->

      <div class="bg-beige md:mt-10 py-2 md:py-12">

        <div class="container">

          <recovery-heading :title="'Available services'" :para="'You can use the following services to treat your injury'" />

          <!-- Services -->
          <div class="my-4 grid md:grid-rows-2 md:grid-rows-2 grid-cols-2 md:grid-flow-col gap-4">
            <div class="col-span-2 row-span-1 md:col-span-1 md:row-span-2">
              <recovery-treatment-panel :treatment-type="'General practitioner'" :desc="'Medical treatment and advice to support your overall recovery, rehabilitation and return to work'" />
            </div>
            <div class="col-span-2 md:col-span-1 row-span-1">
              <div class="bg-white rounded-xl p-4 md:p-8">
                <p class="font-bold mb-2">What WorkSafe will cover</p>
                <p class="mb-2">WorkSafe can pay reasonable costs of approved services but this doesn’t always mean payment of the full costs. Sometimes there might be a difference or gap between what a healthcare provider charges and what WorkSafe can pay.</p>
                <a href="#" class="text-blue underline">Fee schedule and policies</a>
              </div>
            </div>
            <div class=" col-span-2 md:col-span-1 row-span-1">
              <div class="bg-white rounded-xl p-4 md:p-8">
                <p class=""><strong>Example:</strong> If a GP charges $70 for a consultation</p>
                <!-- ultra basic progress bar -->
                <div class="my-4 w-full block p-3 relative" style="background: #E6F4FD;">
                  <div class="w-11/12 block p-3 absolute top-0 left-0 bg-blue"></div>
                </div>
                <div class="mt-4 grid grid-cols-2">
                  <div class="col-span-1">
                    <p>WorkSafe will pay</p>
                    <strong>{{currencyValue(exampleValues.WorkSafe)}}</strong>
                  </div>
                  <div class="col-span-1 text-right">
                    <p>You pay</p>
                    <strong>{{currencyValue(exampleValues.You)}}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification -->
          <!-- TODO: Swap content for dynamic language...  -->
          <recovery-notification-box :content="'WorkSafe can pay for either Physio, Osteo or Chiro at one time, but you are able to switch between them at any time. For example, you may see a physio initially for your injury, but after a month want to see a chiro instead. Talk to your agent if you\'re unsure.'" />

          <!-- Iterate over service items -->
          <div class="md:flex  gap-4">
            <recovery-service-item v-for="(item, index) in serviceItemTypes" class="mb-4 w-full md:mb-0 md:w-1/3" v-bind:key="index" 
            :title="item.name"
            :desc="item.desc"
            :payments="item.payments"
            :table-headings="item.headings"
            :provider-link="item.providerLink"
            />
          </div>

          </div>

      </div>

      <div class="md:mt-10 py-6 md:py-12">

        <div class="container">

          <recovery-heading :title="'Other available services'" :para="'There are many services that can be accessed with or without a referral or approval'" />
          
          <service-accordion-item v-for="(item, index) in servicesAvailable" v-bind:key="index" :title="item.title" :text="item.text" :services="item.services" />

          <!-- Accordions -->

          <recovery-notification-box :content="'There are many treatment and personal services WorkSafe can cover, please speak to your WorkCover agent to find out what services you can access'" :class-names="'text-lg text-blue font-semibold'" />

          <div class="block my-8 page-divider"></div>

          <recovery-heading :title="'Requesting a service process'" :para="'If you need a different service that requires a referral or approval you can follow this process'" />

          <!-- Numbered accordion list -->
          <ol class="mt-8">
            <recovery-treatment-accordion v-for="(item, index) in serviceProcessInstructions" v-bind:key="index" :num="item.num" :title="item.title" :desc="item.desc" />
          </ol>

          <div class="block my-8 page-divider"></div>

          <recovery-heading :title="'Claiming expenses for treatment'" :para="'WorkSafe prefers that your healthcare provider invoices your employer or your WorkSafe agent directly. Talk to your WorkSafe agent or employer to determine who your provider should invoice. WorkSafe will only pay for the approved cost of treatment.'" />


          <div class="grid md:grid-cols-3 mt-8 md:mt-24 gap-12">

            <div class="col-span-1 md:col-span-2">
              <div class="grid grid-cols-5 md:grid-cols-5">
                <div class="col-span-2 row-span-1 md:col-span-2 md:px-8">
                  <img src="../../assets/recovery-your-healthcare-provider@2x.png" width="108" class="mx-auto ounded-full"  alt="Recovery - Your health care provider">
                  <p class="font-bold text-center my-4 leading-2 text-md md:text-lg">Your healthcare provider</p>
                  <p class="text-center md:text-left text-sm md:text-md leading-2">Sends invoice directly to either employer or agent</p>
                </div>
                <div class="row-span-1 col-span-1 -mt-20 md:mt-0">
                  <div class="flex justify-center md:justify-around items-center h-full w-full">
                    <img class="inline-block md:px-2 md:mx-4 w-3 md:w-8" src="../../assets/recovery-doc-chevron-right@2x.png">
                    <img class="mx-2 md:mx-4 w-10 md:w-12"  src="../../assets/recovery-doc@2x.png">
                  </div>
                </div>
                <div class="col-span-2 row-span-1 md:col-span-2 md:px-8">
                  <img src="../../assets/recovery-your-worksafe-agent@2x.png" width="108" class="mx-auto rounded-full" alt="Recovery - Your WorkSafe agent">
                  <p class="font-bold text-center my-4 leading-2 text-md md:text-lg">Your WorkCover agent</p>
                  <p class="text-center md:text-left leading-2 text-sm md:text-md">If WorkCover agent receives the invoice they pay it</p>
                </div>
              </div>
            </div>

            <div class="col-span-1">
              <div class="rounded-2xl border-2 border-gray-dark px-4 md:px-8 pb-4 md:pb-8 pt-16 relative">
                  <img src="../../assets/recovery-you@2x.png" class="absolute left-1/2 -ml-14 -top-12 rounded-full" width="108" alt="Recovery - You">
                  <p class="font-bold text-2xl text-center md:my-4 my-2">You</p>
                  <p>If you choose to pay an account at the time of the service, then you should be <strong>reimbursed within 30 days</strong> from the time your WorkSafe agent <strong>receives your receipt</strong>. You need to send your receipts to your employer or WorkSafe agent within six months of the treatment.</p>
              </div>
            </div>

          </div>

          <div class="block my-8 page-divider"></div>

          <recovery-heading :title="'Find more information on recovery'" :class-names-title="'text-center'" />

          <router-link :to="{ path: '/help' }" class="w-3/4 md:w-1/4 flex items-center bg-blue p-4 my-6 mx-auto text-white rounded-lg font-bold justify-center">Visit the help centre<i class="icon-arrow-right text-white ml-4 leading-0 text-2xl" style="line-height: 0 !important;" /></router-link>

        </div>
      </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RecoveryHeading from './RecoveryHeading'
import RecoveryNotificationBox from './RecoveryNotificationBox'
import RecoveryServiceItem from './RecoveryServiceItem'
import RecoveryTreatmentPanel from './RecoveryTreatmentPanel'
import RecoveryTreatmentAccordion from './RecoveryTreatmentAccordion'
import ServiceAccordionItem from './ServiceAccordionItem'
import { currencyValue } from '../../shared/utils'

export default {
  components: { RecoveryNotificationBox, RecoveryHeading, RecoveryServiceItem, RecoveryTreatmentPanel, RecoveryTreatmentAccordion, ServiceAccordionItem },
  name: 'Recovery - Get Treatment',
  data() {
    return {
        currencyValue,
        // TODO: Move this content out to API or language file
        serviceItemTypes: [
          { name: "Physiotherapy", desc: "Physical injury diagnosis and treatment through exercise and manual therapy, self-management techniques, education and advice", headings: ['Consultation', 'WorkSafe will pay'], payments: [{ name: "Initial", amount: 11790 },{ name: "Standard", amount: 6431 }], providerLink: false},
          { name: "Chiropractic", desc: "Mainly focuses on treating the spine by examining and treating health conditions related to the bones, muscles and joints (musculoskeletal problems).", headings: ['Consultation', 'WorkSafe will pay'], payments: [{ name: "Initial", amount: 7360 },{ name: "Standard", amount: 5174 }], providerLink: false},
          { name: "Osteotherapy", desc: "A non-invasive manual therapy, aiming to manipulate and strengthen the musculoskeletal framework focusing on the joints, muscles, and spine.", headings: ['Consultation', 'WorkSafe will pay'], payments: [{ name: "Initial", amount: 10443 },{ name: "Standard", amount: 6986 }], providerLink: false},
        ],
        serviceProcessInstructions: [
          {num: '1',
          title: 'Talk to your health care provider',
          desc: '<p class="mb-4">Usually your healthcare provider is the one to recommend services you need. If you want other treatment, equipment or support get your healthcare providers opinion. Because they know you and your condition they can usually help you pick the best option.</p>'},
          {num: '2',
          title: 'Get a written referral',
          desc: '<p class="mb-4">If your healthcare provider agrees you need a new service ask them to write a referral or a request. Referrals for common services like gym/swim programs, equipment and household help can be written by doctors and physiotherapists, osteopaths and chiropractors.</p><p class="mb-4">Some services can only be requested by specific healthcare professionals. For instance, only medical practitioners like a GP can write a referral to see a dietitian as part of your claim. Physiotherapists, osteopaths and chiropractors can\'t.</p><p class="mb-4">If you want to know more about a service and who can write a referral you can find the policies <a href="https://www.worksafe.vic.gov.au/information-for-providers" target="_blank" rel="noopener noreferrer nofollow">here.</a></p>'},
          {num: '3',
          title: 'Send your referral for review',
          desc: '<p class="mb-4">Often your healthcare provider will send the referral directly to your agent. If they don\'t, you can send it to your agent. Some agents have a specific email address they like referrals sent to, so talk to your case manager to find out where to send yours.</p><p class="block my-4">When reviewing your request your agent will consider all available information including things like medical certificates, reports from treating health practitioners, your individual needs and circumstances and more.</p><p class="mb-4">Some requests can be approved quickly, but others may need more information. If this is the case your agent will contact you or your healthcare providers to ask for more details. You will be kept updated on the progress and expected timeframes.</p>'},
          {num: '4',
          title: 'Service is approved or rejected',
          desc: '<p class="mb-4">Once your request has been reviewed it will either be approved or rejected. If it\'s approved you can go ahead and book in a session or access the service. Read the approval letter to understand if there are any limitations.</p><p class="mb-4">If a request is rejected you will receive a letter clearly explaining why. If you disagree with the reasons you have the option to appeal the decision through a number of channels that will be explained in the letter.</p>'}
        ],
        servicesAvailable: [
          {
            title: 'Services you can access without a referral',
            services: [
              {uri: '',
              name: 'Ambulance',
              icon: 'icon-ambulance',
              tooltip: 'A vehicle equipped to provide emergency care to sick or injured people and to get them to hospital. Ambulances can also be used to transport patients between hospitals.'
              },
              {uri: '',
              name: 'MRI scan',
              icon: 'icon-mri',
              tooltip: 'Magnetic resonance imaging (MRI) is a type of scan that uses strong magnetic fields and radio waves to produce detailed images of the inside of the body.'
              },
              {uri: '',
              name: 'Podiatry<sup>*</sup>',
              icon: 'icon-pod',
              tooltip: 'A branch of medicine devoted to the study, diagnosis, and medical and surgical treatment of disorders of the foot, ankle, and lower extremity.'
              },
            ],
            text: '* Where your compensable injury directly relates to podiatry'
          },
          {
            title: 'Services that require medical practitioner referral and agent approval',
            services: [
              {uri: '',
              name: 'Gym and swim programs',
              icon: 'icon-Vector-3',
              tooltip: 'A gym and/or swimming memberships when required for rehabilitation and functional restoration following a work-related injury.<a href="https://www.worksafe.vic.gov.au/gym-and-swimming-memberships-policy" target="_blank" rel="nofollow noreferrer noopener">Learn more</a>'
              },
              {uri: '',
              name: 'Exercise physiology',
              icon: 'icon-gym',
              tooltip: 'Exercise Physiologists prescribe programs for rehabilitation and relief from pain and discomfort, as well as to treat many chronic health conditions.'
              },
              {uri: '',
              name: 'Psychology<sup>*</sup>',
              icon: 'icon-psychology',
              tooltip: 'Is the scientific study of the mind and behaviours, understanding mental processes and brain functions. This helps people implement the tools and strategies to stay mentally healthy when times are tough.'
              },
              {uri: '',
              name: 'Elective surgery',
              icon: 'icon-patient',
              tooltip: 'Surgery for which, in the opinion of the treating medical practitioner, admission can be delayed for at least 24 hours. Timing of elective surgery is based on clinical need or urgency.'
              },
              {uri: '',
              name: 'Equipment',
              icon: 'icon-broken-arm',
              tooltip: `Items that are used to assist an injured worker's recovery following a work-related injury or illness. Items may address one or more of the following aspects of a worker's life, from mobility and function, to relief of pain or discomfort.<a href="https://www.worksafe.vic.gov.au/equipment-and-related-services-policy" target="_blank" rel="noreferrer noopener nofollow">Learn more</a>`
              },
              {uri: '',
              name: 'Household help',
              icon: 'icon-mop-and-bucket',
              tooltip: `Household help is provided to replace only the labour component of routine household tasks performed pre injury or illness. Services are to support a worker regain independence during rehabilitation and are short term.<a href="https://www.worksafe.vic.gov.au/household-help-services-policy" target="_blank" rel="noreferrer noopener nofollow">Learn more</a>`
              }
            ],
            text: 'If you have a physical injury and need the assistance of mental health support, WorkSafe will pay for a maximum of 13 weeks of reasonable medical and like expenses without the need to determine liability for this treatment.'
          }
        ],
        exampleValues: {
          WorkSafe: 6431,
          You: 569
        }
    }
  },
  computed: {
    ...mapState(['content']),
    ...mapGetters({ contentFilter: 'content/getFilteredContent' }),
    contentObject() {
      return this.$store.state && this.$store.state.content.contentData
    },
    pageContent() {
      return this.$store.state && this.$store.state.content.contentData.pages[this.pageName].content
    }
  }
}
</script>