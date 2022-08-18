import { useHistory } from "react-router-dom";

export function CreatePet({ token }) {
  let history = useHistory();

  async function addNewPet(e) {
    e.preventDefault();

    let { name, description, imageUrl, type } = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({ name, description, imageUrl, type }),
    };
    let res = await fetch("http://localhost:3030/data/pets", options);

    try {
      let response = await res.json();
      if (res.ok !== true) {
        throw new Error(response.message);
      }
      
    } catch (err) {
        console.log(err);
    }
    history.push('/')    

  }

  return (
    <section id="create-page" className="create">
      <form id="create-form" action="" method="" onSubmit={addNewPet}>
        <fieldset>
          <legend>Add new Pet</legend>
          <p className="field">
            <label htmlFor="name">Name</label>
            <span className="input">
              <input type="text" name="name" id="name" placeholder="Name" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="description">Description</label>
            <span className="input">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
              ></textarea>
            </span>
          </p>
          <p className="field">
            <label htmlFor="image">Image</label>
            <span className="input">
              <input
                type="text"
                name="imageUrl"
                id="image"
                placeholder="Image"
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="type">Type</label>
            <span className="input">
              <select id="type" name="type">
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="parrot">Parrot</option>
                <option value="reptile">Reptile</option>
                <option value="other">Other</option>
              </select>
            </span>
          </p>
          <input className="button submit" type="submit" value="Add Pet" />
        </fieldset>
      </form>
    </section>
  );
}
