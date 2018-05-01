export default function toast(state = [], actions) {
  switch (actions.type) {
    case 'ADD_TOAST':
      return [...state, {
        text: actions.text,
        status: true,
        id: new Date().getTime()
      }];

    default:
      return state;
  }
}
