import Link from 'next/link';
import ReactCountryFlag from "react-country-flag";

class TalksCard extends React.Component {
  render() {

    return (
      <div>
        <li>
          <Link as="/conference-site" href={this.props.conference_link}><a href={this.props.conference_link} target="_new">{this.props.conference}</a></Link> 
          &nbsp;- &nbsp;
          { this.props.presentation_link != "" ? 
            <Link as="/conference-presentation" href={this.props.presentation_link}><a href={this.props.presentation_link} target="_new">{this.props.title}</a></Link> : 
            this.props.title 
          } 
          &nbsp;- &nbsp;
          <ReactCountryFlag 
            styleProps={{
              width: '20px',
              height: '20px'
            }}
            code={this.props.country_code}
            svg
          /> {this.props.location} &nbsp;- &nbsp; {this.props.date}
        </li>
      </div>
    );
  }
}
export default TalksCard;