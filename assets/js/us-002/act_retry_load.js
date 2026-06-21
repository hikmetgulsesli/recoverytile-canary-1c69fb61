(function () {
  "use strict";

  const State = window.RecoveryTileState;
  const Storage = window.RecoveryTileStorage;

  function loadState() {
    const loaded = Storage.load();
    return loaded.state ? State.createState(loaded.state) : State.createDefaultState();
  }

  function saveState(nextState) {
    Storage.save(nextState);
  }

  window.US002 = window.US002 || {};

  window.US002.retryLoad = function () {
    const state = loadState();
    state.lastError = null;
    saveState(state);

    if (!window.fetch) {
      const currentState = loadState();
      currentState.lastError = "Fetch is not available in this environment.";
      saveState(currentState);
      if (typeof window.US002OperationsRender === "function") {
        window.US002OperationsRender();
      }
      return;
    }

    fetch("assets/data/recoverytile-canary.json")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        const currentState = loadState();
        if (data && Array.isArray(data.records)) {
          currentState.records = data.records;
        }
        currentState.lastError = null;
        saveState(currentState);
        if (typeof window.US002OperationsRender === "function") {
          window.US002OperationsRender();
        }
      })
      .catch(function (error) {
        const currentState = loadState();
        currentState.lastError = "Could not reload records: " + (error && error.message ? error.message : String(error));
        saveState(currentState);
        if (typeof window.US002OperationsRender === "function") {
          window.US002OperationsRender();
        }
      });
  };
})();
