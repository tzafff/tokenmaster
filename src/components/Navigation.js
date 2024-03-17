import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
    localStorage.setItem("walletAccount", account);
  };
  const storedAccount = localStorage.getItem("walletAccount");

  return (
    <nav>
      <div className="nav__brand">
        <h1>tokenmaster</h1>

        <input
          className="nav__search"
          type="text"
          placeholder="Find millions of experiences"
        />

        <ul className="nav__links">
          <li>
            <a href="/">Concerts</a>
          </li>
          <li>
            <a href="/">Sports</a>
          </li>
          <li>
            <a href="/">Arts & Theater</a>
          </li>
          <li>
            <a href="/">More</a>
          </li>
        </ul>
      </div>

      {account || storedAccount ? (
        // Display the connected wallet address
        <button type="button" className="nav__connect">
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : `${storedAccount.slice(0, 6)}...${storedAccount.slice(-4)}`}
        </button>
      ) : (
        // Display the connect button if no account is connected
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
