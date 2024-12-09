import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './RegistrationForm';
// import FormPage from './FormPage';

const App = () => {
  return (
    <div className="App">
      {/* <FormPage /> */}
      <RegistrationForm />      
    </div>
  );
};

export default App;

// App.js
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import FormPage from './FormPage';
// import RegistrationForm from './RegistrationForm';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('FormPage');

//   const handleNextPage = () => {
//     setCurrentPage('RegistrationForm');
//   };

//   return (
//     <div className="App">
//       {currentPage === 'FormPage' && <FormPage onNextPage={handleNextPage} />}
//       {currentPage === 'RegistrationForm' && <RegistrationForm />}
//     </div>
//   );
// };

// export default App;
