CREATE MIGRATION m1bri76zpntrsiius3xmfhhpf2nqmruwryj4scqayujvf5p2z64g7q
    ONTO m1b3vcpvj35b545vaqadlft62dqug5i27opv75ponus7nu74jicn2a
{
  ALTER TYPE default::Answer {
      CREATE REQUIRED PROPERTY creationDate: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Part {
      ALTER LINK answers {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE default::Page {
      ALTER LINK parts {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  ALTER TYPE default::Poll {
      ALTER LINK pages {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY creationDate: std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
