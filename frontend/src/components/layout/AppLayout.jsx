import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSide from './AppSider';
import AppContent from './AppContent';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext)

  if (loading) {
    return (
        <>
          <AppHeader />
          <Spin fullscreen />
        </>
    )
  }

  return (
      <Layout>
        <AppHeader />
        <Layout>
          <AppSide />
          <AppContent />
        </Layout>
      </Layout>
  )
}