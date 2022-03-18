import "./App.css";
import bunzz from "bunzz-sdk";
import { useEffect, useState } from "react";
import { Contract } from "bunzz-sdk";

// Set your keys
const { DAPP_ID,API_KEY } = require("./secrets.json");

function App() {
  // Define local state
  const [contract, setContract] = useState<Contract>();
  const [value, setValue] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const init = async () => {
    // Initialize SDK
    const handler = await bunzz.initializeHandler({
      dappId: DAPP_ID,
      apiKey: API_KEY,
    });
    const contract = await handler.getContract("Token (ERC20)");
    const userAddress = await handler.getSignerAddress();

    // Set local state
    setContract(contract);
    setUserAddress(userAddress);
  };

  // Run init() when rendering
  useEffect(() => {
    init();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(Number(event.target.value));
  };

  const submit = async () => {
    if (!contract) return;

    await contract.mint(userAddress, value);
    alert("Transaction was sent in success🎉");
  };

  return (
    <div className="App App-header">
      <p>You can mint your ERC20 if you're the owner</p>
      <input value={value} onChange={handleChange} type="text" />
      <button onClick={submit}>mint</button>
    </div>
  );
}

export default App;