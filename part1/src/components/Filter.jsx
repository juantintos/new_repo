const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        Filter by Name: <input value={filter} onChange={handleFilterChange}/>
      </div>
    )
  }

export default Filter