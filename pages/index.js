import Link from 'next/link';
import Head from '../components/head';
import Header from '../components/header';
import { getApiData } from '../logic/api_func';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
      portfolioItems: []
    };

  }

  render() {

    return (
      <div>
        <Head />
        <div className="wrapper">
          <style jsx>{`
              .img-headshot {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 50px 5px 5px 5px;
              }
              .img-headshot img {
                width: 200px;
                height: auto;
                border-radius: 50%;
              }
            `}</style>
          <div className="header img-headshot">
            <img src="/static/bg-headshot.jpg" alt="ben greenberg headshot" />
          </div>
          <div className="content box">
            <Header />
          </div>
          <div className="navbar box">
            <Link as="/portfolio"><a href="/portfolio" className="button">Portfolio</a></Link>
            <Link as="/blog"><a href="/blog" className="button">Blog</a></Link>
            <Link as="/talks"><a href="/talks" className="button">Talks</a></Link>
          </div>
          <div className="socialbar box">
            <Link as="/twitter"><a href="https://twitter.com/RabbiGreenberg" target="_new" className="button">🐦 Twitter</a></Link>
            <Link as="/linkedin"><a href="https://www.linkedin.com/in/rabbigreenberg/" target="_new" className="button">📜 LinkedIn</a></Link>
            <Link as="/dev"><a href="https://dev.to/benhayehudi" target="_new" className="button">🗞 dev.to</a></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Index;