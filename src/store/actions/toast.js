export function addToast(text, toastType = 'default') {
  return {
    type: 'ADD_TOAST',
    text,
    toastType
  }
};

export function removeToast(id) {
  return {
    type: 'REMOVE_TOAST',
    id
  }
}
