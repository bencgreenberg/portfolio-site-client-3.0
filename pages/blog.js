import Link from 'next/link';
import { CircleLoader } from 'react-spinners';
import Head from '../components/head';
import ContentCard from '../components/contentcard';
import { getApiData } from '../logic/api_func';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
      loading: true
    };

  }

  componentDidMount() {
    getApiData('https://cors-anywhere.herokuapp.com/https://bengreenberg.herokuapp.com/api/blog/tech.json')
      .then(data => this.setState({
        blogPosts: data,
        loading: false
      }));
    // for locahost development with cors: https://cors-anywhere.herokuapp.com/
  }

  render() {

    let sortedBlog =
    this.state.blogPosts.sort(function(posting1, posting2) {
      return posting2.id - posting1.id;
    });

    let blogcard = sortedBlog.length > 0 ? sortedBlog.map(post => <ContentCard title={post.title} link={post.original_link} image={post.image} created_on={post.created_on} key={post.id} />) : <CircleLoader size={200} loading={this.state.loading} />

    return (
      <div>
        <Head />
        <div className="wrapper">
          <style jsx>{`
           
            `}</style>
          <div className="header">
            Some Header Here
          </div>
          <div className="blogcards-wrapper">
            {blogcard}
          </div>
          <div className="navbar box">
            <Link as="/" href="/"><a href="/" className="button">Home</a></Link>
            <Link as="/portfolio" href="/portfolio"><a href="/portfolio" className="button">Portfolio</a></Link>
            <Link as="/talks" href="/talks"><a href="/talks" className="button">Talks</a></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Blog;