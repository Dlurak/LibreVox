CREATE MIGRATION m1xzhdfd7i2tavxlzxysmg6daq4vdhlh2uoe7i346a2gfcvdv6jhwa
    ONTO m1ujb4ned7zj7x2wyllcwzqrc7rgndbiubyzdjehjnjvmhtpm42b4a
{
  ALTER TYPE default::Page {
      CREATE REQUIRED PROPERTY number: std::int16 {
          SET REQUIRED USING (<std::int16>0);
      };
  };
};
