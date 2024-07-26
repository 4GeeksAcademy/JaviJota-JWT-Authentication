import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [register, setRegister] = useState(true)
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(register){
			const regist = await actions.register(formData) == true
				if (regist)
					return navigate('/home')
		} 
		else if (!register){
			const logged = await actions.login(formData) == true
				if (logged)
					return navigate('/home');
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value })
	}

	useEffect(() => {
		if(localStorage.getItem('token') || store.token) navigate('/home')
	},[])

	return (
		<div className="mt-5 text-center">
			<form 
				className="w-50 mx-auto text-center" action="submit" 
				onSubmit={handleSubmit}
			>
				<div className="d-flex flex-column align-items-center mb-3">
					<label
						className="mb-1" 
						htmlFor="email"
					>
						<b>Email</b>
					</label>
					<input 
						type="email"
						className="form-control form-control-sm w-25 rounded-pill" 
						id="email" 
						name="email" 
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="d-flex flex-column align-items-center">
					<label 
						className="mb-1" 
						htmlFor="password"
					>
						<b>Password</b>
					</label>
					<input 
						type="password"
						className="form-control form-control-sm w-25 rounded-pill" 
						id="password"
						name="password" 
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button 
					type="submit" 
					className="btn btn-primary btn-sm mt-4 px-5 rounded-pill"
				>
					{register == true ? 'Register' : 'Log in'}
				</button>
			</form>
			<p className="mt-2 fs-6">
				{register == true ? '¿Ya estás registrado? ' : '¿No estás registrado? '} 
				<span 
					className="text-secondary text-decoration-underline" 
					style={{cursor: 'pointer'}} 
					onClick={() => setRegister(!register)}
				>
					Click aquí.
				</span>
			</p>
		</div>
	);
};
