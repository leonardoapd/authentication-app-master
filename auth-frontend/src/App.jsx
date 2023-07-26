import { ColorModeProvider } from './context/ColorModeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import AppRouter from './routes/AppRouter';
import './App.css';

function App() {
	return (
		<AuthProvider>
			<ColorModeProvider>
				<Layout>
					<AppRouter />
				</Layout>
			</ColorModeProvider>
		</AuthProvider>
	);
}

export default App;
