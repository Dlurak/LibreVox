const helper = (t: unknown) => typeof t;

export type NativeType = ReturnType<typeof helper>;
