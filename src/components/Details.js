import { useState, useEffect } from "react";
import { useHistory, useRouteMatch,Link } from "react-router-dom";

export function Details({ id, token }) {
  let history = useHistory();
  let location = useRouteMatch();
  let matchFromUrl = location.params;
  let idOfPet = matchFromUrl.petId;

  let [petIfno, setPetInfo] = useState({});
  let [isOwner, setOwner] = useState(false);

  useEffect(() => {
    async function getData() {
      let res = await fetch(`http://localhost:3030/data/pets/${idOfPet}`);
      try {
        let response = await res.json();
        if (res.ok !== true) {
          throw new Error(response.message);
        } else {
          setPetInfo(response);
          if (id === response._ownerId) {
            setOwner(true);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);
  async function deletePet() {
    let options = {
      method: "delete",
      headers: {
        "X-Authorization": token,
      },
    };
    let res = await fetch(
      "http://localhost:3030/data/pets/" + idOfPet,
      options
    );
    try {
      if (res.ok !== true) {
        let response = await res.json();
        throw new Error(response.message);
      } else {
        history.push("/");
        return res;
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  let buttonsForOwner = (
    <>
      <Link to={`/details/edit/${idOfPet}`} className="button" >
        Edit
      </Link>
      <a className="button" onClick={deletePet} href="#">
        Delete
      </a>
    </>
  );

  return (
    <section id="details-page" className="details">
      <div className="pet-information">
        <h3>{petIfno["name"]}</h3>
        <p className="type">Type: {petIfno["type"]}</p>
        <p className="img">
          <img src={petIfno["imageUrl"]} />
        </p>
        <div className="actions">
          {isOwner && buttonsForOwner}

          {/* <!-- Bonus -->
              <!-- Like button ( Only for logged-in users, which is not creators of the current pet ) --> */}
          {id && !isOwner && (
            <a className="button" href="#">
              Like
            </a>
          )}

          <div className="likes">
            <img className="hearts" src="/images/heart.png" />
            <span id="total-likes">Likes: 0</span>
          </div>
        </div>
      </div>
      <div className="pet-description">
        <h3>Description:</h3>
        <p>{petIfno["description"]}</p>
      </div>
    </section>
  );
}
