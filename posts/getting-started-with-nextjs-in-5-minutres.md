---
title: Getting Started with Next.js in 5 Minutes
date: 2018-10-22
writtenBy: Ben Greenberg
imageUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--sItCGY2B--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.auth0.com/blog/next.jslogo.png
crossPost: https://dev.to/benhayehudi/getting-started-with-nextjs-in-5-minutes-19ah
id: 9
---

[Next.js](https://nextjs.org/) is a lightweight open source Javascript framework built on top of the React library that enables quick server side rendering and is server agnostic (i.e. use with its own built in HTTP server or use with any Node.js server). It is put out by the folks at [Zeit](https://zeit.co/about). Routing is simply done by the page and makes getting a website up and running easy and quick. In fact, we're going to do in 5 minutes or less.

##Installing

We'll use NPM to install Next.js along with its dependencies.

First we'll make a directory to hold our Next.js project and go into it:

```
mkdir my-portfolio-site
cd my-portfolio-site
```

Then we'll initialize it with a `package.json` file and use the `y` flag to just go ahead and do it and skip the questions: `npm init -y`. 

Now we are ready to install Next.js:

```
npm install react react-dom next
```

Next.js is not super opinionated on how you structure your project, with *one exception*. All your actual web pages need to go inside a `pages` folder, so let's go ahead and create it: `mkdir pages`.

Lastly, let's go ahead and update the `package.json` with the run script language to initialize our Next.js app. Open up the `package.json` file and add the following under `scripts`:

```
"dev": "next",
"build": "next build",
"start": "next start"
``` 

Great, we've now installed Next.js and ready to move on!

##Creating Our First Component

Remember that Next.js is just Javascript and rests on top of React, so all we need to do is build some components. Routing is done by the name of the component, so for example, `mysite.com/blog`, would be from a `blog.js` named file in the `pages` directory. 

Open up the project in your favorite code editor and create a file called `index.js` in the `pages` directory.

Let's create a component that returns some HTML!

```
const Index = () => (
    <div>
        <h1>My Portfolio Site</h1>
        <p>Welcome to my portfolio! This is designed with Next.js!</p>
    </div>
)

export default Index
```

Now if you run `npm run dev` from the command line and navigate to http://localhost:3000 from your web browser you will find this content being served. 

##Introducing the Link API

Don't we all love the page rendering in React? We can accomplish the same client side navigation with Next.js using the Next.js [Link API](https://github.com/zeit/next.js#with-link). Let's say our portfolio site had a Contact page, so we would have an updated Index component that looked like this:

```
import Link from 'next/link';

const Index = () => (
    <div>
        <h1>My Portfolio Site</h1>
        <p>
            Welcome to my portfolio! This is designed with Next.js!
            Please{' '}
                <Link href="/contact">
                    <a>contact me</a>
                </Link>{' '}
            to get more information.
        </p>
    </div>
)

export default Index
```
First, we imported the Link API module from Next.JS and then we used it inline in the midst of our content by making a placeholder for it with the `{' ' }` syntax. The `<Link>` component is a Higher Order Component and supports only a couple arguments such as `href` (and `href` argument itself supports arguments like query strings and the like) and `as` for URL masking. The underlying component, in this case a `<a>` tag supports other props like `style` and `onClick`.

##Making Smaller Reusable Components

Now we are off to a great start, but can you imagine having to rewrite our header for every page we create? That's why we break up our site into small reusable components! 

Next.js has no opinion on how you should do this. But, remember, if you put them in the `pages` directory they will be accessible to to the outside world directly. Do you want someone directly accessing your header, navbar and footer? If not, then place them outside it. Go ahead and create a `components` top level directory: `mkdir components` and `touch header.js` to create a `header.js` file.

Open up the `header.js` file in your code editor and create a header component!

```
const Header = () => (
    <div>
        <h1>My Portfolio Site</h1>
    </div>
)

export default Header
```

Then go ahead and go back to your `index.js` file and incorporate your new header:

```
import Link from 'next/link';
import Header from '../components/header';

const Index = () => (
    <div>
        <Header />
        <p>
            Welcome to my portfolio! This is designed with Next.js!
            Please{' '}
                <Link href="/contact">
                    <a>contact me</a>
                </Link>{' '}
            to get more information.
        </p>
    </div>
)

export default Index
```
Now all that new `<Header />` component did was save us one `<h1>` tag, but it doesn't take much imagination to understand that in a real world site there would be a lot more there than just one HTML tag. 

We have now successfully installed Next.js, initialized a new project, created components, linked to them using the Next.js Link API and reused components across our project. This is a great foundation to build from. 

There is a lot more to Next.js like CSS in the Javascript, custom server (for example, using Express), passing state between pages and so much more. Please check out the [documentation](https://github.com/zeit/next.js) to take an even deeper dive and enjoy taking the *next* step with Next.js!