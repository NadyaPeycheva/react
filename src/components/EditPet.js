import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

export function EditPet({ token }) {
    console.log(token);
  // let history = useHistory();
  let location = useRouteMatch();
  let matchFromUrl = location.params;
  let petId = matchFromUrl.petId;
  let [pet, setPet] = useState({});

  useEffect(() => {
    async function getData() {
      let res = await fetch(`http://localhost:3030/data/pets/${petId}`);
      try {
        let response = await res.json();
        if (res.ok !== true) {
          throw new Error(response.message);
        } else {
          setPet(response);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  async function changePet(e) {
    e.preventDefault();
    console.log(e);
    let { name, description, imageUrl, type } = Object.fromEntries(
      new FormData(e.currentTarget)
    );
    let options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({ name, description, imageUrl, type }),
    };
    let res =await fetch (`http://localhost:3030/data/pets/${petId}`, options);
    try {
      if (res.ok !== true) {
        throw new Error(res.message);
      } else {
        return res;
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <section id="edit-page" className="edit">
      <form id="edit-form" action="#" method="" onSubmit={changePet}>
        <fieldset>
          <legend>Edit my Pet</legend>
          <p className="field">
            <label htmlFor="name">Name</label>
            <span className="input">
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={pet["name"]}
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="description">Description</label>
            <span className="input">
              <textarea
                name="description"
                id="description"
                defaultValue={pet["description"]}
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
                defaultValue={pet["imageUrl"]}
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="type">Type</label>
            <span className="input">
              <select id="type" name="type" defaultValue={pet["type"]}>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="parrot">Parrot</option>
                <option value="reptile">Reptile</option>
                <option value="other">Other</option>
              </select>
            </span>
          </p>
          <input className="button submit" type="submit" value="Save" />
        </fieldset>
      </form>
    </section>
  );
}
