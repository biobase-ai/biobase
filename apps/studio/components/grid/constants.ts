export const COLUMN_MIN_WIDTH = 100

export const STORAGE_KEY_PREFIX = 'biobase_grid'

export const TOTAL_ROWS_INITIAL = -1
export const TOTAL_ROWS_RESET = -2

export const SELECT_COLUMN_KEY = 'biobase-grid-select-row'
export const ADD_COLUMN_KEY = 'biobase-grid-add-column'

const RLS_ACKNOWLEDGED_KEY = 'biobase-acknowledge-rls-warning'

export const rlsAcknowledgedKey = (tableID?: string | number) =>
  `${RLS_ACKNOWLEDGED_KEY}-${String(tableID)}`
