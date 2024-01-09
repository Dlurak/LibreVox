module default {
	scalar type Visibility extending enum<PUBLIC, PRIVATE>;

	type Poll {
		# Todo: Add a min length of 1
		required title: str;
		description: str;
		required visibility: Visibility;
		required creator: str;
	}
}
