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

  function generateId() {
    return "rec-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }

  function collectTags() {
    const tagList = document.getElementById("tag-list");
    if (!tagList) return [];
    return Array.from(tagList.querySelectorAll(".tag"))
      .map(function (el) {
        return el.textContent.trim();
      })
      .filter(function (t) {
        return t.length > 0;
      });
  }

  window.US002 = window.US002 || {};

  window.US002.saveRecord = function (event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    const state = loadState();
    const form = document.getElementById("record-form");
    if (!form) return;

    const formData = new FormData(form);
    const recordId = state.selectedRecord === "new" ? generateId() : state.selectedRecord;

    const record = {
      id: recordId,
      name: String(formData.get("name") || "").trim(),
      type: String(formData.get("type") || "").trim(),
      notes: String(formData.get("notes") || "").trim(),
      region: String(formData.get("region") || "").trim(),
      priority: Number(formData.get("priority") || 0),
      status: formData.get("status") || "ok",
      tags: collectTags(),
      lastRun: new Date().toISOString(),
    };

    if (!record.name) {
      state.lastError = "Record name is required.";
      saveState(state);
      if (typeof window.US002EditorRender === "function") {
        window.US002EditorRender();
      }
      return;
    }

    state.records = Array.isArray(state.records) ? state.records : [];
    const existingIndex = state.records.findIndex(function (r) {
      return r.id === record.id;
    });

    if (existingIndex >= 0) {
      state.records[existingIndex] = record;
    } else {
      state.records.push(record);
    }

    state.selectedRecord = null;
    state.activeSurface = State.SCREENS.RECORD_OPERATIONS;
    state.lastError = null;
    saveState(state);

    window.location.href = "record-operations-recoverytile-canary.html";
  };
})();
