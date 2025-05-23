const TopicSelector = ({ topics, selectedTopic, onSelect }) => (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-gray-800">Select Topic</h2>
    <div className="flex flex-wrap gap-3">
      {topics.map(topic => (
        <button key={topic} onClick={() => onSelect(topic)}
          className={`py-2 px-4 rounded-lg shadow-sm ${
            selectedTopic === topic ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-indigo-50 text-gray-700'
          }`}>
          {topic}
        </button>
      ))}
    </div>
  </div>
);
export default TopicSelector;
