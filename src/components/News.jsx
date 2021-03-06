import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/newsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: news, isFetching } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 20 })
    const { data: cryptoList } = useGetCryptosQuery(100)

    if (isFetching) return 'Loading...'
    return (
        <Row gutter={[24, 24]} className="crypto-news-container">
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select Crypto"
                        optionFilterProp='children'
                        onChange={value => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptoList?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>

                </Col>
            )}
            {news?.value.map((news, i) => (
                <Col xs={24} sm={12} lg={6} className="crypto-news" key={i}>
                    <a href={news.url} target="_blank" rel={"noreferrer"}>
                        <Card hoverable className='news-card'>
                            <div className="news-image-container">
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                            </div>
                            <p>
                                {news.description > 11 ? `${news.description.substring(0, 100)}...` : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </Card>
                    </a>
                </Col>
            ))}
        </Row>
    )
}

export default News