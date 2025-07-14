import { createContext, useContext, useMemo, useState } from 'react';

const UserContext = createContext<{
  user: { name: string; age: number };
  setUser: (
    user: { name: string; age: number } | ((prev: { name: string; age: number }) => { name: string; age: number }),
  ) => void;
}>({
  user: { name: '', age: 0 },
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ name: 'John', age: 24 });
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserName = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return <h2>姓名: {user.name}</h2>;
};

const UserAgeUpdater = () => {
  const { setUser } = useContext(UserContext);
  return <button onClick={() => setUser((prev) => ({ ...prev, age: prev.age + 1 }))}>增加年龄</button>;
};

export function Component() {
  return (
    <UserProvider>
      <UserName />
      <UserAgeUpdater />
    </UserProvider>
  );
}
