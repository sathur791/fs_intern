function Home() {
  return <h2>Home Component</h2>
}

function Data(props) {
  console.log(props)

  return (
    <>
      <h2>College Name : {props.obj}</h2>
    </>
  )
}

function App() {
  return (
    <div>
      <h2>Welcome to App</h2>
      <Home />
      <Data obj="Sece" />
    </div>
  )
}

export default App