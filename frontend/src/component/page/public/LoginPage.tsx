import {useState} from "react";
import {IUser} from "@model/index.ts";
import {store} from "@store/store.ts";
import {Spinner} from "@ux/loader/Spinner.tsx";
import {useNavigate} from "react-router-dom";
import {NamePages, routes} from "@route/routes.tsx";


export const LoginPage = () => {
    const [detail, setDetail] = useState("")
    const [user, setUser] = useState<IUser>({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function login() {
        setIsLoading(true);
        store.login(user)
            .then(() => {
                navigate(routes[NamePages.PERSONAL_ACCOUNT].path);
                setDetail("");
            })
            .finally(() => setIsLoading(false))
            .catch(reason => {
                if (reason.response.status === 401) {
                    setDetail(reason.response.data.detail);
                }
                console.log(reason)
            })
    }


    return (
        <div className="modal-dialog mb-4" role="document" style={{maxWidth: "450px"}}>
            <div className="modal-content rounded-4 shadow">
                <div className="modal-header p-5 pb-4 border-bottom-0">
                    <h1 className="fw-bold mb-0 fs-2">Login for users</h1>
                </div>

                <div className="modal-body p-5 pt-0">
                    {detail !== "" && (
                        <div className="alert alert-danger" role="alert">
                            {detail}
                        </div>
                    )}
                    <div className="form-floating mb-3">
                        <input type="email"
                               className="form-control rounded-3"
                               id="floatingInput"
                               placeholder="name@example.com"
                               value={user.username}
                               onChange={event => setUser({...user, username: event.target.value})}
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password"
                               className="form-control rounded-3"
                               id="floatingPassword"
                               placeholder="Password"
                               value={user.password}
                               onChange={event => setUser({...user, password: event.target.value})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button
                        className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        disabled={isLoading}
                        onClick={login}
                    >
                        {isLoading ? <Spinner/> : "Login"}
                    </button>
                    <small className="text-body-secondary">
                        By clicking the sign in button, you agree to the terms usage.
                    </small>
                </div>
            </div>
        </div>
    );
}