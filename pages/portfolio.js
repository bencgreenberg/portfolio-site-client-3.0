import Link from 'next/link';
import { CircleLoader } from 'react-spinners';
import Head from '../components/head';
import PortfolioCard from '../components/portfoliocard';
import { getApiData } from '../logic/api_func';
import ReactGA from 'react-ga';
import { ga_id } from '../config_vars';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioPosts: [],
      loading: true
    };

  }

  componentDidMount() {
    getApiData('https://bengreenberg.herokuapp.com/api/portfolio/index.json')
      .then(data => this.setState({
        portfolioPosts: data,
        loading: false
      }));
    // for locahost development with cors: https://cors-anywhere.herokuapp.com/
  }

  render() {

    // google analytics
    process.env.NODE_ENV == 'development' ? ReactGA.initialize(ga_id) : ReactGA.initialize(ENV['ANALYTICS_ID'])
    ReactGA.pageview('/portfolio');

    let sortedPortfolio =
    this.state.portfolioPosts.sort(function(posting1, posting2) {
      return posting2.id - posting1.id;
    });

    let portfoliocard = sortedPortfolio.length > 0 ? sortedPortfolio.map(post => <PortfolioCard title={post.name} link={post.website_link} image={post.image} github={post.link} youtube={post.youtube_link} blog={post.blog_link} key={post.id} />) : <CircleLoader size={200} loading={this.state.loading} />

    return (
      <div>
        <Head />
        <div className="wrapper">
          <style jsx>{`
           
            `}</style>
          <div className="header">
            Portfolio
          </div>
          <div className="blogcards-wrapper">
            {portfoliocard}
          </div>
          <div className="navbar box">
            <Link as="/" href="/"><a href="/" className="button">Home</a></Link>
            <Link as="/blog" href="/blog"><a href="/blog" className="button">Blog</a></Link>
            <Link as="/talks" href="/talks"><a href="/talks" className="button">Talks</a></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Portfolio;