const QuantityInput = ({ incrementQty, qty, decrementQty }) => {
  return (
    <div className="flex items-center w-fit rounded-xl bg-gray-200 overflow-hidden shadow-md">
      <button
        onClick={decrementQty}
        style={{ cursor: "pointer" }}
        className="bg-red-300 hover:bg-red-400 text-red-700 w-10 h-10 flex items-center justify-center text-2xl font-light transition-transform duration-150 active:scale-90 "
      >
        −
      </button>
      <input
        type="number"
        value={qty}
        onChange={() => {}}
        className="hide-arrow w-14 h-10 text-center text-base bg-white focus:outline-none text-gray-800 font-medium transition-colors duration-200 focus:bg-white "
      />
      <button
        onClick={incrementQty}
        style={{ cursor: "pointer" }}
        className="bg-green-300 hover:bg-green-400 text-green-700 w-10 h-10 flex items-center justify-center text-2xl font-light transition-transform duration-150 active:scale-90"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
