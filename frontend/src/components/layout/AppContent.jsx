import { Layout, Typography } from "antd"
import { useCrypto } from "../../context/crypto-context"
import { Chart } from "./Chart";
import { AssetTable } from "./AssetTable";

const contentStyle = {
  textAlign: 'center',
  minHeight: "calc(100vh - 60px)",
  color: '#fff',
  backgroundColor: '#00152f',
  padding: '1rem',
};

export default function AppContent() {
  const { assets, crypto } = useCrypto()
  const cryptoPriceMap = crypto.reduce((acc, curr) => {
    acc[curr.id] = curr.price

    return acc
  }, {})


  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: "#fff"}}>
        Portfolio:
        {assets
          .map(asset => (Number(asset.amount) * Number(cryptoPriceMap[asset.id])))
          .reduce((acc, cur) => acc += cur, 0)
          .toFixed(2)
        }$
      </Typography.Title>
      <Chart />
      <AssetTable />
    </Layout.Content>
  )
}