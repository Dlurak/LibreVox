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
		required multi parts: Part;
		required number: int16;

		# { condition: Condition; value: int16; }[]
		required nextPage: json;
	}

	type Answer {
		required value: json;
		required respondent: str; # Again a hash for anonymity
	}

	scalar type Type extending enum<SEPERATOR, TEXT, SWITCH>;
	scalar type GeneralType extending enum<STATIC, ANSWERABLE>;

	scalar type AnswerType extending enum<BOOL>;
	
	abstract type Part {
		required type: Type;
		required masterType: GeneralType;
		multi answers: Answer;
	};

	abstract type StaticPart extending Part {
		overloaded masterType: GeneralType {
			default := GeneralType.STATIC;
		};
	}	


	abstract type AnswerablePart extending Part {
		overloaded masterType: GeneralType {
			default := GeneralType.ANSWERABLE;
		};
		required answerType: AnswerType;
	}
	
	type Seperator extending StaticPart {
		overloaded type: Type {
			default := Type.SEPERATOR;
		};
	};

	type Text extending StaticPart {
		overloaded type: Type {
			default := Type.TEXT;
		};
		required text: str;
	}

	type Switch extending AnswerablePart {
		overloaded type: Type {
			default := Type.SWITCH;
		};
		overloaded answerType: Answer {
			default := AnswerType.BOOL;
		};
		required default: bool;
		text: str;
	}
}
