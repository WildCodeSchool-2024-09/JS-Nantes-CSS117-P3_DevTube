export default function Formulaire() {
  return (
    <div>
      <form action="/submit" method="post">
        <h2>Contactez-nous</h2>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Votre e-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message :</label>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
