export default function toast(state = [], actions) {
  switch (actions.type) {
    case 'ADD_TOAST':
      let date = new Date().getTime();
      return [...state, {
        text: actions.text,
        toastType: actions.toastType,
        status: true,
        timetoleave: (date + 5000),
        id: date
      }];

    case 'REMOVE_TOAST':
      return state.filter(item => item.id !== actions.id)

    default:
      return state;
  }
}
