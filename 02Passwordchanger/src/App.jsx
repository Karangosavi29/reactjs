import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [characterallow, setcharacterallow] = useState(false);
  const [Password, setpassword] = useState("");

  //use ref hook
   const Passwordref= useRef (null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallow) str += "0123456789";
    if (characterallow) str += "!@#$%&()_+-=[]{}|;:<>?/~ ";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length );

      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberallow, characterallow, setpassword]);

  const copyPasswordToClipboard =useCallback( () =>{
    Passwordref.current?.select();
    Passwordref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect( () => {
    passwordGenerator()
  }, [length, numberallow, characterallow, passwordGenerator])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input  
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 text-red-900 bg-white "
            placeholder="Password"
            readOnly
            ref ={Passwordref}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>

        </div>
        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input type="range" 
                min={6} max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e)=>{setlength(Number(e.target.value))}}
              />
                <label>Length: {length}</label>
            </div>
             <div className="flex items-center gap-x-1">
              <input type="checkbox"
                     defaultChecked={numberallow}
                     id="numberInput"
                     onChange={() => {
                      setnumberallow((prev) => !prev );
                     }}
              
              />
              <label htmlFor="numberInput">Numbers</label>

             </div>
              <div className="flex items-center gap-x-1">
              <input type="checkbox"
                     defaultChecked={characterallow}
                     id="characterInput"
                     onChange={() => {
                      setcharacterallow((prev) => !prev );
                     }}
              
              />
              <label htmlFor="characterInput">Characters</label>

             </div>

        </div>

      </div>
    </>
  );
}

export default App;
