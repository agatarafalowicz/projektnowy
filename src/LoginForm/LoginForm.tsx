// LoginForm.tsx
import React from 'react';
import { Button, TextField } from "@mui/material";
import './LoginForm.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from "formik";
import { useCallback, useMemo } from "react";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const navigate = useNavigate();
    const onSubmit = useCallback(
        (values: { username: string; password: string }, formik: any) => {
            navigate('/home');
        },
        [navigate],
    );

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                username: yup.string().required('Required'),
                password: yup
                    .string()
                    .required('Required')
                    .min(5, 'Password too short'),
            }),
        [],
    );

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className="LoginForm-container"> {/* Dodaj klasę LoginForm-container */}
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
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
                        form="signForm"
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
