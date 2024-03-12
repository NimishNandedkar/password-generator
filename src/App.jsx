import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
 
  const [length , setLength] = useState(6)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)

  const [password , setPassword] = useState("")

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str +="0123456789"
    if (charAllowed) str +="!@#$%&*"

    for (let i = 0; i < length; i++) {
      let charPosition = Math.floor(Math.random()*str.length + 1)
      
      pass += str.charAt(charPosition) 

      

    }
    setPassword(pass)

  } , [length, numberAllowed, charAllowed , setPassword])

  useEffect(()=>{passwordGenerator()}, [length, numberAllowed, charAllowed , passwordGenerator])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      
      <div className="flex items-center justify-center text-lg text-center w-screen h-screen bg-gradient-to-b from-blue-900 to-gray-900 font-sans ">
  <div className="text-orange-300 bg-gray-800 w-full max-w-md mx-auto  rounded-lg p-8 shadow-[5px_5px_rgba(151,_212,_240,_0.4),_10px_10px_rgba(151,_212,_240,_0.3),_15px_15px_rgba(151,_212,_240,_0.2),_20px_20px_rgba(151,_212,_240,_0.1),_25px_25px_rgba(151,_212,_240,_0.05)]">
    <h2 className="text-4xl mb-4 font-extrabold text-white">Password Generator</h2>

    <div className="flex shadow-sm rounded-md my-2 overflow-hidden mb-4">
      <input
        type="text"
        value={password}
        className="outline-none w-full py-2 px-4 bg-gray-700 text-white font-mono"
        placeholder="Your Secure Password"
        readOnly
        ref={passwordRef}
      />
      <button
        onClick={copyPassword}
        className="outline-none bg-blue-500 text-white px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none rounded-r-lg rounded-none hover:ring-2"
      >
        Copy
      </button>
    </div>

    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={6}
          max={20}
          value={length}
          className="cursor-pointer appearance-none w-full h-2 bg-gray-700 rounded-full outline-none"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label htmlFor="range" className="text-white ml-2">
          Length: {length}
        </label>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
          className="appearance-none border-2 border-gray-700 rounded-md checked:bg-blue-500 checked:border-blue-500 outline-none h-4 w-4"
        />
        <label htmlFor="numberInput" className="text-white">
          Include Numbers
        </label>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          className="appearance-none border-2 border-gray-700 rounded-md checked:bg-blue-500 checked:border-blue-500 outline-none h-4 w-4"
        />
        <label htmlFor="charInput" className="text-white">
          Include Special Characters
        </label>
      </div>
    </div>
  </div>
</div>

      
    </>
  )
}

export default App
