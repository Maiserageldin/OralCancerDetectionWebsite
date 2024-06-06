export default function Header2({ username }) {
  return (
    <div className="flex justify-between items-center py-6 px-8 bg-white ">
      <img className="w-40 h-auto" src="/logo.png" alt="Logo" />
      <ul className="flex space-x-4 list-none items-center">
        <li className="text-black text-xl font-bold font-josefin-sans italic bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
          Logged in as, <span className="text-purple-600">{username}</span>
        </li>
      </ul>
    </div>
  );
}
