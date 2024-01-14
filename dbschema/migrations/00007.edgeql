CREATE MIGRATION m1bjxezcpq55k6v5qfep26tazke4fploainyidchrosu7fu5b7scia
    ONTO m1mdbzq6qdoezui56uh7laqaqnfde7kog33k22xksvrirh4bidcyjq
{
  CREATE TYPE default::Answer {
      CREATE REQUIRED PROPERTY respondent: std::str;
      CREATE REQUIRED PROPERTY value: std::json;
  };
  ALTER TYPE default::Part {
      CREATE REQUIRED MULTI LINK answers: default::Answer {
          SET REQUIRED USING (<default::Answer>{});
      };
  };
};
