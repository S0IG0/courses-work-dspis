import {useState} from "react";
import {IRegisterUser} from "@model/index.ts";
import {store} from "@store/store.ts";
import {Spinner} from "@ux/loader/Spinner.tsx";
import {useNavigate} from "react-router-dom";
import {NamePages, routes} from "@route/routes.tsx";

interface RegisterUser extends IRegisterUser {
    repeat_password: string
}

export interface Error {
    username: string[] | undefined,
    password: string[] | undefined,
}

export const RegisterPage = () => {

    const [error, setError] = useState<Error>({
        username: [],
        password: [],
    });

    const [user, setUser] = useState<RegisterUser>({
        username: "",
        password: "",
        repeat_password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState(false);
    const navigate = useNavigate();

    function register() {
        setIsLoading(true);
        store.register(user)
            .then(() => {
                navigate(routes[NamePages.PERSONAL_ACCOUNT].path)
            })
            .catch(reason => {
                const obj: Error = {} as Error
                for (const key in reason.response.data as Error) {
                    // @ts-ignore
                    obj[key] = [...new Set(reason.response.data[key])]
                }
                setError(obj)
            })
            .finally(() => {
                setIsLoading(false);
                setRequest(true);
            });
    }

    return (
        <div className="modal-dialog mb-4" role="document" style={{maxWidth: "450px"}}>
            <div className="modal-content rounded-4 shadow p-5">
                <div className="modal-header pb-4 border-bottom-0">
                    <h1 className="fw-bold mb-0 fs-2">Registration for users</h1>
                </div>
                <div className="form-floating mb-3">
                    <input type="text"
                           className={`form-control rounded-3 ${request && (error.username?.length === 0 || error.username === undefined ? "is-valid" : "is-invalid")}`}
                           id="floatingInputUsername"
                           placeholder="name@example.com"
                           value={user.username}
                           onChange={event => setUser({...user, username: event.target.value})}
                    />
                    {error.username?.length === 0 || error.username === undefined || user.username === "" ?
                        <label htmlFor="floatingInputUsername">Username</label> :
                        <label htmlFor="floatingInputUsername">
                            {error.username.map(error => error)}
                        </label>
                    }
                </div>
                <div className="form-floating mb-3">
                    <input type="password"
                           className={`form-control rounded-3 ${request && (error.password?.length === 0 || error.password === undefined ? "is-valid" : "is-invalid")}`}
                           id="floatingPassword"
                           placeholder="Password"
                           value={user.password}
                           onChange={event => setUser({...user, password: event.target.value})}
                    />
                    {error.password?.length === 0 || error.password === undefined || user.password === "" ?
                        <label htmlFor="floatingPassword">Password</label> :
                        <label htmlFor="floatingPassword">
                            {error.password.map(error => error)}
                        </label>
                    }
                </div>
                <div className="form-floating mb-3">
                    <input type="password"
                           className="form-control rounded-3"
                           id="floatingPasswordRepeat"
                           placeholder="Password"
                           value={user.repeat_password}
                           onChange={event => setUser({...user, repeat_password: event.target.value})}
                    />
                    <label htmlFor="floatingPasswordRepeat">Repeat password</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        onClick={register}
                        disabled={user.password !== user.repeat_password}
                >
                    {user.password !== user.repeat_password ? "Passwords don't match" :  isLoading ? <Spinner/> : "Register"}
                </button>
                <small className="text-body-secondary">
                    By clicking the register button, you agree to the terms of use.
                </small>
            </div>
        </div>
    );
}