module default {
	scalar type Visibility extending enum<PUBLIC, PRIVATE>;

	type Poll {
		required title: str;
		description: str;
		required visibility: Visibility;
	}
}
