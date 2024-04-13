

function Header() {

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl">Publishing Platform</button>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost">Profile</button>
        <button className="btn btn-ghost">Settings</button>
      </div>
    </div>
  );
}

export default Header;