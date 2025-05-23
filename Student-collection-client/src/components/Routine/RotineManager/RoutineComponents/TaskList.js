const TaskList = ({ title, tasks, onToggle, onDelete, completed = false, loading = false }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {loading ? (
      <div className="text-center text-gray-500 py-6">Loading...</div>
    ) : tasks.length === 0 ? (
      <p className="text-gray-500 italic">No tasks found</p>
    ) : (
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className={`bg-white p-4 rounded-lg shadow-sm flex items-center justify-between ${task.completed ? 'opacity-70' : ''}`}>
            <div className="flex items-center">
              {!completed && (
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="mr-3" />
              )}
              <div>
                <p className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.task}</p>
                <p className="text-sm text-gray-500">{task.category} • {task.topic} • {task.time}</p>
              </div>
            </div>
            {!task.isRecurring && !completed && (
              <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700">Delete</button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
export default TaskList;
