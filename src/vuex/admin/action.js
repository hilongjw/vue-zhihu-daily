export const showAlert = ({ dispatch }, msg) => {
  dispatch('SHOW_ALERT', msg)
  setTimeout(() => {
    dispatch('HIDE_ALERT')
  }, 3000)
}

export const addCheckList = ({ dispatch }, item) => {
  dispatch('ADD_CHECKLIST', item)
}

export const removeCheckList = ({ dispatch }, item) => {
  dispatch('REMOVE_CHECKLIST', item)
}
