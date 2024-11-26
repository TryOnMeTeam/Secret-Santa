import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerHandler } from '../../../services/authService.js';
import { useAlert } from './../../../services/context/AlertContext.js';
import { useAuth } from './../../../services/context/AuthContext';
import "./RegisterPage.css";

const Register = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const { showAlert } = useAlert();

    useEffect(() => {
        if (user) {
            navigate('/secret-santa');
        }
    }, [user, navigate]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await registerHandler(values.name, values.email, values.password);
                showAlert('User Registered successfully', 'success');

                login(response);
                navigate('/secret-santa');
            } catch (error) {
                showAlert(error.message, 'error');
            }
        }
    });

    const handleLogInClick = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        placeholder="Name"
                        className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Email"
                        className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Password"
                        className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Sign Up
                </button>
                <button type="button" onClick={handleLogInClick} className="submit-btn signup">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Register;
