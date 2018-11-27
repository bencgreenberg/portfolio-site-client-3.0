# Portfolio Site Client v3.0

This is a responsive portfolio site frontend designed using Next.js, React, CSS Grid and Flexbox. It was designed to serve [bengreenberg.org](https://www.bengreenberg.org) but could be applied to other purposes as well. 

The folder structure is the following:

Logic:
- Data is retrieved with `getApiData()` in `logic/api_func.js`

Data:
- An array of words for `react-typed` is contained in `greetingArray`
- An array of objects of conference information is contained in `talksdata`

Pages:
- `index.js` is the Home page
- `blog.js`, `portfolio.js` and `talks.js` are the three other pages

Static:
- Images are housed here that are served in the application. So far that's one headshot and a `favicon.ico`

Components:
- Reusable components such as:
  -- `<Head />`, `<ContentCard />`, `<Header />`, `<PortfolioCard />` and `<TalksCard />`

## Installation

To run a local copy of this application do the following:

1. Clone the repo to your local machine
2. Run `npm install` to install the node dependencies
3. Run `npm run dev` to run a local development instance

## License

This application is under the ISC License

## Contributing

Contributions to the code are welcome. First and foremost, please treat everyone with respect when discussing the code, the project or anything else really. 

If you are fixing a bug feel free to make a PR directly. If you are proposing a feature modification or addition, please first raise it as an issue.