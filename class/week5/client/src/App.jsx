import {useState, useEffect} from 'react'

const App = () => {
  const [message, setMessage] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  // Make a fetch function 
  const fetchData = async() =>{
    try {
      const response = await fetch(`http://localhost:8000/data` );
      const data = await response.json();

      setMessage(JSON.stringify(data));
    }catch (error) {
      console.log(error)

    }
  }

  const loginForm = async(e) =>{
    e.preventDefaults();
    try {
      const response = await fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {"Content-Type": "application/jason"},
        body: "WE ADD SOMETHING HERE"
        });
        const data = await response.json();
        setMessage(JSON.stringify(data));

    }catch (error) {
      console.log(error)
    }
  }

// Webform forfile upload
const fileUpload = async (e) =>{
 e.preventDefaults();
 const formData = new FormData();
 formData.append("file", )

    try {
      const response = await fetch(`http://localhost:8000/fileform`, {
        method: "POST",
        body: formData,
        });
        const data = await response.json();
        setMessage(JSON.stringify(data));

    }catch (error) {
      console.log(error)
    }
}
  return (
    <div>
      {message}

      <button onClick={fetchData}>Click me for Data</button>
      <form onSubmit={loginForm}>
        <input 
        type='email'
        placeholder='email'
        value={email}
        onChange={(e)=>{setEamil(e.target.value)}}
        required
        />

        <input 
        type='password'
        placeholder='password'
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        required
        />
        <button type='submit'>Login</button>
      </form>

      <form onSubmit={fileUpload}>
        <input 
        type='file'
        multiple
        onChange={(e)=>{setFile(e.target.value)}}
        />
        <button type='submit'>Upload file</button>
      </form>
 
     
    </div>
  )
}

export default App