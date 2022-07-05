export default function Utils() {
  return {
    shuffle,
    capitalizeFirstLetter,
    iconClassMap,
    nameFormatter
  }
}

export function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  export const iconClassMap = {
    'payments': 'ws-recoveryicon_hand_dollars',
    'certificate_of_capacity': 'ws-recoveryicon_checklist',
    'treatment_services': 'ws-recoveryicon_treatment_services',
    'treatment_and_support': 'ws-recoveryicon_treatment_services',
    'recovery_and_return_to_work': 'ws-recoveryicon_request_services',
    'rights_and_obligations': 'ws-recoveryicon_rights',
    'contacting_support': 'ws-recoveryicon_contact_supports',
    'agent_support': 'ws-recoveryicon_contact_supports',
    'my_worksafe_portal': 'ws-recoveryicon_portal',
    'understanding_workcover': 'ws-recoveryicon_about_worksafe',
    'reimburse_for_travel': 'ws-recoveryicon_travel',
    'checkin_recovery': 'ws-recoveryicon_give_feedback',
    'common_questions': 'ws-recoveryicon_questions',
    'contact_agent': 'ws-recoveryicon_contact_persons',
    'setup_supports': 'ws-recoveryicon_people_shoulder',
    'back_to_work': 'ws-recoveryicon_person_top',
    'recovery_plan': 'ws-recoveryicon_recovery_plan',
    'general': 'ws-recoveryicon_person_top',
}

export function nameFormatter ( name ) {
  return name // .replace(/\b\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function currencyValue ( cents ) {
  return `$${String(Number(cents/100).toFixed(2))}`
}