import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  textAlign: 'center',
  height: 60,
  paddingInline: 48,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const { crypto } = useCrypto()

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener("keypress", handleKeyPress)
    return () => document.removeEventListener("keypress", handleKeyPress)
  }, [])


  function handleSelect(value) {
    setCoin(crypto.find(c => c.id === value))
    setModal(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: '250px',
        }}
        open={select}
        onClick={() => setSelect(prev => !prev)}
        value='press / to open'
        optionLabelProp="label"
        onSelect={handleSelect}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          emoji: coin.icon,
        }))}
        optionRender={(option) => (
          <Space style={{ display: "flex", alignItems: "center" }}>
            <img src={option.data.emoji} width='20' alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />

      <Button type='primary' onClick={() => setDrawer(true)}>Add asset</Button>

      <Modal footer={null} open={modal} onCancel={() => setModal(false)}>
          <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer width={600} title="Add asset" open={drawer} onClose={() => setDrawer(false)} destroyOnClose>
        <AddAssetForm handleClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}