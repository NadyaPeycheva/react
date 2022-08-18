import { useHistory } from "react-router-dom";
export function Register({ register }) {
  let history = useHistory();
  function onRegister(e) {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let confirmPassword = data.get("confirm-pass");

    if (email && password && password === confirmPassword) {
      register(email, password);
    }
    e.currentTarget.reset();
    history.push("/login");
  }
  return (
    <section id="register-page" className="register">
      <form id="register-form" onSubmit={onRegister}>
        <fieldset>
          <legend>Register Form</legend>
          <p className="field">
            <label htmlFor="email">Email</label>
            <span className="input">
              <input type="text" name="email" id="email" placeholder="Email" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="repeat-pass">Repeat Password</label>
            <span className="input">
              <input
                type="password"
                name="confirm-pass"
                id="repeat-pass"
                placeholder="Repeat Password"
              />
            </span>
          </p>
          <input className="button submit" type="submit" value="Register" />
        </fieldset>
      </form>
    </section>
  );
}
