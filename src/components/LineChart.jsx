import React from 'react'
import { Typography, Row, Col } from 'antd'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const { Text, Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

    const coinPrice = []
    const coinDate = []

    coinHistory?.history.forEach(point => {
        coinPrice.push(point.price)
        coinDate.push(new Date(point.timestamp * 1000).toLocaleDateString())
    })

    const data = {
        labels: coinDate.sort((a, b) => b - a),
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>
                    {coinName} price chart
                </Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.change}%</Title>
                    <Title level={5} className='current-price'>Current Price: ${currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    )
}

export default LineChart