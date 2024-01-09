CREATE MIGRATION m1b4dmusz3vs3m2niy36fqzef734knlfu6mpteejydc2qr7eydsdja
    ONTO initial
{
  CREATE SCALAR TYPE default::Visibility EXTENDING enum<PUBLIC, PRIVATE>;
  CREATE TYPE default::Poll {
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY visibility: default::Visibility;
  };
};
