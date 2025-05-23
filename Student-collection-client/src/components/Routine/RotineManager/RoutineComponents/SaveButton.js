const SaveButton = ({ onSave, isLoading, success }) => (
  <div className="flex justify-end mb-6">
    <button
      onClick={onSave}
      disabled={isLoading}
      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
    >
      {isLoading ? 'Saving...' : 'Save Progress'}
    </button>
    {success && <span className="ml-3 text-green-600">✔️ Saved</span>}
  </div>
);
export default SaveButton;
