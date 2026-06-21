(function (global) {
  "use strict";

  const STORAGE_KEY = "recoverytile-canary-state";

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error && error.message ? error.message : String(error) };
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ok: true, state: null };
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Persisted state is not a valid object");
      }
      return { ok: true, state: parsed };
    } catch (error) {
      return {
        ok: false,
        error: error && error.message ? error.message : String(error),
        state: null,
      };
    }
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error && error.message ? error.message : String(error) };
    }
  }

  global.RecoveryTileStorage = {
    STORAGE_KEY,
    save,
    load,
    clear,
  };
})(window);
