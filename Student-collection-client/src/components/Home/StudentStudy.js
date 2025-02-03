import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StudentStudy = () => {
    const [students, setStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    // const [questions, setQuestions] = useState([]);
    const [answeredStudents, setAnsweredStudents] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30); // 5 minutes in seconds 300/5 = 60
  
    // Fetch students and questions from the backend
    useEffect(() => {
      const fetchData = async () => {
        const studentsResponse = await axios.get('nineStudents.json');
        // const studentsResponse = await axios.get('/api/students');
        // const questionsResponse = await axios.get('/api/questions');
        setStudents(studentsResponse.data);
        // setQuestions(questionsResponse.data);
      };
      fetchData();
    }, []);

    console.log(students,'students',answeredStudents,'answeredStudents');
  
    // Set the current student
    useEffect(() => {
      if (students.length > 0) {
        const nextStudent = students.find(student => !answeredStudents.includes(student._id));
        setCurrentStudent(nextStudent);
      }
    }, [students, answeredStudents]);
  
    // Timer logic
    useEffect(() => {
      if (timeLeft === 0) {
        moveToNextStudent();
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);
  
    // Move to the next student
    const moveToNextStudent = () => {
      setAnsweredStudents(prev => [...prev, currentStudent._id]);
      setTimeLeft(300); // Reset timer
    };
  
    // Handle answer submission
    const handleSubmit = async (answers) => {
      await axios.post('/api/answers', { studentId: currentStudent._id, answers });
      moveToNextStudent();
    };
  
    if (!currentStudent) {
      return <div>All students have answered!</div>;
    }
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Student: {currentStudent.name}</h1>
        <div className="mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
        {/* <form onSubmit={(e) => {
          e.preventDefault();
          const answers = questions.map((question, index) => ({
            questionId: question._id,
            answer: e.target.elements[`answer-${index}`].value,
          }));
          handleSubmit(answers);
        }}>
          {questions.slice(0, 5).map((question, index) => (
            <div key={question._id} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{question.text}</label>
              <input
                type="text"
                name={`answer-${index}`}
                className="mt-1 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form> */}
      </div>
    );
  };

export default StudentStudy;