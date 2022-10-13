import {useState, useRef, useEffect} from "react";
import {FaClipboard} from "react-icons/fa";
import {number, upperCaseLetters, lowerCaseLettters, specialCharacters} from "./Characters";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ALERT, COPY_SUCCESS} from "./Message";
import './Styles.scss';

toast.configure();
function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const copyBtn = useRef();

  useEffect(() => {
    handleGeneratorPassword();
  }, []);

  const handleGeneratorPassword = () => {
    if(!uppercase && !lowercase && !numbers && !symbols) {
      notifs(ALERT, true);
    }

    let characterList = "";
    if(uppercase) {
      characterList += upperCaseLetters;
    }
    if(lowercase) {
      characterList += lowerCaseLettters;
    }
    if(numbers) {
      characterList += number;
    }
    if(symbols) {
      characterList += specialCharacters;
    }
    setPassword(passwordCreator(characterList));
  }

  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for(let i = 0; i < passwordLength; i++) {
      const characterIndex = generateRandomIndex(characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  }

  const generateRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  }

  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  }

  const notifs = (message, error) => {
    if(error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } 
    else {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }

  const handleCopy = () => {
    copyFromClipboard();
    notifs(COPY_SUCCESS, false);
  }

  return (
    <div className='container'>
      <div className='generator'>
        <h2 className='generator_header'>Password Generator</h2>
        <div className='generator_password'>
          {password}
          <button className='generator_passwordGenerateBtn' ref={copyBtn} onClick={handleCopy}>
            <FaClipboard />
          </button>
        </div>
        <div className='form-group'>
          <label htmlFor='password-length'>Password Length</label>
          <input name='password-length' id='password-length' type='number' max='20' min='7' defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
          <input name='uppercase-letters' id='uppercase-letters' type='checkbox' checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
        </div>
        <div className='form-group'>
          <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
          <input name='lowercase-letters' id='lowercase-letters' type='checkbox' checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
        </div>
        <div className='form-group'>
          <label htmlFor='numbers'>Include Numbers</label>
          <input name='numbers' id='numbers' type='checkbox' checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
        </div>
        <div className='form-group'>
          <label htmlFor='symbols'>Include Symbols</label>
          <input name='symbols' id='symbols' type='checkbox' checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
        </div>
        <button className='generator_btn' onClick={handleGeneratorPassword}>Generate New Password</button>
      </div>
    </div>
  );
}
export default App;
