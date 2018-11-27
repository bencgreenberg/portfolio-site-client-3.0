import Link from 'next/link';
import Head from '../components/head';
import Header from '../components/header';
import { getApiData } from '../logic/api_func';
import ReactGA from 'react-ga';
// import { ga_id } from '../config_vars';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
      portfolioItems: []
    };

  }

  render() {

    // google analytics
    //process.env.NODE_ENV == 'development' ? ReactGA.initialize(ga_id) : 
    ReactGA.initialize(ENV['ANALYTICS_ID'])
    ReactGA.pageview('/');

    console.log("Hi! Welcome to my portfolio site. If you're looking here, then you might be interested in checking out the GitHub repo at https://github.com/benhayehudi/portfolio-site-client-3.0. I designed this frontend utilizing Next.js, CSS Grid and Flexbox. The backend is my own Rails API service, and both the frontend and backend have been deployed on Heroku. If you have any feedback on the code I'd be glad to take a look at it, you can either DM me on Twitter or submit a PR. Thanks for stopping by!");

    console.log(process.env.NODE_ENV);

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
            <Link as="/portfolio" href="/portfolio"><a href="/portfolio" className="button">Portfolio</a></Link>
            <Link as="/blog" href="/blog"><a href="/blog" className="button">Blog</a></Link>
            <Link as="/talks" href="/talks"><a href="/talks" className="button">Talks</a></Link>
          </div>
          <div className="socialbar box">
            <Link as="/twitter" href="https://twitter.com/RabbiGreenberg"><a href="https://twitter.com/RabbiGreenberg" target="_new" className="button">🐦 Twitter</a></Link>
            <Link as="/linkedin" href="https://www.linkedin.com/in/rabbigreenberg/"><a href="https://www.linkedin.com/in/rabbigreenberg/" target="_new" className="button">📜 LinkedIn</a></Link>
            <Link as="/dev" href="https://dev.to/benhayehudi"><a href="https://dev.to/benhayehudi" target="_new" className="button">🗞 dev.to</a></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Index;