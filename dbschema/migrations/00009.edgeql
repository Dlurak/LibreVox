CREATE MIGRATION m1e2uyegru4tdbmcv2gjdfj6rysrbtzv6mmqju3zx6pp3ewusnorja
    ONTO m1mmrofj2iisgghkt2mkk5p4y2p5onnqyxiq4ofjdaohmb2qsl6jeq
{
  CREATE SCALAR TYPE default::GeneralType EXTENDING enum<STATIC, ANSWERABLE>;
  ALTER TYPE default::Part {
      CREATE REQUIRED PROPERTY masterType: default::GeneralType {
          SET REQUIRED USING (<default::GeneralType>{});
      };
  };
  CREATE SCALAR TYPE default::AnswerType EXTENDING enum<BOOL>;
  CREATE ABSTRACT TYPE default::AnswerablePart EXTENDING default::Part {
      CREATE REQUIRED PROPERTY answerType: default::AnswerType;
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.ANSWERABLE);
          SET OWNED;
      };
  };
  ALTER TYPE default::Switch {
      DROP EXTENDING default::Part;
      EXTENDING default::AnswerablePart LAST;
  };
  ALTER TYPE default::Switch {
      ALTER PROPERTY answerType {
          SET default := (default::AnswerType.BOOL);
          SET OWNED;
      };
  };
  CREATE ABSTRACT TYPE default::StaticPart EXTENDING default::Part {
      ALTER PROPERTY masterType {
          SET default := (default::GeneralType.STATIC);
          SET OWNED;
      };
  };
  ALTER TYPE default::Seperator {
      DROP EXTENDING default::Part;
      EXTENDING default::StaticPart LAST;
  };
  ALTER TYPE default::Text {
      DROP EXTENDING default::Part;
      EXTENDING default::StaticPart LAST;
  };
};
