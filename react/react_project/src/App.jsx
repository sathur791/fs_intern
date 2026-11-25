function Data(props) {
  return <h2>College Name : {props.obj}</h2>
}

function Team(props) {
  const containerStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "12px",
    justifyContent: "center"
  }

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px 16px",
    minWidth: "140px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  }

  return (
    <div>
      <h2>List of Players</h2>
      <div style={containerStyle}>
        {props.obj.map((player) => (
          <div key={player.id} style={cardStyle}>
            <h3 style={{ margin: "0 0 6px 0" }}>{player.name}</h3>
            <p style={{ margin: 0 }}>Team: {player.team}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const playersData = [
    { id: 100, name: "Kohli", team: "India" },
    { id: 101, name: "Dhoni", team: "India" },
    { id: 102, name: "Sachin", team: "India" }
  ]

  return (
    <div>
      <h2>Welcome to App</h2>
      <Data obj="Sece" />
      <Team obj={playersData} />
    </div>
  )
}

export default App