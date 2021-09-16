import React from 'react';
const MapPerson = ({person}) => {
    return (
        <ul>{person.map((p,i)=><li key={i}>{p.name} {p.number}</li> )}</ul>
      );
}
 
export default MapPerson;