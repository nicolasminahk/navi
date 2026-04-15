import NaviAgent from '../components/NaviAgent';

export default function Home() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: '#050D17',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <NaviAgent />
    </div>
  );
}
