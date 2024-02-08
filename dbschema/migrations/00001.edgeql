CREATE MIGRATION m1igoccg2thhlxr6elaszapdtzvb6o5wzqlfztnxchl3aphdzxkfda
    ONTO initial
{
  CREATE TYPE default::Answer {
      CREATE REQUIRED PROPERTY creationDate: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY respondent: std::str;
      CREATE REQUIRED PROPERTY value: std::json;
  };
  CREATE SCALAR TYPE default::GeneralType EXTENDING enum<STATIC, ANSWERABLE>;
  CREATE SCALAR TYPE default::Type EXTENDING enum<SEPERATOR, TEXT, SWITCH>;
  CREATE ABSTRACT TYPE default::Part {
      CREATE MULTI LINK answers: default::Answer {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY masterType: default::GeneralType;
      CREATE REQUIRED PROPERTY type: default::Type;
  };
  CREATE SCALAR TYPE default::AnswerType EXTENDING enum<BOOL>;
  CREATE ABSTRACT TYPE default::AnswerablePart EXTENDING default::Part {
      CREATE REQUIRED PROPERTY answerType: default::AnswerType;
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.ANSWERABLE);
          SET OWNED;
          SET TYPE default::GeneralType;
      };
      CREATE REQUIRED PROPERTY varName: std::str;
  };
  CREATE TYPE default::Switch EXTENDING default::AnswerablePart {
      ALTER PROPERTY answerType {
          SET default := (default::AnswerType.BOOL);
          SET OWNED;
          SET TYPE default::AnswerType;
      };
      ALTER PROPERTY type {
          SET default := (default::Type.SWITCH);
          SET OWNED;
          SET TYPE default::Type;
      };
      CREATE REQUIRED PROPERTY default: std::bool;
      CREATE PROPERTY text: std::str;
  };
  CREATE ABSTRACT TYPE default::StaticPart EXTENDING default::Part {
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.STATIC);
          SET OWNED;
          SET TYPE default::GeneralType;
      };
  };
  CREATE TYPE default::Seperator EXTENDING default::StaticPart {
      ALTER PROPERTY type {
          SET default := (default::Type.SEPERATOR);
          SET OWNED;
          SET TYPE default::Type;
      };
  };
  CREATE TYPE default::Text EXTENDING default::StaticPart {
      ALTER PROPERTY type {
          SET default := (default::Type.TEXT);
          SET OWNED;
          SET TYPE default::Type;
      };
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::Page {
      CREATE REQUIRED MULTI LINK parts: default::Part {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY nextPage: std::json;
      CREATE REQUIRED PROPERTY number: std::int16;
  };
  CREATE SCALAR TYPE default::Visibility EXTENDING enum<PUBLIC, PRIVATE>;
  CREATE TYPE default::Poll {
      CREATE REQUIRED MULTI LINK pages: default::Page {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY creationDate: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY creator: std::str;
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY visibility: default::Visibility;
  };
};
