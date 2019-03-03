---
title: "I Built An Alexa Skill... And You Can Too!"
date: 2017-12-12
writtenBy: Ben Greenberg
imageUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--D_J4xwP9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn-images-1.medium.com/max/300/1%2ATVQukJUB-Wxd7ibe0Sfv3w.png
crossPost: https://dev.to/benhayehudi/i-built-an-alexa-skill-and-you-can-too-2pf
id: 7
---

Ever since we first brought an Amazon Echo into our home about a year ago it has been a source of constant entertainment for our small children. The latest source of humor for our kids is asking Alexa to multiply google by google and listening to all the zeros Alexa recites back to them. We check the weather, play Jeopardy, control our household lights and much more all on our Echo. As a new software developer, I have also wanted to develop an Alexa Skill for a while now and this weekend I finally did. It was easy and intuitive to do. In fact, you can&nbsp;too!

![](https://cdn-images-1.medium.com/max/450/1*i4r47PDHxhpIj8tTP4hifA.gif)

My initial inspiration was an article on [_The Practical Dev_](https://dev.to/willvelida/building-my-first-alexa-skill--rugby-facts-doc) by Will Velida where he documents his steps towards releasing his first Alexa Skill. After I read that article I knew that I could do it too. This first skill would be a fact skill, meaning users would ask for a fact and the skill would return a fact. Why start there? It’s a relatively simple function to implement and gives a good introduction to Alexa Skill development.

What kind of fact skill would I create? Well, as a rabbi and a software developer, the choice was obvious. I’d create a Torah facts skill! This skill would have a list of facts about the Torah and a user could prompt it by saying “_Alexa, ask Torah Facts to tell me a fact_” and it would recite one of the&nbsp;facts.

![](https://cdn-images-1.medium.com/max/480/1*jhFFEAK_1SBpvEsIp7hLXg.gif)

To start on your new fact skill just head on over to the [Alexa Skills Kit tutorial](https://developer.amazon.com/alexa-skills-kit/tutorials) where you will find a step by step instruction guide. Setting up your Alexa Skill requires an Amazon Developer account to register your application and an Amazon Web Services (AWS) account to host your application. Instructions to create both are included in the tutorial. There is a free tier for Amazon Web Services, which assuming your skill does not reach the top ten list of Amazon Skills, should be sufficient.

Your actual Alexa Skill is a Node.js application that makes use of the [alexa-sdk](https://www.npmjs.com/package/alexa-sdk) Node package. To get going with the alexa-sdk package you’d do something like&nbsp;this:

```
const Alexa = require('alexa-sdk');
```

Then you would want to setup a data structure housing your facts list. In my case, my data looks like&nbsp;this:

```
const languageStrings = {
    'en': {
      translation: {
       FACTS: [
        'fact 1',
        'fact 2',
        'fact 3'
      ]
    }
  }
};
```

As you can see you can create data in multiple languages, using the standard abbreviations for a language. For this skill, we are only using English, so all I need is the en abbreviation.

We want to call a random fact each time a user prompts for a fact, so we want to create a function that gets us a random index number that we can use to pull data from our&nbsp;array:

```
const factArr = this.t('FACTS'); 
// this.t() localizes the strings in the array

const factIndex = Math.floor(Math.random() * factArr.length); 
// get a random number within the size of our array

const randomFact = factArr[factIndex];
```

The rest of the function utilizes the built in listeners and emitters within the alexa-sdk package to interpret the user prompt to Alexa and to return the fact vocalized back to the user. The documentation for that is really well done and can be found on the Github [repository](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs).

Once you are done your Skill is live in development mode and can be tested on your own Echo devices associated with your account. You can also invite other users to experiment in the development mode as well. Once it is all working and you are satisfied you can submit it to Amazon for approval. The process took one day from confirmation of my submission to the Skill going live in the Amazon Skills listings.

![](https://cdn-images-1.medium.com/max/300/1*TVQukJUB-Wxd7ibe0Sfv3w.png)

Overall, this was a great way to introduce me to Alexa application development. It was an afternoon well spent. Now, when my kids are playing with our Echo they not only ask Alexa to tell them what the value of google multiplied by google is, but they also ask Alexa to tell them a Torah fact and there is nothing as satisfying as when your kids think what you did is&nbsp;cool.

*Torah Facts* can be found on [Amazon](https://www.amazon.com/dp/B077ZDHCZL/).