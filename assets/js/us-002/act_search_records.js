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

  window.US002.searchRecords = function () {
    const input = document.querySelector('[data-action-id="ACT_SEARCH_RECORDS"]');
    const query = input ? String(input.value || "").toLowerCase() : "";

    const filterSelect = document.querySelector('[data-action-id="ACT_FILTER_STATUS"]');
    const statusFilter = filterSelect ? String(filterSelect.value || "") : "";

    const state = loadState();
    state.searchQuery = query;
    state.statusFilter = statusFilter;
    saveState(state);

    if (typeof window.US002OperationsRender === "function") {
      window.US002OperationsRender();
    }
  };
})();
