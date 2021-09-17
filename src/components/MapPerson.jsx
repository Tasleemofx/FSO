import React from 'react';
const MapPerson = ({person,handleDelete, handleEdit}) => {
    return (
        <ul>
          {person.map((p,i)=>
          <div key={i}>
          <li >{p.name} {p.number}</li>
          <button onClick={()=>handleDelete(p.id, p.name)}>Delete</button>
          <button onClick={()=> handleEdit(p.id, p.name)}>Edit</button>
          </div>
          )}
        </ul>
      );
}
 
export default MapPerson;