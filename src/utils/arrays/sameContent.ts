export const sameContent = (list1: unknown[], list2: unknown[]) => {
	const set1 = new Set(list1);
	const set2 = new Set(list2);

	// @ts-ignore Too new for ts but Bun supports it :D
	const difference = set1.difference(set2) as Set<unknown>;

	return difference.size === 0;
};
