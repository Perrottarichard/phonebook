import React from 'react';

const FilterBox = (props) => {

    const { searchName, handleSearchName } = props;
    return (
        <div>
            Filter shown: <input
                value={searchName}
                onChange={handleSearchName} />
        </div>
    )
}
export default FilterBox;