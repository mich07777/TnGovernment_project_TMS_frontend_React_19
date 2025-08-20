import React from 'react';
import { useState } from 'react';
import { logo } from '../assets/images';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="intro-example" className="text-center container-color align-items-center mt-5">
        <section>
                <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                    <div className="card text-black bgColor" style={{ borderRadius: '25px' }}>
                        <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p className="text-center h1 fw-bold mb-3 mt-1">Welcome Back!</p>
                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center mb-3">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control bg-white" placeholder="Your Official Email Id" />
                                </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control bg-white" placeholder="Password" />
                                </div>
                                </div>

                                <div className="d-flex justify-content-center mb-2 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                </div>

                                <div className="d-flex justify-content-center mb-2 mb-lg-4">
                                <p className="small mb-0">Don't have account? Contact TMS</p>
                                </div>
                            </form>

                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2">
                            <Link to="/TrainingDirectorate">
                                <img src={logo}
                                className="img-fluid rounded-4 w-50" alt="Sample image" />
                            </Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        </section>
    </div>
  );
}

export default Login;
