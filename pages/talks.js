import Head from '../components/head';
import Link from 'next/link';
import {talks} from '../data/talksdata';
import TalksCard from '../components/talkscard';

class Talks extends React.Component {
  render() {

    let upcomingTalks = talks.filter(talk => {
      return talk.presented == false
    });
    
    let pastTalks = talks.filter(talk => {
      return talk.presented == true
    });
    return (
      <div>
        <Head />
        <div className="header">
            Talks
          </div>
        <div className="talks-wrapper">
          <div className="upcoming-wrapper">
            <div className="upcoming-title"><h1>Upcoming Talks</h1></div>
            {upcomingTalks.map(talk => { return <TalksCard 
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
            <Link as="/blog" href="/blog"><a href="/blog" className="button">Blog</a></Link>
          </div>
      </div>
    );
  }
}

export default Talks;