export default function toast(state = [], actions) {
  switch (actions.type) {
    case 'ADD_TOAST':
      return [...state, {
        text: actions.text,
        status: true,
        timetoleave: (new Date().getTime() + 5000),
        id: new Date().getTime()
      }];

    default:
      return state;
  }
}
