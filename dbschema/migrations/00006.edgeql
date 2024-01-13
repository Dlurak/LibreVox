CREATE MIGRATION m1mdbzq6qdoezui56uh7laqaqnfde7kog33k22xksvrirh4bidcyjq
    ONTO m1xe2iqzr6nueg53kvbnmbvjvxpdymbt32i76oo7prmidk6vx3sd5a
{
  ALTER TYPE default::Seperator {
      ALTER PROPERTY type {
          SET default := (default::Type.SEPERATOR);
          SET OWNED;
      };
  };
  ALTER TYPE default::Switch {
      ALTER PROPERTY type {
          SET default := (default::Type.SWITCH);
          SET OWNED;
      };
  };
  ALTER TYPE default::Text {
      ALTER PROPERTY type {
          SET default := (default::Type.TEXT);
          SET OWNED;
      };
  };
};
