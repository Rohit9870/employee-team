import React, { useState, useEffect} from 'react';
import './App.css';

const employeesData = [
  // {id:1, first_name:"Jaymee", last_name:"Imm", email:"jimm0@craigslist.org", gender:"Genderqueer", age:80},
  { id: 1, first_name: 'John', last_name: 'Doe', age: 28 },
  { id: 2, first_name: 'Jane', last_name: 'Smith', age: 34 },
  { id: 3, first_name: 'Emily', last_name: 'Johnson', age: 22 },
  { id: 4, first_name: 'Michael',last_name: 'Brown', age: 45 },
  { id: 5, first_name: 'Jessica', last_name: 'Davis', age: 30 },
  { id: 6, first_name: 'Rohit', last_name: 'Pathak', age: 25 },
  { id: 7, first_name: 'Jamy', last_name: 'Green', age: 32 },
  { id: 8, first_name: 'Joy', last_name: 'Doe', age: 28 },
  { id: 9, first_name: 'Jakelin', last_name: 'Far', age: 34 },
  { id: 10, first_name: 'Akshay', last_name: 'Kumar', age: 22 },
  { id: 11, first_name: 'Krithik', last_name: 'Roshan', age: 45 },
  { id: 12, first_name: 'Ritik', last_name: 'Kumar', age: 30 },
  { id: 13, first_name: 'Ravi', last_name: 'Sharma', age: 25 },
  { id: 14, first_name: 'Shyam', last_name: 'Sharma', age: 28 },

];

function App() {
  const [employees, setEmployees] = useState(employeesData);
  const [team, setTeam] = useState([]);

  const addToTeam = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setTeam([...team, employee]);
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, added: true } : emp
      )
    );
  };

  const removeFromTeam = (id) => {
    setTeam(team.filter((member) => member.id !== id));
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, added: false } : emp
      )
    );
  };

  useEffect(() => {
    setTeam((prevTeam) => [...prevTeam].sort((a, b) => a.age - b.age));
  }, [team.length]);

  const calculateAverageAge = () => {
    const totalAge = team.reduce((sum, member) => sum + member.age, 0);
    return team.length ? (totalAge / team.length).toFixed(2) : 0;
  };

  return (
    <div className="container">
      <div className="box" id="employeeListBox">
        <h2 style={ {textAlign: 'center'}}>Employees</h2>
        <hr></hr>
        <div className='scrollable'>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} style={{ color: employee.added ? '#ccc' : '#000' }}>
              <span style={{ width: '20%'}}>{employee.first_name}</span>
              <span>{employee.age}</span>
              <button
                onClick={() => addToTeam(employee.id)}
                disabled={employee.added}
                className={employee.added ? 'disabled' : ''}
              >
                ADD
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="box" id="teamListBox">
        <h2 style={ {textAlign: 'center'}}>Team Members</h2>
        <hr></hr>
        <div className='scrollable'>
          <ul>
            {team.map((member) => (
              <li key={member.id}>
                <span style={{ width: '20%'}}>{member.first_name}</span> 
                <span>{member.age}</span>
                <button onClick={() => removeFromTeam(member.id)}>REMOVE</button>
              </li>
            ))}
          </ul>
          </div>
        <div id="averageAge">Average Age: {calculateAverageAge()}</div>
        {/* <button onClick={sortTeamByAge}>Sort by Age</button> */}
      </div>
    </div>
  );
}

export default App;
