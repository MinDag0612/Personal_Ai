import googleIcon from "../../../shared/icons/Google.svg";
import { useGoogleLogin } from "@react-oauth/google"

export default function Google({
    onSuccess,
    onError,
    mode = "signup"
}) {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("Login successful!")
            console.log(tokenResponse["access_token"])

            onSuccess(tokenResponse)
        },

        onError: () => {
            console.log("Login Failed")
            onError()
        }
    })

    return (
        <button className="signup-google-button" type="button" onClick={() => login()}>
            <img src={googleIcon} alt="" aria-hidden="true" />
            <span>{mode === "signup" ? "Đăng kí bằng Google" : "Đăng nhập bằng Google"}</span>
        </button>
    )
}
