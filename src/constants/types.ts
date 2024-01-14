import { NativeType } from "@ts/nativeTypes";

export const CUSTOM_TYPES = ["BOOL"] as const;
type CustomType = (typeof CUSTOM_TYPES)[number];

export const CUSTOM_TO_NORMAL_OBJ = {
	BOOL: "boolean",
} satisfies Record<CustomType, NativeType>;
