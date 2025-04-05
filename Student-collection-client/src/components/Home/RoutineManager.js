import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For backend communication

const RoutineManager = () => {
  // Categories and their topics
  const categories = {
    'Islamic Knowledge': ['Quran Memorization','Quran Vocabulary', 'Hadith Study', 'Islamic Book'],
    'Teacher Exam': ['Collage Written','Collage MCQ', 'High School Written (Physics)','High School Written (Chemistry)','High School MCQ', 'Exam Patterns'],
    'Teaching Related': ['Writing Sheet', 'Routine,Tracking Sheet,Message', 'Chapter Analysis'],
    'Development': ['Python Video Practice', 'Javascript Video Practice', 'Github Video Practice','Frontend Explore','Backend Explore','Documentations'],
    'Online Earning Preparation': ['Gig Creation', 'Portfolio', 'Resume','LinkedIn']
  };

  // Daily recurring tasks
  const dailyRecurringTasks = [
    { category: 'Development', topic: 'Python Video Practice', task: '30 minutes Python practice' },
    { category: 'Islamic Knowledge', topic: 'Quran Vocabulary', task: 'Learn 5 new Quranic words' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load tasks from backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        // const response = await axios.get('/api/tasks');
        // Mock data - replace with actual API call
        const mockTasks = [];
        setDailyTasks(mockTasks);
        
        // Add daily recurring tasks if they don't exist
        const currentDate = new Date().toLocaleDateString();
        const shouldAddRecurring = !mockTasks.some(task => 
          dailyRecurringTasks.some(recurring => 
            task.category === recurring.category && 
            task.topic === recurring.topic &&
            task.date === currentDate
          )
        );
        
        if (shouldAddRecurring) {
          const tasksWithRecurring = [
            ...mockTasks,
            ...dailyRecurringTasks.map(task => ({
              ...task,
              id: Date.now() + Math.random(),
              completed: false,
              time: new Date().toLocaleTimeString(),
              date: currentDate,
              isRecurring: true
            }))
          ];
          setDailyTasks(tasksWithRecurring);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

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
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        isRecurring: false
      };
      setDailyTasks([...dailyTasks, newTask]);
      setTaskInput('');
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = dailyTasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    );
    setDailyTasks(updatedTasks);
    
    // Move to completed if checked
    const task = dailyTasks.find(t => t.id === taskId);
    if (task?.completed === false) {
      setCompletedTasks([...completedTasks, task]);
      
      // Send completion to backend
      try {
        // await axios.post('/api/tasks/complete', { taskId });
        console.log('Task completion saved to backend');
      } catch (error) {
        console.error('Error saving completion:', error);
      }
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      // await axios.delete(`/api/tasks/${taskId}`);
      setDailyTasks(dailyTasks.filter(task => task.id !== taskId));
      console.log('Task deleted from backend');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Save all tasks to backend
  const saveTasksToBackend = async () => {
    try {
      setIsLoading(true);
      // await axios.post('/api/tasks', { 
      //   dailyTasks, 
      //   completedTasks 
      // });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      console.log('Tasks saved to backend');
    } catch (error) {
      console.error('Error saving tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">My Daily Routine Manager</h1>
        
        {/* Save Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={saveTasksToBackend}
            disabled={isLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Progress'}
          </button>
          {saveSuccess && (
            <span className="ml-3 text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Saved successfully!
            </span>
          )}
        </div>

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
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Today's Tasks</h2>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : dailyTasks.length === 0 ? (
            <p className="text-gray-500 italic">No tasks added yet</p>
          ) : (
            <div className="space-y-3">
              {dailyTasks.map(task => (
                <div
                  key={task.id}
                  className={`bg-white p-4 rounded-lg shadow-sm flex items-center justify-between ${
                    task.completed ? 'opacity-70' : ''
                  } ${task.isRecurring ? 'border-l-4 border-blue-500' : ''}`}
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
                        {task.isRecurring && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Daily
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {task.category} • {task.topic} • {task.time}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={task.isRecurring}
                  >
                    {!task.isRecurring && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
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
                      {task.isRecurring && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Daily
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.category} • {task.topic} • {task.time}
                    </p>
                  </div>
                  <span className="text-green-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </span>
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