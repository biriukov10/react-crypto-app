import { Flex, Typography, Divider } from "antd"

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <>
      <Flex align='center'>
        <img src={coin.icon} alt={coin.name} width="40" style={{ marginRight: 10 }} />
        <Typography.Title level={2} style={{ marginBottom: 0 }}>{withSymbol && (coin.symbol)} {coin.name}</Typography.Title>
      </Flex>
      <Divider />
    </>
  )
}