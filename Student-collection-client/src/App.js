
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router2 from './router/router2';
// import router from './router/router';
// import useFetchStudentsData from './hooks/useFetchStudentsData';
// import { useEffect } from 'react';



function App() {
  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  // }, [])

// const {NineStudentsData}=useFetchStudentsData();
// console.log(NineStudentsData);
  return (
    <RouterProvider router={router2}>

    </RouterProvider>
  );
}

export default App;
