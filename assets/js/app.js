(function () {
  "use strict";

  const State = window.RecoveryTileState;
  const Storage = window.RecoveryTileStorage;

  let state = State.createDefaultState();
  let root = null;

  function init() {
    root = document.querySelector('[data-setfarm-root="baseline"]');

    const loaded = Storage.load();
    if (loaded.ok && loaded.state) {
      state = State.createState(Object.assign({}, loaded.state, { storageStatus: "loaded" }));
    } else if (!loaded.ok) {
      state = State.createState({
        storageStatus: "error",
        lastError: "Failed to load persisted state: " + loaded.error,
      });
    } else {
      state = State.createState({ storageStatus: "ready" });
    }

    loadDefaultRecords();
    exposeApp();
    render();
  }

  function loadDefaultRecords() {
    if (!window.fetch) return;
    fetch("assets/data/recoverytile-canary.json")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        if (data && Array.isArray(data.records) && state.records.length === 0) {
          state = Object.assign({}, state, { records: data.records });
          persist();
          exposeApp();
          render();
        }
      })
      .catch(function (error) {
        state = State.setLastError(state, "Could not load default records: " + (error && error.message ? error.message : String(error)));
        exposeApp();
        render();
      });
  }

  function persist() {
    const result = Storage.save(state);
    if (!result.ok) {
      state = Object.assign({}, state, {
        storageStatus: "error",
        lastError: "Save failed: " + result.error,
      });
    } else {
      state = Object.assign({}, state, { storageStatus: "saved" });
    }
  }

  function update(nextState) {
    state = nextState;
    persist();
    exposeApp();
    render();
  }

  function onCycleTile(tileId) {
    update(State.cycleTile(state, tileId));
  }

  function onReset() {
    Storage.clear();
    update(State.resetState());
  }

  function onExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "recoverytile-canary-export.json";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  function exposeApp() {
    window.app = {
      state: state,
      getState: function () {
        return state;
      },
      reset: onReset,
      actions: {
        cycleTile: onCycleTile,
        reset: onReset,
        export: onExport,
      },
    };
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (match) {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[match];
    });
  }

  function render() {
    if (!root) return;

    const errorBanner = state.lastError
      ? '<div class="error-banner" role="alert" data-testid="last-error">' + escapeHtml(state.lastError) + "</div>"
      : "";

    const tilesHtml = state.tiles
      .map(function (tile) {
        return (
          '<button class="tile tile--' +
          tile.status +
          '" type="button" data-action-id="ACT_CYCLE_TILE" data-tile-id="' +
          escapeHtml(tile.id) +
          '" aria-label="' +
          escapeHtml(tile.label) +
          " " +
          tile.status +
          '">' +
          '<span class="tile__status" aria-hidden="true"></span>' +
          '<span class="tile__label">' +
          escapeHtml(tile.label) +
          "</span>" +
          '<span class="tile__value">' +
          tile.status.toUpperCase() +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    const countsHtml =
      '<div class="counts">' +
      '<span class="count count--ok">OK: ' +
      state.counts.ok +
      "</span>" +
      '<span class="count count--warn">Warn: ' +
      state.counts.warn +
      "</span>" +
      '<span class="count count--down">Down: ' +
      state.counts.down +
      "</span>" +
      '<span class="count count--total">Total: ' +
      state.counts.total +
      "</span>" +
      "</div>";

    root.innerHTML =
      '<section class="hero">' +
      '<p class="eyebrow">RecoveryTile Canary</p>' +
      "<h1>App Shell</h1>" +
      '<p class="summary">Active surface: ' +
      escapeHtml(state.activeSurface) +
      " · Panel: " +
      escapeHtml(state.activePanel) +
      " · Storage: " +
      escapeHtml(state.storageStatus) +
      "</p>" +
      "</section>" +
      errorBanner +
      '<section class="tile-panel">' +
      "<h2>Recovery Tiles</h2>" +
      '<div class="tile-grid">' +
      tilesHtml +
      "</div>" +
      countsHtml +
      "</section>" +
      '<section class="controls">' +
      '<button class="btn" type="button" data-action-id="ACT_RESET">Reset</button>' +
      '<button class="btn" type="button" data-action-id="ACT_EXPORT">Export</button>' +
      "</section>";

    bind();
  }

  function bind() {
    if (!root) return;
    root.querySelectorAll('[data-action-id="ACT_CYCLE_TILE"]').forEach(function (button) {
      button.addEventListener("click", function () {
        onCycleTile(button.getAttribute("data-tile-id"));
      });
    });

    const resetButton = root.querySelector('[data-action-id="ACT_RESET"]');
    if (resetButton) resetButton.addEventListener("click", onReset);

    const exportButton = root.querySelector('[data-action-id="ACT_EXPORT"]');
    if (exportButton) exportButton.addEventListener("click", onExport);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
