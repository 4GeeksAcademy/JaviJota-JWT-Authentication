import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	useEffect(() => {
		if(!localStorage.getItem('token') && !store.token) navigate('/')
	},[])

	const handleLogout = () => {
		store.token = '';
		localStorage.removeItem('token')
	}
	return (
		<div className="container text-center mt-5">
			<h1 className="text-danger">ESTA PÁGINA ES PRIVADA</h1>
			<Link to={'/'}>
			<button type="button" className="btn btn-danger" onClick={handleLogout}>
				Log out
			</button>
			</Link>
		</div>
	);
};
