import {
    TextField,
    Button,
    Box,
    Card,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";


import { BASE_URL } from "../../config.js";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/index.js";
import Dropzone from "react-dropzone";
import * as yup from "yup";


const loginSchema = yup.object({
    email: yup.string().email().required("required"),
    password: yup.string().min(3).max(12).required(),
});

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values, onSubmitProps) => {
        await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        }).then(async (res) => {
            const loggedIn = await res.json();
            // console.log(loggedIn)
            onSubmitProps.resetForm();
            if (loggedIn.status) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/");
            }
            else {
                alert(loggedIn.message)
            }
        })

    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
        >
            {({
                values,
                errors,
                touched,
                setFieldValue,
                resetForm,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <div style={{height:'100vh'}}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: 15,
                                paddingTop: 250,
                            }}
                        >
                            <Typography variant="h6">Welcome back. Sign In below</Typography>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Card
                                variant="outlined"
                                style={{
                                    width: 400,
                                    padding: 20,
                                    maxHeight: 230,
                                }}
                            >
                                <TextField
                                    fullWidth={true}
                                    id="outlined-basic"
                                    onBlur={handleBlur}
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <br />
                                <br />
                                <TextField
                                    fullWidth={true}
                                    id="outlined-basic"
                                    onBlur={handleBlur}
                                    value={values.password}
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    type="password"
                                    onChange={handleChange}
                                />

                                <br />
                                <br />
                                <Box textAlign="center">
                                    <Button
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        style={{ width: "100%" }}
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </Button>
                                </Box>
                                <br />
                                <Typography
                                    style={{ textAlign: 'center', textDecoration: 'underline', cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                >
                                    Don't have an account? Sign Up here. 
                                  
                                </Typography>
                            </Card>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Login;
