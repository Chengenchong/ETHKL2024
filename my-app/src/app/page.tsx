import Sidebar from './SideMenu';
import "./globals.css";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '80px', padding: '20px' }}>
        {/* Your main page content */}
        <h1>Welcome to the Homepage</h1>
      </div>
    </div>
  );
};

export default Home;
