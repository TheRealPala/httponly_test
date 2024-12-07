function App() {
  return (
    <div className="App">
      <h1>TEST</h1>

      <button
        onClick={async () => {
          fetch("http://localhost:5012/api/set-cookie", {
            method: "GET",
            credentials: "include", // Include i cookie
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Errore:", error));
        }}
      >
        Request cookie
      </button>

      <button
        onClick={async () => {
          fetch("http://localhost:5012/api/get-cookie", {
            method: "GET",
            credentials: "include", // Include i cookie
          })
            .then((response) => response.json())
            .then((data) => console.log("Cookie ricevuto:", data))
            .catch((error) => console.error("Errore:", error));
        }}
      >
        Get cookie
      </button>
    </div>
  );
}

export default App;
