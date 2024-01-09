export type IfElse<C extends boolean, T, U> = C extends true ? T : U;
