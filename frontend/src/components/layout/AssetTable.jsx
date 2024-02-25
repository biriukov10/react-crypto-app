import { Table } from "antd"
import { useCrypto } from "../../context/crypto-context"

const columns = [
  {
    title: "Name",
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend']
  },
  {
    title: "Price $",
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    defaultSorter: 'descend'
  },
  {
    title: "Amount $",
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
    defaultSorter: 'descend'
  }
]

export function AssetTable() {
  const { assets } = useCrypto()

  const data = assets.map(item => ({
    key: item.id,
    name: item.name,
    price: item.price,
    amount: item.amount,
  }))

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
    />
  )
}