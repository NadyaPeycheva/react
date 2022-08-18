import { useEffect, useState } from "react";
import { PetCard } from "./PetCard";

export function AllPets({ userId }) {
  let [pets, setPets] = useState([]);

  useEffect(() => {
    async function getData() {
      let res = await fetch(
        `http://localhost:3030/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
      );
      try {
        let result = await res.json();
        if (res.ok !== true) {
          throw new Error(result.message);
        } else {
          setPets(result);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    getData();
  }, []);

  return (
    <section id="my-pets-page" className="my-pets">
      <h1>My Pets</h1>
      <ul className="my-pets-list">
        {pets.length > 0 ? (
          pets.map((p) => <PetCard key={p._id} pet={p} />)
        ) : (
          <p className="no-pets">No pets in database!</p>
        )}
      </ul>
    </section>
  );
}
