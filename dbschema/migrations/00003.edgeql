CREATE MIGRATION m1ujb4ned7zj7x2wyllcwzqrc7rgndbiubyzdjehjnjvmhtpm42b4a
    ONTO m1hrtpt2bntogbgano6zopl2gj3wof2gjmuqf4gc2midoyiy72fayq
{
  CREATE ABSTRACT TYPE default::Part;
  CREATE TYPE default::Page {
      CREATE REQUIRED MULTI LINK parts: default::Part;
  };
  ALTER TYPE default::Poll {
      CREATE REQUIRED MULTI LINK pages: default::Page {
          SET REQUIRED USING (<default::Page>{});
      };
  };
  CREATE TYPE default::Seperator EXTENDING default::Part;
  CREATE TYPE default::Switch EXTENDING default::Part {
      CREATE REQUIRED PROPERTY default: std::bool;
      CREATE PROPERTY text: std::str;
  };
  CREATE TYPE default::Text EXTENDING default::Part {
      CREATE REQUIRED PROPERTY text: std::str;
  };
};
