---
title: A Tale of Portfolio Site Evolution in 3 Pictures
date: 2018-11-27
writtenBy: Ben Greenberg
imageUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--ckpkMLXK--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/6nzt6dgj39qe4scn37fb.png
crossPost: https://dev.to/benhayehudi/a-tale-of-portfolio-site-evolution-in-3-pictures-1437
id: 10
---

A portfolio site is where we showcase our projects, share our writings and, in general, cultivate an online presence for our professional selves. It is all of those things, but it is also a reflection on the person themselves. 

A portfolio site is not only a place to show one's projects, it is also a project itself. It is a continuously changing and evolving project, demonstrating the design choices and coding styles of the person who created it. Perhaps you were in a splashy mood when you first began designing it, and so your site employs lots of bright colors and large expressive fonts. Perhaps you were in a more subdued mood when creating your site, and so it is composed of soft colors and modest font choices. 

Over the course of the past year or so, I have created three distinct portfolio sites. Looking back at them now, when I've just deployed my [third and most recent version](https://www.bengreenberg.org), is a good time to think about that journey. The portfolio site experience reflects my coding journey and what I wanted to project about myself into the online space. Each site is a snapshot in time of me as a person and me as a programmer.

## Portfolio Site #1: July 2017

![First Portfolio Site](https://thepracticaldev.s3.amazonaws.com/i/j4j13kmuqaadzdn0npuw.png)

This first site was created in the midst of my education at the Flatiron School. I had just passed my Object Oriented Ruby and Sinatra project review. That bootcamp project was the first genuine web app I had ever built and it left me so excited to apply that to another area and I decided to do so with a portfolio site. At this point, I knew the basics of Bootstrap, PostgreSQL and setting up a Sinatra application. 

[*For those that don't know, Sinatra is like a much lighter weight version of Rails. It is much less opinionated on convention and relies on the developer to do more of the set up. In the Flatiron curriculum, students learn Sinatra before learning Rails as a way of understanding some of the "magic" that forms a lot of the Rails experience.*]

In regards to the design, I had a real distinct image in my head of what a developer site *should* look like and it involved a lot of black, gray and white for the color choices. The last time, prior to entering Flatiron, that I had seriously worked in tech was in the late 1990s, and black background websites were all the rage back then.

I also did not have any experience separating out my frontend and my backend at this juncture, so it was all created together. This was primarily a Ruby driven site, with minimal, if any, Javascript incorporated.

## Portfolio Site #2: September 2017

![Portfolio Site 2](https://thepracticaldev.s3.amazonaws.com/i/caif6nwhyacw0122sodh.png)

Two months may not be a long time in real time, but it encompasses a tremendous amount of learning in bootcamp world. By this time, I was ready for a new frontend for my portfolio site. The black, gray and white color choices were not reflecting me at this moment. I also wanted to incorporate my exposure to Javascript, and specifically, to React into my site. 

While I no longer resonated with the presentation of my portfolio site, the data was still good and how I organized it in the database was exactly what I still needed. So, at this point, I decided to break out my site into two: a Sinatra driven API backend and a React frontend. 

The thing about the backend is a SQL table is a SQL table and unless the needs change, you don't find yourself often needing to refactor it. Whereas, the world of frontend development keeps on adapting and changing. Thus, I adjusted my Sinatra routes a bit to serve data in JSON format and went about creating a new frontend with React.

Looking back at it now, I see that my desire to utilize my newfound React knowledge meant that I over-complicated things a bit for myself. In my case, I don't know if using a state management tool like Redux was really necessary to handle the bit of state I was passing between components. But, at that moment, I was more interested in exercising every bit of knowledge I had learned, than being wise about applying accurate architecture and design decisions. When you first learn something it's all about "*Look what I can do!*" and only later do you realize that the act of choosing not to do something also is a demonstration, and sometimes a better one, of what you can do.

That site pretty much stayed the same for the past year or so. I made some cosmetic changes throughout the year, mainly in that same spirit of: 1) Learn something and 2) Apply it. As a result, the site became increasingly cluttered. I no longer liked looking at my own portfolio site, which is probably a pretty good sign it's time to change it!

## Portfolio Site #3: November 2018

![Portfolio Site 3](https://thepracticaldev.s3.amazonaws.com/i/6nzt6dgj39qe4scn37fb.png)

Now, at this point in my developer life, I had worked for about a year as a full time programmer. I've had the privilege of teaching people new to programming and, generally speaking, have collected more experience. There is still so much to learn, but I've had enterprise production experience in applying architectural and design choices, and I wanted to apply some of that to my portfolio site.

In short, I wanted a portfolio site that I was proud to share with others, and didn't cause me to grimace when I opened it in my own browser.

Before building anything, I sat down and mapped out my goal: 

**To build a portfolio site that was minimalist and de-cluttered.** 

I then drilled down to what components specifically I wanted to incorporate and they were: Portfolio, Blog and Talks. I eliminated any more sub-pages from those three sections and also removed a Contact component and replaced it with three simple links to places I am active: Twitter, LinkedIn and, **of course**, dev.to. 

Since my last portfolio build, I've also learned to really value the role of empty space in a site. Ample white space can draw the eye to what the designer is emphasizing. It makes the work of prioritizing content easy for the user. Thus, I wanted to make sure I really took advantage of whitespace in the browser and didn't fill it up.

Insofar as code choices, I wanted to make the *right* choices here and I was not interested in using everything I knew, only using the appropriate tools to get the job done. 

I knew I wanted to maintain my backend separately from my frontend, and once again, my old trusty Sinatra API service would do its job sufficiently. In the course of the year, my appreciation and admiration for React has only grown, and so has my skill in Javascript. I really like the syntax in ES6 and the async/await format for API calls is beautifully elegant. The previous portfolio site employed Flexbox, which is great, and combining that with CSS Grid, provides a truly responsive experience that's not agonizing to build. 

I also was not interested in over complicating routing and state management, so I chose to use Next.js to build the frontend. Next.js handles routing effortlessly with the built in Link API, and has many other features for rendering, etc. that make it painless and a joy to use. Since I am just passing a bit of data and only passing it in between a very limited amount of components, I chose to use local state for the application and no overly complex middleware like Redux. My use case, in my opinion, doesn't justify utilizing anything more complex than that. 

Lastly, I wanted the site to load very quickly and not be bloated. There are so many npm modules out there that can enhance a site and add a lot of fun features. However, for my purposes I just wanted a simple, minimalist and de-cluttered site, so I thought about what I really needed and researched the npm ecosystem. I ended up incorporating [react-typed](https://www.npmjs.com/package/react-typed) (thanks to [Jarret Bryan](https://dev.to/jaybeekeeper/getting-started-with-gatsby-54n9) for the inspiration), [react-country-flag](https://www.npmjs.com/package/react-country-flag) and [react-spinners](https://www.npmjs.com/package/react-spinners). Each one fulfilled a distinct need and were small and compact.

## What's next?

A portfolio site parallels living and continues to adapt and adjust. What I just deployed as my third version really suits me for right now. Will it forever? I can say with certainty that it will not. 

What will be next? Well, like life, you never really know with absolute confidence what will come next, and that's what makes it an adventure.

You can view my current portfolio site at [bengreenberg.org](https://www.bengreenberg.org).
