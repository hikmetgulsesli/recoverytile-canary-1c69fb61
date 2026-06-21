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

  window.US002.cancelEdit = function () {
    const state = loadState();
    state.selectedRecord = null;
    state.activeSurface = State.SCREENS.RECORD_OPERATIONS;
    state.lastError = null;
    saveState(state);
    window.location.href = "record-operations-recoverytile-canary.html";
  };
})();
