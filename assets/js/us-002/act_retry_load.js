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

    if (!window.fetch) {
      state.lastError = "Fetch is not available in this environment.";
      saveState(state);
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
        if (data && Array.isArray(data.records)) {
          state.records = data.records;
        }
        state.lastError = null;
        saveState(state);
        if (typeof window.US002OperationsRender === "function") {
          window.US002OperationsRender();
        }
      })
      .catch(function (error) {
        state.lastError = "Could not reload records: " + (error && error.message ? error.message : String(error));
        saveState(state);
        if (typeof window.US002OperationsRender === "function") {
          window.US002OperationsRender();
        }
      });
  };
})();
