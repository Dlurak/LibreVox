CREATE MIGRATION m1mmrofj2iisgghkt2mkk5p4y2p5onnqyxiq4ofjdaohmb2qsl6jeq
    ONTO m1bjxezcpq55k6v5qfep26tazke4fploainyidchrosu7fu5b7scia
{
  ALTER TYPE default::Part {
      ALTER LINK answers {
          RESET OPTIONALITY;
      };
  };
};
