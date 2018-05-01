export default function toast(state = [], actions) {

  switch (actions.type) {
    case 'ADD_TOAST':
      return [...state, {
        text: actions.text,
        toastType: actions.toastType,
        status: true,
        timetoleave: (new Date().getTime() + 5000),
        id: Math.random()
      }];

    case 'REMOVE_TOAST':
      return [...state.filter(item => item.id !== actions.id)];

    case 'AUTO_REMOVE':
      return [...state.filter(item => item.timetoleave >= (new Date().getTime()))];

    default:
      return state;
  }
}
