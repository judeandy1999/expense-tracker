import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Tracker</span>
      </a>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Get started</button>
        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
        </button>
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link href="/" className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:p-0" aria-current="page">Home</Link>
          </li>
          <li>
            <Link href="/add-transactions" className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:p-0 " aria-current="page">Add Transaction</Link>
          </li>
          <li>
            <Link href="/editor" className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:p-0" aria-current="page">Editor</Link>
          </li>
          <li>
            <Link href="/reports" className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:p-0" aria-current="page">Reports</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
}
