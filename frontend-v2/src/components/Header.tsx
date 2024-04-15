function Header() {

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">Publishing Platform</a>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost" href="/profile">Profile</a>
        <button className="btn btn-ghost">Settings</button>
        <a className="btn btn-ghost" href="/login">Login</a>
      </div>
    </div>
  );
}

export default Header;