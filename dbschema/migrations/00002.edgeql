CREATE MIGRATION m1hrtpt2bntogbgano6zopl2gj3wof2gjmuqf4gc2midoyiy72fayq
    ONTO m1b4dmusz3vs3m2niy36fqzef734knlfu6mpteejydc2qr7eydsdja
{
  ALTER TYPE default::Poll {
      CREATE REQUIRED PROPERTY creator: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
