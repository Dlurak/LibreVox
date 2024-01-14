CREATE MIGRATION m1b3vcpvj35b545vaqadlft62dqug5i27opv75ponus7nu74jicn2a
    ONTO initial
{
  CREATE TYPE default::Answer {
      CREATE REQUIRED PROPERTY respondent: std::str;
      CREATE REQUIRED PROPERTY value: std::json;
  };
  CREATE SCALAR TYPE default::GeneralType EXTENDING enum<STATIC, ANSWERABLE>;
  CREATE SCALAR TYPE default::Type EXTENDING enum<SEPERATOR, TEXT, SWITCH>;
  CREATE ABSTRACT TYPE default::Part {
      CREATE MULTI LINK answers: default::Answer;
      CREATE REQUIRED PROPERTY masterType: default::GeneralType;
      CREATE REQUIRED PROPERTY type: default::Type;
  };
  CREATE SCALAR TYPE default::AnswerType EXTENDING enum<BOOL>;
  CREATE ABSTRACT TYPE default::AnswerablePart EXTENDING default::Part {
      CREATE REQUIRED PROPERTY answerType: default::AnswerType;
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.ANSWERABLE);
          SET OWNED;
      };
  };
  CREATE TYPE default::Switch EXTENDING default::AnswerablePart {
      ALTER PROPERTY answerType {
          SET default := (default::AnswerType.BOOL);
          SET OWNED;
      };
      ALTER PROPERTY type {
          SET default := (default::Type.SWITCH);
          SET OWNED;
      };
      CREATE REQUIRED PROPERTY default: std::bool;
      CREATE PROPERTY text: std::str;
  };
  CREATE ABSTRACT TYPE default::StaticPart EXTENDING default::Part {
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.STATIC);
          SET OWNED;
      };
  };
  CREATE TYPE default::Text EXTENDING default::StaticPart {
      ALTER PROPERTY type {
          SET default := (default::Type.TEXT);
          SET OWNED;
      };
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::Seperator EXTENDING default::StaticPart {
      ALTER PROPERTY type {
          SET default := (default::Type.SEPERATOR);
          SET OWNED;
      };
  };
  CREATE TYPE default::Page {
      CREATE REQUIRED MULTI LINK parts: default::Part;
      CREATE REQUIRED PROPERTY nextPage: std::json;
      CREATE REQUIRED PROPERTY number: std::int16;
  };
  CREATE SCALAR TYPE default::Visibility EXTENDING enum<PUBLIC, PRIVATE>;
  CREATE TYPE default::Poll {
      CREATE REQUIRED MULTI LINK pages: default::Page;
      CREATE REQUIRED PROPERTY creator: std::str;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY visibility: default::Visibility;
  };
};
