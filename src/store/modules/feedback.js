
const state = () => ({
   feedbackData: {}
})
   
  const getters = {
    getFeedbackData: () => () => {
      return JSON.parse(localStorage.getItem("feedbackData"))
    },
  }

  const actions = {
  }
   
  const mutations = {
    setFeedbackData(state, data){ // For Hydration of this state we need to initialize this earlier on in the bootstrap
      state.feedbackData = data
      localStorage.setItem("feedbackData", JSON.stringify(data))
   },
    storeVoted(state, data){
      state.feedbackData[data.ID] = {voted: true, vote_score: data.SCORE}
      localStorage.setItem("feedbackData", JSON.stringify(state.feedbackData))
   },
    storeFeedback(state, data){
      state.feedbackData[data.feedback.CONTENT_PAGE] = data.feedback
      localStorage.setItem("feedbackData", JSON.stringify(state.feedbackData))
   },
  }
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }