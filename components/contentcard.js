import Link from 'next/link';

class ContentCard extends React.Component {
  render() {

    const divStyle = {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),' + 'url(' + this.props.image + ')'
    };

    return (
      <div className="blog-box">
        <div className="blog-content" style={divStyle}>
          <div className="content-title"><Link as="/blog-item"><a href={this.props.link} target="_new">{this.props.title}</a></Link></div>
        </div>
      </div>
    );
  }
}
export default ContentCard;