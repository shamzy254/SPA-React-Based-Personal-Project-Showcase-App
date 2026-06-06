export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span role="img" aria-label="search">
        🔎
      </span>
      <input
        type="search"
        placeholder="Search products by name, description, or category"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
