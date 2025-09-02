import React from 'react';
import AppContext from './AppContext.js';
const AppContextProvider = ({children}) => {
  const calculateAge=(dob)=>{
    if (!dob) return "-";
    const today=new Date()
    const birthdate=new Date(dob)
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();
    let age=today.getFullYear()-birthdate.getFullYear()
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }
  const value={
    calculateAge
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
