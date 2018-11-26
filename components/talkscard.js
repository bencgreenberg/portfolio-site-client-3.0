import Link from 'next/link';
import ReactCountryFlag from "react-country-flag";

class TalksCard extends React.Component {
  render() {

    return (
      <div className="conference-wrapper">
      <div className="conference-box">
        <div className="conference-content">
          <div className="talk-title">
            <Link as="/conference-presentation" href={this.props.presentation_link}><a href={this.props.presentation_link} target="_new">{this.props.title}</a></Link>
          </div>
          <div className="talk-conference">
            <Link as="/conference-site" href={this.props.conference_link}><a href={this.props.conference_link} target="_new">{this.props.conference}</a></Link> <br /> <ReactCountryFlag 
              styleProps={{
                width: '20px',
                height: '20px'
              }}
              code={this.props.country_code}
              svg
            /> {this.props.location} || {this.props.date}
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default TalksCard;