const TaskInput = ({ taskInput, onChange, onSubmit }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Task</h2>
    <div className="flex gap-3">
      <input
        value={taskInput}
        onChange={e => onChange(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && onSubmit()}
        placeholder="Enter your task..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onSubmit}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Add Task
      </button>
    </div>
  </div>
);
export default TaskInput;
