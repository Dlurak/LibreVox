import random from "random";

const allLowerCaseChars = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
] as const;

const allUpperCaseChars = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
] as const;

const allChars = [...allUpperCaseChars, ...allLowerCaseChars];
type Char = (typeof allChars)[number];

/**
 * Return a random letter
 */
const randomChar = () => random.choice(allChars) as Char;

/**
 * Return a random string with a given length.
 * This string consists of normal letters
 */
export const randomString = (length: number, base = ""): string => {
	if (length === 0) return base;

	return randomString(length - 1, `${base}${randomChar()}`);
};
