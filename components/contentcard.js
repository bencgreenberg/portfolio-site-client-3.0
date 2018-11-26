import Link from 'next/link';

class ContentCard extends React.Component {
  render() {
    return (
      <div className="blog-box">
        <div className="blog-content">
          <Link as="/blog-item"><a href={this.props.link} target="_new">{this.props.title}</a></Link>
        </div>
      </div>
    );
  }
}
export default ContentCard;