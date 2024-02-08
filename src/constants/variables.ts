export const EXCLUDED_VAR_NAMES = ["_"] as const;
export const TYPES_WITH_VAR = ["switch"];

export type ExcludedVarNames = (typeof EXCLUDED_VAR_NAMES)[number];
