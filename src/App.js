
import './App.scss';
import Header from './Components/Header/Header';

import { Outlet } from 'react-router-dom'

import PerfectScrollbar from 'react-perfect-scrollbar'
function App() {
	return (
		<div className="App">
			<Header />

			<Outlet />

		</div>
	);
}

export default App;
