import Link from 'next/link';

class PortfolioCard extends React.Component {
  render() {

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),' + 'url(' + this.props.image + ')'
    };

    return (
      <div className="blog-box">
        <div className="blog-content" style={divStyle}>
          <div className="portfolio-content-title"><Link as="/blog-item" href={this.props.link}><a href={this.props.link} target="_new">{this.props.title}</a></Link></div>
          <div className="navbar box">
            <Link as="/github" href={this.props.github}><a href={this.props.github} className="button">GitHub</a></Link>
            <Link as="/portfolio/blog" href={this.props.blog}><a href={this.props.blog} className="button">Blog</a></Link>
          </div>
        </div>
      </div>
    );
  }
}
export default PortfolioCard;