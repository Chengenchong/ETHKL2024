import Sidebar from './SideMenu';
import ScrollExample from './components/ScrollExample';
import "./globals.css";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '80px', padding: '20px' }}>
        {/* Your main page content */}
        <h1>Welcome to the Homepage</h1>
        <ScrollExample />
      </div>
    </div>
  );
};

export default Home;
