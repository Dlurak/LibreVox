import { MAX_INSTANCE_NAME_LEN } from "@constants/instances";
import { Type } from "@sinclair/typebox";

export const instanceResponseScheme = Type.Object({
	isLibreVox: Type.Literal(true),
	instanceName: Type.String({
		maxLength: MAX_INSTANCE_NAME_LEN,
	}),
});
