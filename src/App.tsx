import "./styles.css";
import { Key, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import users from "./data";
import { Card, CardList, RemoveButton, RestoreButton } from "App.style";
import Counter from "./Counter";

export default function App(props: any) {
  const [activeUsersData, setActiveUsersData] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [removedUsers, setRemovedUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [text, setText] = useState("");


  useEffect(() => {
    const generateRandomSequence = () => {
      const characters = 'ABCDEF123456';
      let result = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };

    const filteredUsersOnLoad = users.filter(user => user.age >= 18);
    const mappedUsersOnLoad = filteredUsersOnLoad.map(user => ({
      id: generateRandomSequence(),
      username: user.username,
      address: user.address,
      age: user.age,
      companyName: user.company.name
    }));

    mappedUsersOnLoad.sort((a, b) => {
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      return a.companyName.localeCompare(b.companyName);
    });
    setActiveUsersData(mappedUsersOnLoad);
  }, []);

  const handleRemoveUser = (userId: string) => {
    const removedUser = activeUsersData.find(user => user.id === userId);
    setRemovedUsers(prevRemovedUsers => [...prevRemovedUsers, removedUser]);
    const updatedUsersData = activeUsersData.filter((user: { id: string; }) => user.id !== userId);
    setActiveUsersData(updatedUsersData);
  };

  const handleRestoreUser = (userId: string) => {
    const restoredUser = removedUsers.find(user => user.id === userId);
    setActiveUsersData(prevUsersData => [...prevUsersData, restoredUser].sort((a, b) => {
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      return a.companyName.localeCompare(b.companyName);
    }));
    setRemovedUsers(prevRemovedUsers =>
      prevRemovedUsers.filter(user => user.id !== userId)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setSearchInput(searchText);
    if (searchText === '') {
      setFilteredUsers([]);
      return;
    }
    const allUsers = [...activeUsersData, ...removedUsers];
    const updatedUser = allUsers.filter(user =>
      user.username.toLowerCase().includes(searchText)
    );
    setFilteredUsers(updatedUser);
  };

  return (
    <>
      <Counter></Counter>
      <p style={{ marginBottom: 0, marginTop: 30 }}>Search for a user</p>
      <TextField
        defaultValue={text}
        style={{ display: "block", margin: "auto" }}
        onChange={handleSearchChange}
      />
      <CardList>
        {filteredUsers.length ?
          filteredUsers.map((user: any, index: Key) => (
            <Card key={index}>
              <h2>ID: {user.id}</h2>
              <p>Username: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Address: {JSON.stringify(user.address)}</p>
              <p>Company Name: {user.companyName}</p>
              {removedUsers.includes(user) && (
                <RestoreButton onClick={() => handleRestoreUser(user.id)}>
                  Restore
                </RestoreButton>
              )}
              {!removedUsers.includes(user) && (
                <RemoveButton onClick={() => handleRemoveUser(user.id)}>
                  Remove
                </RemoveButton>
              )}
            </Card>
          ))
          :
          activeUsersData.map((user: any, index: Key) => (
            <Card key={index}>
              <h2>ID: {user.id}</h2>
              <p>Username: {user.username}</p>
              <p>Age: {user.age}</p>
              <p>Address: {JSON.stringify(user.address)}</p>
              <p>Company Name: {user.companyName}</p>
              {removedUsers.includes(user) && (
                <RestoreButton onClick={() => handleRestoreUser(user.id)}>
                  Restore
                </RestoreButton>
              )}
              {!removedUsers.includes(user) && (
                <RemoveButton onClick={() => handleRemoveUser(user.id)}>
                  Remove
                </RemoveButton>
              )}
            </Card>
          ))
        }
      </CardList>
    </>
  );
}
