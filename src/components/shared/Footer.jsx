export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-600">
          Total a pagar:
          <span className="font-bold text-lg ml-2">${totalAmount}</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Pagar
        </button>
      </div>
    </footer>
  );
}

