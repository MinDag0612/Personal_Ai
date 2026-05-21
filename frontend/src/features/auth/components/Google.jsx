import googleIcon from "../../../shared/icons/Google.svg";
import { useGoogleLogin } from "@react-oauth/google"

export default function Google({
    onSuccess,
    onError,
}) {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)

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
            <span>Đăng kí bằng Google</span>
        </button>
    )
}
