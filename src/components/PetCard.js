import { Link } from "react-router-dom"
export function PetCard({pet}){
    return (
        <li className="otherPet">
                <h3>{pet.name}</h3>
                <p>{pet.type}</p>
                <p className="img"><img src={pet.imageUrl}/></p>
                <Link to={`/details/${pet._id}`} className="button" >Details</Link>
            </li>
    )
}