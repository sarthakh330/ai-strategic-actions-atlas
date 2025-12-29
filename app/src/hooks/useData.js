import { useState, useEffect } from 'react';

const DATA_VERSION = 'v1';
const CACHE_KEY = `atlas-data-${DATA_VERSION}`;
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Custom hook to load all data from the /data directory
 * Features:
 * - localStorage caching for faster subsequent loads
 * - Lookup Maps for O(1) entity/entityClass/actionType access
 * Returns: { events, patterns, entities, stackLayers, actionTypes, entityClasses,
 *            entityMap, entityClassMap, actionTypeMap, loading, error }
 */
export function useData() {
  const [data, setData] = useState({
    events: [],
    patterns: [],
    entities: [],
    stackLayers: [],
    actionTypes: [],
    entityClasses: [],
    entityMap: new Map(),
    entityClassMap: new Map(),
    actionTypeMap: new Map(),
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Try to load from cache first
        const cachedData = loadFromCache();
        if (cachedData) {
          console.log('[useData] Loaded from cache');
          setData({ ...cachedData, loading: false, error: null });
          return;
        }

        // Fetch fresh data
        console.log('[useData] Fetching fresh data...');
        const [entities, stackLayers, actionTypes, entityClasses] = await Promise.all([
          fetch('/data/canonical/entities.json').then(r => r.json()),
          fetch('/data/canonical/stack_layers.json').then(r => r.json()),
          fetch('/data/canonical/action_types.json').then(r => r.json()),
          fetch('/data/canonical/entity_classes.json').then(r => r.json()),
        ]);

        // Load events (JSONL)
        const eventsText = await fetch('/data/events/v0_seed_40.jsonl').then(r => r.text());
        const events = eventsText
          .trim()
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));

        // Load patterns (JSONL)
        const patternsText = await fetch('/data/patterns/v0_seed_5.jsonl').then(r => r.text());
        const patterns = patternsText
          .trim()
          .split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));

        // Create lookup maps for O(1) access
        const entityMap = new Map(entities.map(e => [e.id, e]));
        const entityClassMap = new Map(entityClasses.map(ec => [ec.id, ec]));
        const actionTypeMap = new Map(actionTypes.map(at => [at.id, at]));

        const freshData = {
          events,
          patterns,
          entities,
          stackLayers: stackLayers.sort((a, b) => a.sort_order - b.sort_order),
          actionTypes,
          entityClasses,
          entityMap,
          entityClassMap,
          actionTypeMap,
        };

        // Save to cache
        saveToCache(freshData);

        setData({
          ...freshData,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('[useData] Error loading data:', err);
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    }

    loadData();
  }, []);

  return data;
}

/**
 * Load data from localStorage cache
 * Returns null if cache is invalid or expired
 */
function loadFromCache() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;

    if (age > CACHE_EXPIRY_MS) {
      console.log('[useData] Cache expired');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    // Reconstruct Maps (they don't serialize to JSON)
    return {
      ...data,
      entityMap: new Map(data.entities.map(e => [e.id, e])),
      entityClassMap: new Map(data.entityClasses.map(ec => [ec.id, ec])),
      actionTypeMap: new Map(data.actionTypes.map(at => [at.id, at])),
    };
  } catch (err) {
    console.error('[useData] Error reading cache:', err);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * Save data to localStorage cache
 */
function saveToCache(data) {
  try {
    // Don't store Maps in localStorage (not JSON-serializable)
    const { entityMap, entityClassMap, actionTypeMap, ...serializableData } = data;

    const cachePayload = {
      data: serializableData,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
    console.log('[useData] Data cached successfully');
  } catch (err) {
    console.error('[useData] Error saving cache:', err);
    // Quota exceeded - clear old cache
    if (err.name === 'QuotaExceededError') {
      localStorage.removeItem(CACHE_KEY);
    }
  }
}
