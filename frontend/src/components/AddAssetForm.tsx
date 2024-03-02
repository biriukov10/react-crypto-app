import React from 'react';
import { Form, Select, Space, Flex, Typography, Divider, Button, InputNumber, DatePicker, Result } from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

export default function addAssetForm({ handleClose }) {
  const { crypto, addAsset } = useCrypto()
  const [form] = Form.useForm()
  const [coin, setCoin] = useState<{ name: string; id: number; price: number } | null>(null)
  const [submit, setSubmit] = useState(false)
  const assetRef = useRef<{ amount: string, price: string }>()

  if (submit) {

    return (
      <Result
        status="success"
        title="New Asset added"
        subTitle={`Added ${assetRef.current?.amount} of ${coin!.name} by price ${assetRef.current?.price}`}
        extra={[
          <Button type="primary" key='console' onClick={handleClose}>
            Close
          </Button>
        ]}
      >

      </Result>
    )
  }

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not valid number"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  }

  function onFinish(values) {
    const newAsset = {
      id: coin!.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setSubmit(true)
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price")

    form.setFieldsValue({
      total: (+value * +price).toFixed(2),
    })
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount")

    form.setFieldsValue({
      total: (+amount * +value).toFixed(2),
    })
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%"
        }}
        placeholder='Select coin'
        optionLabelProp="label"
        onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
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
    )
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      initialValues={{
        price: +coin.price.toFixed(2)
      }}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder="Enter coin amount" style={{ width: '100%'}} onChange={handleAmountChange} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber style={{ width: '100%'}} onChange={handlePriceChange} />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber disabled style={{ width: '100%'}} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  )
}