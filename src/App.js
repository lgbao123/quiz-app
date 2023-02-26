
import './App.scss';
import Header from './Components/Header/Header';

import { Outlet } from 'react-router-dom'


function App() {
	return (
		<div className="App">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
