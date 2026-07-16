function SidebarItem({ to, icon, label, isSidebarOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 ${
            isActive
              ? "bg-gray-200 font-medium dark:bg-slate-700"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`
        }
      >
        {icon}

        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            isSidebarOpen
              ? "w-32 opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          {label}
        </span>
      </NavLink>
    </li>
  )
}