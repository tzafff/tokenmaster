// Assets
import down from "../assets/angle-down-solid.svg";
import Swal from "sweetalert2";

const Sort = ({ tokenMaster, provider, owner, account }) => {
  const withdrawHandler = async () => {
    try {
      const signer = await provider.getSigner();
      const transaction = await tokenMaster.connect(signer).withdraw();
      await transaction.wait();

      Swal.fire({
        title: "Withdraw!",
        text: "Funds Withdrawn Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while processing your request. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="sort">
      <div className="sort__select">
        <p>Select Your Genre</p>
        <img src={down} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Select Your Dates</p>
        <img src={down} alt="Dropdown" />
      </div>

      <div className="sort__select">
        <p>Select Your Distance</p>
        <img src={down} alt="Dropdown" />
      </div>

      {owner === account && (
        <div className="">
          <button className="card__button" onClick={() => withdrawHandler()}>
            Withdraw Funds
          </button>
        </div>
      )}
    </div>
  );
};

export default Sort;
