
import './App.scss';
import Header from './Components/Header/Header';

import { Outlet, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';

function App() {
	return (
		<div className="App">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
