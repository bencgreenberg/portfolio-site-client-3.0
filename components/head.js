import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <title>Ben Greenberg 🥑🧔☕👨‍💻🛫 </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta property="og:title" content="Ben Greenberg 🥑🧔☕👨‍💻🛫 " />
      <meta property="og:image" content="/static/bg-headshot.jpg" />
      <meta property="og:description" content="Rabbi turned Coder. Second Career Dev taking it one function at a time." />
    </Head>
    <style jsx global>{`
     @import url('https://fonts.googleapis.com/css?family=Caveat:700|Chakra+Petch:500|Montserrat:700');
      /* grid */
      .header {
        grid-area: header;
        position: relative;
        font-family: 'Montserrat', sans-serif;
        font-size: 3vw;
        text-decoration: underline;
      }
      .content {
        grid-area: content;
        position: relative;
      }
      .navbar {
        grid-area: navbar;
        flex-shrink: 0;
      }

      .socialbar {
        grid-area: socialbar;
        position: relative;
      }
      .wrapper {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr;
        grid-template-areas: "header header header" "content content content" "navbar navbar navbar" "socialbar socialbar socialbar";
        background-color: #fff;
        color: #444;
        flex: 1;
      }
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 10px 50px 0px 50px;
      }

      /* buttons */

      .button {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border: solid 1px #20538D;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
        -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.2);
        background: #fff;
        color: black;
        padding: 8px 25px;
        margin: 0px 5px;
        text-decoration: none;
        max-width: 100%;
    }

    .button:hover,
    .button:focus {
        background: #4479BA;
    }
    .button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }
    
    .button:active {
        transform: scale(0.99);
    }

    .button a {
      text-decoration: none;
      color: black;
    }

    @media (min-width: 320px) and (max-width: 480px) {
  
      .button {
        padding: 1px 10px;
        margin: 0px 2px;
      }
      
    }

    /* blog */

    .blogcards-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .blog-box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      position: relative;
      flex-basis: calc(33.333% - 10px);
      margin: 5px;
      border: 1px solid;
      box-sizing: border-box;
    }
    .blog-box::before {
      content: '';
      display: block;
      padding-top: 30%;
    }
    .blog-box .blog-content {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      width: 100%;
    }

    .content-title, .portfolio-content-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-title a {
      font-family: 'Chakra Petch', sans-serif;
      text-decoration: none;
      font-size: 2.5vw;
    }


    @media (min-width: 320px) and (max-width: 480px) {

      .blog-box {
        align-items: left;
        position: relative;
        flex-basis: 100%;
      }
      .blog-box::before {
        content: '';
        display: block;
        padding-top: 30%;
      }
      .content-title a {
        font-size: 4vw;
      }
  
    }


    /* portfolio */

    .portfolio-content-title a {
      font-family: 'Chakra Petch', sans-serif;
      text-decoration: none;
      font-size: 1.2vw;
    }

    @media (min-width: 320px) and (max-width: 480px) {
      
      .portfolio-content-title a {
        font-size: 4vw;
      }
    }

    /* talks */

    .talks-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding-bottom: 300px;
   
    }
    
    .upcoming-wrapper {
    }

    .past-wrapper {
    }

    .upcoming-title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 1vw;
    }

    .past-title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 1vw;
    }

    .conference-wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .conference-box {
      display: flex;
      flex-wrap: wrap;
      align-items: left;
      position: relative;
      flex-basis: calc(33.333% - 10px);
      margin: 20px;
      /*border: 1px solid;*/
      box-sizing: border-box;
    }
    .conference-box::before {
      content: '';
      display: block;
      padding-top: 30%;
    }
    .conference-box .conference-content {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      width: 100%;
    }

    .content-title, .portfolio-content-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-title a {
      font-family: 'Chakra Petch', sans-serif;
      text-decoration: none;
      font-size: 2.5vw;
    }

    .talk-title {
      padding-bottom: 10px;
    }
    .talk-title, .talk-title a {
      font-family: 'Chakra Petch', sans-serif;
      text-decoration: none;
      font-size: 1.2vw;
    }

    .talk-conference {
      font-size: 0.8vw;
    }

    @media (min-width: 320px) and (max-width: 480px) {
  
      .talk-conference {
        font-size: 1vw;
      }

      .conference-box::before {
        margin: 20px;
      }
      
    }
    `}</style>
  </div>
)