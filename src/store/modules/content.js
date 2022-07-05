
const state = () => ({
   contentData: {}
})
   
  const getters = {
    getContentData: () => () => {
      return JSON.parse(localStorage.getItem("contentData"));
    },
    getFilteredContent: (state) => (content) => {
      let filtered = ''

      const checkProp = (propPlaceHolder, propName, filterContent) => {
        const filtered = filterContent.split(propPlaceHolder).join(state.contentData.personalisation && state.contentData.personalisation.contentFilterData[propName] ? state.contentData.personalisation.contentFilterData[propName] : state.contentData.defaults.contentFilterData[propName])
        return filtered
      }

      if (content) {
        filtered = checkProp('[IW_FIRSTNAME]', 'iwFirstName', filtered || content)
        filtered = checkProp('[AGENT_NAME]', 'agentName', filtered || content)
        filtered = checkProp('[AGENT_EMAIL]', 'agentEmail', filtered || content)
        filtered = checkProp('[AGENT_CONTACTNUMBER]', 'agentContactNumber', filtered || content)
        filtered = checkProp('[STATUTORY_MAX]', 'statutoryMax', filtered || content)
        filtered = checkProp('[WORKSAFE_EMAIL]', 'wsEmail', filtered || content)
      }
      return filtered
    }
  }

  const actions = {
  }
   
  const mutations = {
    setContentData(state, data){
      state.contentData = data;
      localStorage.setItem("contentData", JSON.stringify(data));
   },
   setPersonalisation(state, data){
     if (!state.contentData.personalisation) {
      state.contentData.personalisation = {contentFilterData: {}}
     }
     for (let i in data) {
      if (data[i] !== '') state.contentData.personalisation.contentFilterData[i] = data[i]
     }
     localStorage.setItem("contentData", JSON.stringify(state.contentData));
   }
  }
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }