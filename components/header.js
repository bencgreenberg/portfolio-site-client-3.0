import Typed from 'react-typed';
import { greetingArray } from '../data/greetingArray';

const Header = () => {
  return (
    <div className="box content">
      <style jsx>{`
        #greeting-scroll {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Caveat', cursive;
        }
      `}</style>
      <h1>
        Ben Greenberg: <br /><div id="greeting-scroll"><Typed 
        strings={greetingArray} 
        loop={true} 
        typeSpeed={100}
        backSpeed={120}
        smartBackspace
        shuffle={false}
        backDelay={500}
        showCursor
        cursorChar="|"
      /></div>
    </h1>
  </div>
  );
}
export default Header;