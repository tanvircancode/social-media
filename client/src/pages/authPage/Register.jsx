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


const registerSchema = yup.object({

    firstName: yup.string().min(3).max(12).required("required"),
    lastName: yup.string().min(3).max(16).required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().min(5).max(12).required("required"),
    picture: yup.string().required("required"),

});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
};

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (values, onSubmitProps) => {

        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const response = await fetch(
            `${BASE_URL}/auth/register`,
            {
                method: "POST",
                body: formData,
            }
        );
        const user = await response.json();
        // alert(user.message)
        onSubmitProps.resetForm();

        if (user.status) {
            navigate("/login");
        }else{
            alert(user.message);
        }
    };

    return (
        <Formik
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
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
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: 15,
                                paddingTop: 150,
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
                                    height: 450,
                                }}
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed black`}
                                            style={{ cursor: 'pointer' }}

                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p style={{ textAlign: 'center' }}>Add Picture</p>
                                            ) : (
                                                <Box style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography>{values.picture.name}</Typography>

                                                </Box >
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                                <br />
                                <br />
                                <TextField
                                    fullWidth={true}
                                    id="outlined-basic"
                                    onBlur={handleBlur}
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"

                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <br />
                                <br />
                                <TextField
                                    fullWidth={true}
                                    id="outlined-basic"
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    name="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth={true}
                                    id="outlined-basic"
                                    onBlur={handleBlur}
                                    label="Email"
                                    name="email"
                                    variant="outlined"

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
                                        Register
                                    </Button>
                                </Box>
                                <br />
                                <Typography
                                    style={{ textAlign: 'center', textDecoration: 'underline', cursor: "pointer" }}
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Login here.
                                </Typography>
                            </Card>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default Register;
