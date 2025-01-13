import AppNavbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100 min-vw-100">
            <AppNavbar />
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
            <main className="py-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;