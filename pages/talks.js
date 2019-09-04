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

    let talks2019 = talks.filter(talk => {
      return talk.date.split('/')[2] == '2019'
    });
    
    let talks2018 = talks.filter(talk => {
      return talk.date.split('/')[2] == '2018'
    });
    return (
      <div className="talks-body-wrapper">
        <Head />
        <div className="header">
            Talks
        </div>
        <div className="talks-wrapper">
          <div className="upcoming-wrapper">
            <div className="upcoming-title">
              <h1>2019</h1>
            </div>
            <ul>
              {talks2019.length > 0 ? talks2019.map(talk => { return <TalksCard 
                title={talk.title} 
                location={talk.location} 
                date={talk.date} 
                conference={talk.conference} 
                presentation_link= {talk.presentation_link}
                conference_link={talk.conference_link}
                country_code={talk.country_code}
                presented={talk.presented} />}) : "More talks coming soon!"
              }
            </ul>
            <div className="upcoming-title">
              <h1>2018</h1>
            </div>
            <ul>
              {talks2018.map(talk => { return <TalksCard 
                title={talk.title} 
                location={talk.location} 
                date={talk.date} 
                conference={talk.conference} 
                presentation_link= {talk.presentation_link}
                conference_link={talk.conference_link}
                country_code={talk.country_code}
                presented={talk.presented} />})
              }
            </ul>
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