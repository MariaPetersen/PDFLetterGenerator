import * as React from "react";

export interface ILetterFormProps {}

export function LetterForm(props: ILetterFormProps) {
  return (
    <div>
      <form>
        <h3>Informations de l'expéditeur</h3>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" name="firstName" id="firstName" />
          <label htmlFor="secondName">Nom de famille</label>
          <input type="text" name="secondName" id="secondName" />
          <label htmlFor="street">Adresse</label>
          <input
            type="text"
            name="street"
            id="street"
            placeholder="31 rue Mouffetard"
          />
          <label htmlFor="zip">Code postal</label>
          <input type="text" name="zip" id="zip" />
          <label htmlFor="town">Ville</label>
          <input type="text" name="town" id="town" />
        </div>
        <h3>Informations du déstinataire</h3>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" name="firstName" id="firstName" />
          <label htmlFor="secondName">Nom de famille</label>
          <input type="text" name="secondName" id="secondName" />
          <label htmlFor="street">Adresse</label>
          <input
            type="text"
            name="street"
            id="street"
            placeholder="31 rue Mouffetard"
          />
          <label htmlFor="zip">Code postal</label>
          <input type="text" name="zip" id="zip" />
          <label htmlFor="town">Ville</label>
          <input type="text" name="town" id="town" />
        </div>
        <h3>Corps de la lettre</h3>
        <div>
          <textarea name="content" id="content" cols={30} rows={10}></textarea>
        </div>
        {/* Select greeting */}
        <div>
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}
