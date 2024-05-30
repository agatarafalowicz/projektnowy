import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useApi} from "../api/dto/ApiProvider";

function LoginForm() {
    const navigate = useNavigate();
    const apiClient = useApi();

    const onSubmit = useCallback(
        (values: { login: string; password: string }, formik: any) => {
            apiClient.login(values).then((response) => {
                if (response.success) {
                    navigate('/home');
                } else {
                    formik.setFieldError('login', 'Invalid login or password');
                }
            });
        },
        [apiClient, navigate],
    );

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                login: yup.string().required('Required'),
                password: yup
                    .string()
                    .required('Required')
                    .min(5, 'Password too short'),
            }),
        [],
    );

    return (
        <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            {(formik: any) => (
                <form
                    className="Login-form"
                    id="singForm"
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <TextField
                        id="login"
                        label="Login"
                        variant="standard"
                        name="login"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.login && !!formik.errors.login}
                        helperText={formik.touched.login && formik.errors.login}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        variant="contained"
                        startIcon={<LoginIcon />}
                        type="submit"
                        form="singForm"
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Sign in
                    </Button>
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;
