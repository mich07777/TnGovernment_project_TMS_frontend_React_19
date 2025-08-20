import React, { useState } from 'react'

const InputDetails = () => {

  let [namelist, UpdateValues] = useState({
    name: "",
    age: "",
    email: ""
  });

  let [UpdateNameList, UserNameList] = useState([]);

  const userUpdate = (event) => {
    UpdateValues({ ...namelist, [event.target.name]: event.target.value });
  }

  const UserSubmit = () => {
    UserNameList([...UpdateNameList, namelist])
  }

  let result = UpdateNameList.map((value, index) => {
    return (
      <tr key={index}>
        <td>{value.name}</td>
        <td>{value.age}</td>
        <td>{value.email}</td>
      </tr>
    )
  })

  return (
    <div>
      <div>
        <h6>Name:</h6>
        <input type="text" name="name" placeholder="Enter the Nmae" onChange={userUpdate} />
      </div>

      <div>
        <h6>Age:</h6>
        <input type="text" name="age" placeholder="Enter the Age" onChange={userUpdate} />
      </div>

      <div>
        <h6>Email:</h6>
        <input type="text" name="email" placeholder="Enter the Email" onChange={userUpdate} />
      </div>
      <button onClick={() => UserSubmit()}>login</button>

      <table>
        <tr>
          <thead>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </thead>
        </tr>
        <tbody>
            {result}
        </tbody>
      </table>
    </div>
  )
}

export default InputDetails