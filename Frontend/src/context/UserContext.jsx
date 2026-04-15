import React, { createContext, useState, useContext } from 'react'

export const UserDataContext = createContext()


// const UserContext = ({ children }) => {

//     const [ user, setUser ] = useState({
//         email: '',
//         fullName: {
//             firstName: '',
//             lastName: ''
//         }
//     })

//     return (
//         <div>
//             <UserDataContext.Provider value={{ user, setUser }}>
//                 {children}
//             </UserDataContext.Provider>
//         </div>
//     )
// }

const UserContext = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateUser
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext