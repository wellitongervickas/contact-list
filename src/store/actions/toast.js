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
};

export function autoRemove(list = []) {
  return {
    type: 'AUTO_REMOVE',
    list
  }
};
