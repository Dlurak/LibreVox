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

	scalar type Type extending enum<SEPERATOR, TEXT, SWITCH>;
	
	abstract type Part {
		required type: Type;
	};
	
	type Seperator extending Part {
		overloaded type: Type {
			default := Type.SEPERATOR;
		};
	};

	type Text extending Part {
		overloaded type: Type {
			default := Type.TEXT;
		};
		required text: str;
	}

	type Switch extending Part {
		overloaded type: Type {
			default := Type.SWITCH;
		};
		required default: bool;
		text: str;
	}
}
