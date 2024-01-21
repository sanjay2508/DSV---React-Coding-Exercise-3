import Counter from "counter";
import "./styles.css";
import { Key, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import users from "./data";
import { Card, CardList, RemoveButton, RestoreButton } from "App.style";

export default function App(props: any) {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [removedUsers, setRemovedUsers] = useState<any[]>([]);
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

    console.log(mappedUsersOnLoad);
    setFilteredUsers(mappedUsersOnLoad);
  }, []);

  const handleRemoveUser = (userId: number) => {
    const removedUser = filteredUsers.find(user => user.id === userId);
    setRemovedUsers(prevRemovedUsers => [...prevRemovedUsers, removedUser]);
    const updatedUsersData = filteredUsers.filter((user: { id: number; }) => user.id !== userId);
    setFilteredUsers(updatedUsersData);
  };

  const handleRestoreUser = (userId: number) => {
    const restoredUser = removedUsers.find(user => user.id === userId);
    setFilteredUsers(prevUsersData => [...prevUsersData, restoredUser]);
    setRemovedUsers(prevRemovedUsers =>
      prevRemovedUsers.filter(user => user.id !== userId)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setSearchInput(searchText);
    const allUsers = [...filteredUsers, ...removedUsers];
    const updatedUser = allUsers.filter(user =>
      user.username.toLowerCase().includes(searchInput)
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
        {filteredUsers.map((user: any, index: Key) => (
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
        ))}
      </CardList>
    </>
  );
}
