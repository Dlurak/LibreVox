module default {
	scalar type Visibility extending enum<PUBLIC, PRIVATE>;

	type Poll {
		# Todo: Add a min length of 1
		required title: str;
		description: str;
		required visibility: Visibility;
		required creator: str;
		required multi pages: Page {
			on source delete delete target;
		};
		required creationDate: datetime {
			default := datetime_current();
		};
	}

	type Page {
		required multi parts: Part {
			on source delete delete target;
		};
		required number: int16;

		# { condition: Condition; value: int16; }[]
		required nextPage: json;
	}

	type Answer {
		required value: json;
		required respondent: str; # Again a hash for anonymity
		required creationDate: datetime {
			default := datetime_current();
		};
	}

	scalar type Type extending enum<SEPERATOR, TEXT, SWITCH>;
	scalar type GeneralType extending enum<STATIC, ANSWERABLE>;

	scalar type AnswerType extending enum<BOOL>;
	
	abstract type Part {
		required type: Type;
		required masterType: GeneralType;
		multi answers: Answer {
			on source delete delete target;
		};
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
		required varName: str;
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
		overloaded answerType: AnswerType {
			default := AnswerType.BOOL;
		};
		required default: bool;
		text: str;
	}
}
