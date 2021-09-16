import React from 'react';
const AddPerson = ({onSubmit, onNameChange, onNumberChange, Namevalue, Numvalue}) => {
    return ( 
        <form onSubmit={onSubmit}>
        <div>
          name: <input value={Namevalue} onChange={onNameChange}/><br/>
          number <input value={Numvalue} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
     );
}
 
export default AddPerson;