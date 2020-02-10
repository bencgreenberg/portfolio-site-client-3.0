import React from 'react'
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Head from '../../components/head';
import Link from 'next/link';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        const post = await import(`../../posts/${query.id}.md`);
        const document = matter(post.default);

        return {
            ...document
        };
    }

    render() {
        let dateObject = new Date(this.props.data.date).toDateString()
        return (
            <div className="blog-post">
                <Head />
                <div className="blog-header">
                    <div className="blog-header-image">
                        <img src={this.props.data.imageUrl ? this.props.data.imageUrl : `https://www.topcoder.com/wp-content/uploads/2017/10/coding-best-practises.jpg`} />
                    </div>
                    <div className="blog-header-text">
                        <h1>{this.props.data.title}</h1>
                        <i>{this.props.data.writtenBy}</i>
                    </div>
                </div>
                <br />
                <i>{dateObject}</i>
                <br />
                <i>Cross-Posted to: <a href={this.props.data.crossPost} target="_new">{this.props.data.crossPost}</a></i>
                <ReactMarkdown source={this.props.content} />
                <div className="navbar box">
                    <Link as="/" href="/"><a href="/" className="button">Home</a></Link>
                    <Link as="/talks" href="/talks"><a href="/talks" className="button">Talks</a></Link>
                </div>
            </div>
        )
    }
}