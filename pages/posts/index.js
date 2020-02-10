import React from 'react'
import matter from 'gray-matter';
import Head from '../../components/head';
import Link from 'next/link';

export default class extends React.Component {
    static async getInitialProps() {
        const posts = (ctx => {
            const keys = ctx.keys();
            const values = keys.map(ctx);

            const data = keys.map((key, index) => {
                const slug = key.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
                const value = values[index];

                const document = matter(value);

                return {
                    document,
                    slug
                };
            });
            return data;
        })(require.context('../../posts', true, /\.md$/));
        return {
            posts
        };
    }

    render() {
            this.props.posts.sort(function(a,b) {
                return new Date(b.document.data.date) - new Date(a.document.data.date)
            });
        return (
            <>
                <Head />
                <div className="header">
                    <h1>Posts</h1>
                </div>
                <ol>
                    {this.props.posts.map(({ document: { data }, slug }) => (
                        <Link href={{ pathname: '/posts/post', query: { id: slug } }} key={slug} target="_blank">
                            <li><h2>{data.title}</h2></li>
                        </Link>
                    ))}
                </ol>
                <div className="navbar box">
                    <Link as="/" href="/"><a href="/" className="button">Home</a></Link>
                    <Link as="/talks" href="/talks"><a href="/talks" className="button">Talks</a></Link>
                </div>
            </>
        )
    }
}