import React, { lazy, Suspense } from 'react';
import classes from './App.css';
import Blackboard from './media/images/blackboard.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './components/UI/Spinner/Spinner';

const TrelloTasks = lazy(() => import('./containers/TrelloTasks/TrelloTasks'));

const App = () => {
	return (
		<Suspense fallback={<Spinner fontSize="8px"/>}>
			<div className={classes.App}>
				<img className={classes.mainBackgroundImage} src={Blackboard} alt="Main" />
			</div>
			<TrelloTasks />
		</Suspense>
	);
}

export default App;
