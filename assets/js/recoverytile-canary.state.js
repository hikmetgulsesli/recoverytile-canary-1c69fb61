(function (global) {
  "use strict";

  const STATUS_OK = "ok";
  const STATUS_WARN = "warn";
  const STATUS_DOWN = "down";

  const SCREENS = {
    RECORD_OPERATIONS: "SURF_RECORD_OPERATIONS",
    RECORD_EDITOR: "SURF_RECORD_EDITOR",
    EMPTY_AND_ERROR: "SURF_EMPTY_AND_ERROR_RECOVERY",
  };

  function createDefaultState() {
    return {
      activeSurface: SCREENS.RECORD_OPERATIONS,
      selectedRecord: null,
      storageStatus: "ready",
      lastError: null,
      activePanel: "tiles",
      counts: { ok: 1, warn: 1, down: 1, total: 3 },
      tiles: [
        { id: "tile-1", label: "Service Alpha", status: STATUS_OK },
        { id: "tile-2", label: "Service Beta", status: STATUS_WARN },
        { id: "tile-3", label: "Service Gamma", status: STATUS_DOWN },
      ],
      records: [],
      initializedAt: Date.now(),
    };
  }

  function nextStatus(status) {
    if (status === STATUS_OK) return STATUS_WARN;
    if (status === STATUS_WARN) return STATUS_DOWN;
    return STATUS_OK;
  }

  function computeCounts(tiles) {
    const counts = { ok: 0, warn: 0, down: 0, total: tiles.length };
    for (const tile of tiles) {
      if (counts[tile.status] !== undefined) {
        counts[tile.status] += 1;
      }
    }
    return counts;
  }

  function createState(overrides) {
    const base = createDefaultState();
    const merged = Object.assign({}, base, overrides || {});
    merged.counts = computeCounts(merged.tiles || []);
    return merged;
  }

  function cycleTile(state, tileId) {
    const tiles = state.tiles.map(function (tile) {
      if (tile.id !== tileId) return tile;
      return Object.assign({}, tile, { status: nextStatus(tile.status) });
    });
    return Object.assign({}, state, {
      tiles,
      counts: computeCounts(tiles),
      lastError: null,
    });
  }

  function resetState() {
    return createDefaultState();
  }

  function setActiveSurface(state, surface) {
    return Object.assign({}, state, { activeSurface: surface });
  }

  function selectRecord(state, recordId) {
    return Object.assign({}, state, { selectedRecord: recordId });
  }

  function setActivePanel(state, panel) {
    return Object.assign({}, state, { activePanel: panel });
  }

  function setStorageStatus(state, status) {
    return Object.assign({}, state, { storageStatus: status });
  }

  function setLastError(state, error) {
    return Object.assign({}, state, { lastError: error ? String(error) : null });
  }

  global.RecoveryTileState = {
    STATUS_OK,
    STATUS_WARN,
    STATUS_DOWN,
    SCREENS,
    createDefaultState,
    createState,
    cycleTile,
    resetState,
    setActiveSurface,
    selectRecord,
    setActivePanel,
    setStorageStatus,
    setLastError,
    computeCounts,
  };
})(window);
