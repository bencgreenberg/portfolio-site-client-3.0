import Head from 'next/head';

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
     @import url('https://fonts.googleapis.com/css?family=Caveat:700|Chakra+Petch:500');
      /* grid */
      .header {
        grid-area: header;
        position: relative;
      }
      .content {
        grid-area: content;
        position: relative;
      }
      .navbar {
        grid-area: navbar;
        position: relative;
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

    .content-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-title a {
      font-family: 'Chakra Petch', sans-serif;
      text-decoration: none;
      font-size: 2.5vw;
    }
    `}</style>
  </div>
)