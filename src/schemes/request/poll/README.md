## UI-Element Schemes

The schemes (and also the types) for the ui elements like switches or textes are defined here.  
To add a new uiElement create a new type in `dbschema/default.esdl` and an appropiate scheme in here. 
At last add the new scheme to the `uiElement.ts` file. At last also add an entry combining the type and the edgedb type
in the file `src/utils/database/insertUiElement.ts`.
