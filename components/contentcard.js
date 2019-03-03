import Link from 'next/link';

class ContentCard extends React.Component {
  render() {

    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),' + 'url(' + this.props.image + ')'
    };

    return (
      <div className="blog-list">
        <ul>
          <li> 
            <Link as="/blog-item" href={this.props.link}><a href={this.props.link} target="_new">
              <img src={this.props.image} />
              <h3>{this.props.title}</h3>
            </a></Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default ContentCard;