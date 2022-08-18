import { useEffect, useState } from "react";
import { PetCard } from "./PetCard";
export function Dashboard({ url }) {
    let [lastedAddedPets,setPets]=useState([]);

  useEffect(() => {
   async function getData(){
    let res=await fetch(url+'/data/pets?sortBy=_createdOn%20desc');
    try{
        let response=await res.json();
        if(res.ok!==true){
            throw new Error(response.message)
        }else{
            setPets(Object.values(response))
        }
    }catch(e){
        console.log(e);
    }
   }
   getData()
  }, []);

  return (
    <section id="dashboard-page" className="dashboard">
      <h1>Dashboard</h1>
      {lastedAddedPets.length>0 ? <ul className="other-pets-list">
            {lastedAddedPets.map(pet=><PetCard pet={pet} key={pet._id}/>)}
        </ul>:<p className="no-pets">No pets in database!</p>}
    </section>
  );
}
