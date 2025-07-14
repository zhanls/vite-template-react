import { createContext, Dispatch, useContext, useMemo, useReducer, useState } from 'react';

const ageReducer = (state: number, action: string) => {
  if (action === 'add') {
    return state + 1;
  }
  return state;
};

const UserContext = createContext<{
  user: string;
  setUser: (user: string) => void;
}>({
  user: 'John',
  setUser: () => {},
});

const ageContext = createContext(0);

const ageDispatchContext = createContext<Dispatch<string>>(() => {});

const AgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [age, setAge] = useReducer(ageReducer, 0);

  return (
    <ageContext.Provider value={age}>
      <ageDispatchContext.Provider value={setAge}>{children}</ageDispatchContext.Provider>
    </ageContext.Provider>
  );
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState('John');
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserName = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return <h2>姓名: {user}</h2>;
};

const UserAgeUpdater = () => {
  const setAge = useContext(ageDispatchContext);
  console.log('UserAgeUpdater');
  return <button onClick={() => setAge('add')}>增加年龄</button>;
};

const UserAge = () => {
  const age = useContext(ageContext);
  return <h2>年龄: {age}</h2>;
};

export function Component() {
  return (
    <AgeProvider>
      <UserProvider>
        <UserName />
        <UserAgeUpdater />
        <UserAge />
      </UserProvider>
    </AgeProvider>
  );
}
