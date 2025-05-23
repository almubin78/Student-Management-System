const CategorySelector = ({ categories, selectedCategory, onSelect }) => (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-gray-800">Select Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {Object.keys(categories).map(cat => (
        <button key={cat} onClick={() => onSelect(cat)}
          className={`py-2 px-4 rounded-lg shadow-sm ${
            selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-indigo-100 text-gray-700'
          }`}>
          {cat}
        </button>
      ))}
    </div>
  </div>
);
export default CategorySelector;
// CategorySelector.propTypes = {
//   categories: PropTypes.object.isRequired,       
//   selectedCategory: PropTypes.string.isRequired,
//   onSelect: PropTypes.func.isRequired,   
