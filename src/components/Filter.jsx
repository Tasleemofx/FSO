import React from 'react';
const Filter = ({onChange, placeholder}) => {
    return (<input 
      placeholder={placeholder}
      onChange={onChange}
      />
     );
}
 
export default Filter;