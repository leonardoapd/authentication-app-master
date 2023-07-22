import { ColorModeProvider } from './context/ColorModeContext';
import Layout from './components/Layout';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
	return (
		<ColorModeProvider>
			<Layout>
				<AppRouter />
			</Layout>
		</ColorModeProvider>
	);
}

export default App;
