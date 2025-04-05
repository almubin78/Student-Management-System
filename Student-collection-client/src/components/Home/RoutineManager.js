import React, { useState } from 'react';

const RoutineManager = () => {
  // Categories and their topics
  const categories = {
    'Islamic Knowledge': ['Quran Memorization','Quran Vocabulary', 'Hadith Study', 'Fiqh Research'],
    'Teacher Exam': ['Collage Written','Collage MCQ', 'High School Written (Physics)','High School Written (Chemistry)','High School MCQ', 'Exam Patterns'],
    'Private Related': ['Family Time', 'Personal Projects', 'Health & Fitness'],
    'Development': ['Python Video Practice', 'Javascript Video Practice', 'Github Video Practice'],
    'Online Earning Preparation': ['Gig Creation', 'Portfolio', 'Resume']
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedTopic('');
  };

  // Handle topic selection
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  // Add a new task
  const addTask = () => {
    if (taskInput.trim() && selectedCategory && selectedTopic) {
      const newTask = {
        id: Date.now(),
        category: selectedCategory,
        topic: selectedTopic,
        task: taskInput,
        completed: false,
        time: new Date().toLocaleTimeString()
      };
      setDailyTasks([...dailyTasks, newTask]);
      setTaskInput('');
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = dailyTasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    );
    setDailyTasks(updatedTasks);
    
    // Move to completed if checked
    if (dailyTasks.find(t => t.id === taskId)?.completed === false) {
      const task = dailyTasks.find(t => t.id === taskId);
      setCompletedTasks([...completedTasks, task]);
    }
  };

  // Delete task
  const deleteTask = (taskId) => {
    setDailyTasks(dailyTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">My Daily Routine Manager</h1>
        
        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.keys(categories).map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`py-3 px-4 rounded-lg shadow-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white hover:bg-indigo-50 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Selection */}
        {selectedCategory && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Topic</h2>
            <div className="flex flex-wrap gap-3">
              {categories[selectedCategory].map(topic => (
                <button
                  key={topic}
                  onClick={() => handleTopicSelect(topic)}
                  className={`py-2 px-4 rounded-lg shadow-sm transition-all ${
                    selectedTopic === topic
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white hover:bg-indigo-50 text-gray-700'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Task Input */}
        {selectedTopic && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Task for {selectedTopic}
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter your task..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addTask}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Daily Tasks */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Tasks</h2>
          {dailyTasks.length === 0 ? (
            <p className="text-gray-500 italic">No tasks added yet</p>
          ) : (
            <div className="space-y-3">
              {dailyTasks.map(task => (
                <div
                  key={task.id}
                  className={`bg-white p-4 rounded-lg shadow-sm flex items-center justify-between ${
                    task.completed ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="h-5 w-5 text-indigo-600 mr-3"
                    />
                    <div>
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {task.task}
                      </p>
                      <p className="text-sm text-gray-500">
                        {task.category} • {task.topic} • {task.time}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Completed Tasks</h2>
            <div className="space-y-3">
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-green-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium line-through text-gray-500">
                      {task.task}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.category} • {task.topic} • {task.time}
                    </p>
                  </div>
                  <span className="text-green-500">✓ Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutineManager;