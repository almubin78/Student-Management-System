import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SaveButton from './RoutineComponents/SaveButton';
import CategorySelector from './RoutineComponents/CategorySelector';
import TopicSelector from './RoutineComponents/TopicSelector';
import TaskInput from './RoutineComponents/TaskInput';
import TaskList from './RoutineComponents/TaskList';

const categories = {
  'Islamic Knowledge': ['Quran Memorization','Quran Vocabulary', 'Hadith Study', 'Islamic Book'],
  'Teacher Exam': ['Collage Written','Collage MCQ','High School Written (Physics)','High School Written (Chemistry)','High School MCQ','Exam Patterns'],
  'Teaching Related': ['Writing Sheet','Routine,Tracking Sheet,Message','Chapter Analysis'],
  'Development': ['Python Video Practice','Javascript Video Practice','Github Video Practice','Frontend Explore','Backend Explore','Documentations'],
  'Online Earning Preparation': ['Gig Creation','Portfolio','Resume','LinkedIn']
};

const recurring = [
  { category: 'Development', topic: 'Python Video Practice', task: '30 minutes Python practice' },
  { category: 'Islamic Knowledge', topic: 'Quran Vocabulary', task: 'Learn 5 new Quranic words' }
];

const RoutineManager = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const today = new Date().toLocaleDateString();
  const now = new Date().toLocaleTimeString();

  // Fetch & merge recurring tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        // const res = await axios.get('/api/tasks');
        const mock = [];
        const alreadyHas = (cat, top) => mock.some(t => t.category === cat && t.topic === top && t.date === today);
        const newRecurring = recurring.filter(r => !alreadyHas(r.category, r.topic)).map(r => ({
          ...r, id: Date.now() + Math.random(), completed: false, time: now, date: today, isRecurring: true
        }));
        setDailyTasks([...mock, ...newRecurring]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!taskInput || !selectedCategory || !selectedTopic) return;
    const newTask = {
      id: Date.now(),
      category: selectedCategory,
      topic: selectedTopic,
      task: taskInput,
      completed: false,
      time: now,
      date: today,
      isRecurring: false
    };
    setDailyTasks(prev => [...prev, newTask]);
    setTaskInput('');
  };

  const toggleComplete = (id) => {
    const updated = dailyTasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setDailyTasks(updated);
    const task = dailyTasks.find(t => t.id === id);
    if (!task.completed) setCompletedTasks([...completedTasks, task]);
  };

  const deleteTask = (id) => {
    setDailyTasks(prev => prev.filter(t => t.id !== id));
  };

  const saveTasksToBackend = async () => {
    setIsLoading(true);
    try {
      // await axios.post('/api/tasks', { dailyTasks, completedTasks });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700">My Daily Routine</h1>

        <SaveButton onSave={saveTasksToBackend} isLoading={isLoading} success={saveSuccess} />

        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {selectedCategory && (
          <TopicSelector
            topics={categories[selectedCategory]}
            selectedTopic={selectedTopic}
            onSelect={setSelectedTopic}
          />
        )}

        {selectedTopic && (
          <TaskInput
            taskInput={taskInput}
            onChange={setTaskInput}
            onSubmit={addTask}
          />
        )}

        <TaskList
          title="Today's Tasks"
          tasks={dailyTasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          loading={isLoading}
        />

        {completedTasks.length > 0 && (
          <TaskList title="Completed Tasks" tasks={completedTasks} completed />
        )}
      </div>
    </div>
  );
};

export default RoutineManager;
