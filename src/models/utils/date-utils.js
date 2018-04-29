const dateUtils = (() => {

  function dateParse(date) {
    return new Date(date).toLocaleDateString();
  }

  return {
    dateParse
  }
})();

export default dateUtils;
