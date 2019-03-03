import Head from '../components/head';
import Link from 'next/link';
import {talks} from '../data/talksdata';
import TalksCard from '../components/talkscard';
import ReactGA from 'react-ga';
// import { ga_id } from '../config_vars';

class Talks extends React.Component {
  render() {

  // google analytics
  //process.env.NODE_ENV == 'development' ? ReactGA.initialize(ga_id) :
  //ReactGA.initialize(ENV['ANALYTICS_ID'])
  //ReactGA.pageview('/talks');

    let upcomingTalks = talks.filter(talk => {
      return talk.presented == false
    });
    
    let pastTalks = talks.filter(talk => {
      return talk.presented == true
    });
    return (
      <div className="talks-body-wrapper">
        <Head />
        <div className="header">
            Talks
          </div>
        <div className="talks-wrapper">
          <div className="upcoming-wrapper">
            <div className="upcoming-title"><h1>Upcoming Talks</h1></div>
            {upcomingTalks.length > 0 ? upcomingTalks.map(talk => { return <TalksCard 
              title={talk.title} 
              location={talk.location} 
              date={talk.date} 
              conference={talk.conference} 
              presentation_link= {talk.presentation_link}
              conference_link={talk.conference_link}
              country_code={talk.country_code}
              presented={talk.presented} />}) : "More talks coming soon!"
            }
          </div>
          <div className="past-wrapper">
          <div className="past-title"><h1>Past Talks</h1></div>
            {pastTalks.map(talk => { return <TalksCard 
              title={talk.title} 
              location={talk.location} 
              date={talk.date} 
              conference={talk.conference} 
              presentation_link= {talk.presentation_link}
              conference_link={talk.conference_link}
              country_code={talk.country_code}
              presented={talk.presented} />})
            }
          </div>
        </div>
        <div className="navbar box">
            <Link as="/" href="/"><a href="/" className="button">Home</a></Link>
            <Link as="/portfolio" href="/portfolio"><a href="/portfolio" className="button">Portfolio</a></Link>
            <Link as="/posts" href="/posts"><a href="/posts" className="button">Blog</a></Link>
        </div>
      </div>
    );
  }
}

export default Talks;