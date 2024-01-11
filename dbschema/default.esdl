module default {
	scalar type Visibility extending enum<PUBLIC, PRIVATE>;

	type Poll {
		# Todo: Add a min length of 1
		required title: str;
		description: str;
		required visibility: Visibility;
		required creator: str;
		required multi pages: Page;
		# Todo: Add a timestamp
	}

	type Page {
		# Todo: Add conditional logic
		required multi parts: Part;
		required number: int16;
	}
	
	abstract type Part;
	
	type Seperator extending Part;

	type Text extending Part {
		required text: str;
	}

	type Switch extending Part {
		required default: bool;
		text: str;
	}
}
