import { Tag, Typography, Divider } from 'antd';
import CoinInfo from './CoinInfo';

export default function CoinInfoModal({coin}) {
  return (
    <>
      <CoinInfo coin={coin} />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>
          1 hour:
          <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
            {coin.priceChange1h}%
          </Tag>
        </Typography.Text>
        <Typography.Text strong>
          1 day:
          <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
          {coin.priceChange1d}%
          </Tag>
        </Typography.Text>
        <Typography.Text strong>
          1 week:
          <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
          {coin.priceChange1w}%
          </Tag>
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
            Price:
        </Typography.Text>
          {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
            Price BTC:
        </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
            Market cap:
        </Typography.Text>
        {coin.marketCap}$
      </Typography.Paragraph>
      {coin.contractAddress && <Typography.Paragraph>
        <Typography.Text strong>
            Contract address:
        </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>}
    </>
  )
}