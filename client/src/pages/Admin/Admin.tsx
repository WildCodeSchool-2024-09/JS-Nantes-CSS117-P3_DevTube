import FormUserAdmin from "../../components/FormUserAdmin/FormUserAdmin";
import FormVideoAdmin from "../../components/FormVideoAdmin/FormVideoAdmin";

export default function Admin() {
  return (
    <>
      <h1 className="h1-admin">Administration</h1>
      <section className="form-admin-container">
        <FormUserAdmin />
        <FormVideoAdmin />
      </section>
    </>
  );
}
