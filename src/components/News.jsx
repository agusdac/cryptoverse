import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/newsApi'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {
    const { data: news, isFetching } = useGetNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 20 })

    if (isFetching) return 'Loading...'
    return (
        <Row gutter={[24, 24]} className="crypto-news-container">
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