import React from 'react';

const DisplayDirectory = (props) => {

    const { persons, showAll, searchName, removeEntry } = props;

    const entriesToShow = showAll ? persons : persons.filter(p => p.name.toString().toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
    return (
        <div>
            {entriesToShow.map(p => <div key={p.id}><ul key={p.name}>ID: {p.id}<br></br> Name: {p.name}<br></br> Number: {p.number} <button key={p.id} onClick={() => removeEntry(p.id)}>Delete</button></ul> </div>)}
        </div>
    )
}
export default DisplayDirectory;