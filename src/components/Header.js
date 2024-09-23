import ReactLogo from "./React_logo1.png"; // Import the image
function Header() {
	return (
		<header className="app-header">
			<img src={ReactLogo} alt="Reactlogo" />
			<h1>El Camino de los Reyes</h1>
		</header>
	);
}

export default Header;
