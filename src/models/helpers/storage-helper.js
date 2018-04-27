const storageHelper = (() => {

  /**
    * Save a data in Browser Storage
    *
  */

  function saveInStorage (key, payload) {

    localStorage.setItem(key, JSON.stringify(payload))
  };

  /**
    * Get a data from Browser Storage
    * and return if exist or undefined
    *
  */

  function getFromStorage (key, payload) {

    const data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
  };

  return {
    save: saveInStorage,
    get: getFromStorage
  }

})();

export default storageHelper;
