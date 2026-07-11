import { useState } from "react"

function LoginPage  () {

  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [LoginErrorMessage, setLoginErrorMessage] = useState("")

  function handleLoginSubmit(event){
    event.preventDefault()

    setLoginErrorMessage("")

    if(displayName.trim() === "" && username.trim() ==="" && password.trim() === "" ){
      setLoginErrorMessage("Details must be entered to proceed")
      return
    }

    if(displayName.trim() === "" ){
      setLoginErrorMessage("Please enter your display name")
      return
    }
    if(username.trim() ==="" || password.trim() === ""){
      setLoginErrorMessage("Username or Password missing")
      return
    }
    

  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            CoinLume
          </h1>

          <p className="mt-2 text-slate-500">
            Crypto markets, clearly illuminated.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-slate-800">
            Sign in to your dashboard
          </h2>
        </header>

        <div className="mt-5 rounded-lg bg-blue-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-blue-800">
            Demo credentials
          </p>

          <p className="mt-2">
            Username: <span className="font-medium">user</span>
          </p>

          <p>
            Password: <span className="font-medium">1234</span>
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="mb-1 block font-medium text-slate-700"
            >
              Display name
            </label>

            <input
              id="displayName"
              type="text"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(event)=>setDisplayName(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-1 block font-medium text-slate-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event)=>setUsername(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <p className="min-h-5 text-sm text-red-600">
            {LoginErrorMessage}
          </p>

          <button
            type="button"
            onClick={handleLoginSubmit}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage