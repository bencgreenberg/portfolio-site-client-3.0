---
title: The Gender Pronoun Highlighter
date: 2018-11-06
writtenBy: Ben Greenberg
imageUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--3Zu5sSDj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/2fuylhnnajofrh4ccggt.png
crossPost: https://dev.to/benhayehudi/the-gender-pronoun-highlighter-1g80
id: 12
---

When the default audience is always you, it is hard to realize when there are others who are not included in that default, even when it can be so obvious. As a male, I come across articles written all the time assuming I am the reader: "*He does...*", "*He listened...*", "*He showed...*", etc. It is almost always a "he". The assumed reader is almost always a man. 

Without going into all the ways that might adversely impact people who are not men, when they never see themselves reflected in the world around them, I thought it might be interesting to create a simple application to highlight exactly this problem.

I built out a Node.js application utilizing Next.js and React to dynamically highlight gendered pronouns in any given text as it is being typed into the text box. 

**It is live and can be accessed [here](https://gender-pronoun-highlighter.herokuapp.com/).**

![Screenshot of Gendered Pronoun Highlighter](https://thepracticaldev.s3.amazonaws.com/i/2fuylhnnajofrh4ccggt.png)
<figcaption>Screenshot of Gendered Pronoun Highlighter</figcaption>

The application consists of a single page, `index.js`, that has a few components that breakout the functionality into smaller parts. As the user is typing into the `textarea` the text is being saved in local state. That state is being passed to an `EvalText` component that presents it with some CSS styling in between `<span></span>` tags. 

Within the `EvalText` component each word of the input is being evaluated against three separate arrays: male, female and gender neutral pronouns. A specific CSS styling is applied to the word if it is found in either the male or female pronouns array. Right now, nothing is being done with the gender neutral pronouns, but there is room there to do some other styling as well. 

I have put up the code in a public [Github repository](https://github.com/benhayehudi/pronoun_highlighter) and would love contributions.

There are a few open issues already of items I identified, specifically:

1. Making the gender pronoun lists more comprehensive
2. Responsive styling
3. Adding counters to the page to increment/decrement # of each type of pronoun dynamically

Additionally, I welcome new features or other improvements. I wrote this during my lunch break so I am sure it could benefit from some love and attention! 

Last week, I blogged about [getting started with Next.js in 5 minutes](https://dev.to/benhayehudi/getting-started-with-nextjs-in-5-minutes-19ah) and it was a great experience to build out an idea that I have had for a long time using the framework. In a world where I am just about always the default audience, it is meaningful to do something, albeit a small thing, but something all the same, to help bring attention to that issue.
