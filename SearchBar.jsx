 function SearchBar({ search, setSearch }) {
  return (
    <input
      placeholder="Search contact..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />
  );
}

export default SearchBar;