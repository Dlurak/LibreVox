CREATE MIGRATION m1xe2iqzr6nueg53kvbnmbvjvxpdymbt32i76oo7prmidk6vx3sd5a
    ONTO m1xzhdfd7i2tavxlzxysmg6daq4vdhlh2uoe7i346a2gfcvdv6jhwa
{
  CREATE SCALAR TYPE default::Type EXTENDING enum<SEPERATOR, TEXT, SWITCH>;
  ALTER TYPE default::Part {
      CREATE REQUIRED PROPERTY type: default::Type {
          SET REQUIRED USING (<default::Type>{});
      };
  };
};
