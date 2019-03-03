---
title: How I Created Two Twitter Bots
date: 2017-11-06
writtenBy: Ben Greenberg
imageUrl: https://res.cloudinary.com/practicaldev/image/fetch/s--JbcIYm6y--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/sfqaog9tsql968kb8nwk.png
crossPost: https://dev.to/benhayehudi/how-i-created-two-twitter-bots-a97
id: 6
---

With the news cycle every day never failing to mention the insidious Twitter bots that caused havoc during the 2016 election cycle, I became curious as to the process of creating Twitter bots. How hard is it to get one up and running? In this latest article in my ongoing series of *Coding for Liberal Arts Programmers*, we are going to break down the process of creating our very first Twitter bot. 

Beginning last evening I created two Twitter bots: 

1. [Web Developer Jobs](https://twitter.com/WebDevJobsNow): A bot that retweets developer job postings
2. [Remember Us All](https://twitter.com/RememberUsAll): A bot that responds to the @realdonaldtrump Twitter account by posting a mass shooting statistic from this year with data from the [Gun Violence Archive](http://www.gunviolencearchive.org/). 

Hopefully by the end of this article you will be able to create your own Twitter bots as well.

**Getting Started**

The first step to creating your Twitter bot is to obtain the appropriate access keys from Twitter. You can do so by heading over to the [Twitter New App Form](https://apps.twitter.com/app/new) and registering your application. The form is self explanatory, and for our purposes, leave the Callback URL entry empty. 

![New App Page](https://i.imgur.com/V5xQcqN.png)

Once you have registered your app click on the *Keys and Access Tokens* tab and then click on *Generate Access Tokens*. Make sure to copy down in a safe place the four tokens that you will need: `consumer_key`, `consumer_secret`, `access_token` and `access_token_secret`. 

Now you officially have a Twitter account for your bot and you have the required keys to interact with it outside of the Twitter website. You can take some time to style your Twitter profile page for your app with header and profile pics, a bio, etc. now or later when you are finished. 

**Initial Node Setup**

At this point you now need to begin working on the actual bot. This part is actually relatively easy. Begin by creating an empty directory in your terminal and then running `npm init` from that directory. You will be guided through a series of prompts and your answers will be used to generate a `package.json` file needed for your new NodeJS application. When asked in the prompt for the filename for the `main` file, do not default by pressing enter to `index.js`, but rather name it something like twitterBot.js. This will come in handy in just a moment.

**Creating Your Files, Environment Variables and Node Packages**

Now that you have your `package.json` completed with its initial setup, let's go ahead and create our first file. From the terminal run `touch twitterBot.js`. This will create the file in your directory. You will also need to store your access keys from Twitter somewhere and there are different ways of doing so. In this exercise we are going to store them as environment variables. This makes sure we don't accidentally commit them to Github for the world to see! In order to save them as environment variables for our Node application you can run the following from the command line:

```
export consumer_key=YOUR KEY HERE
export consumer_secret=YOUR SECRET KEY HERE
export access_token=YOUR TOKEN HERE
export access_token_secret=YOUR ACCESS TOKEN SECRET HERE
```

We will look at how we access those keys in our application in the next step. Our last step here is to install the [twit](https://www.npmjs.com/package/twit) node package, which is what we will use to interact with the Twitter API. You can do so by running `npm install --save twit` from your command line.

**Coding Your Bot**

At this point we are ready to begin coding our bot! Open up `twitterBot.js` in your favorite text editor and let's begin.

Initially, we are going to want to define our dependencies and setup our initial variables:

```javascript
// define the dependencies
const twit = require('twit');

const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}

const Twitter = new twit(config);
```

Here we create a `const` variable called `twit` that is dependent on our `twit` node package. We create an object with a `const` called `config` that holds our keys. Note that we are using `process.env...` to recall the keys that we defined in our environment variables. We are also creating a new instance of `twit` with a `const` called `Twitter` and passing in those keys as the argument. 

Our first Twitter bot is going to search through Twitter for certain search parameters and retweet posts that meet those parameters. Thus, we need to define those parameters. We are going to do this by creating a function that holds both the parameters, the call to `get` the results from Twitter and the call to `post` on Twitter. First the parameters:

```javascrip
let retweet = function() {
    let params = {
        q: '#thepracticaldev, #coding',
        result_type: 'mixed',
        lang: 'en'
    }
```

You will notice that we are using a `result_type` of `mixed` in our params. For a list of all the options you can use when searching check out the [search tweets](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets) docs on the Twitter developer site. 

Next we are going to define the bulk of our function, which will encapsulate both the `get` and the `post` actions:

```javascript
// search through all tweets using our params and execute a function:
Twitter.get('search/tweets', params, function(err, data) {
        // if there is no error
        if (!err) {
           // loop through the first 4 returned tweets
          for (let i = 0; i < 4; i++) {
            // iterate through those first four defining a rtId that is equal to the value of each of those tweets' ids
          let rtId = data.statuses[i].id_str;
            // the post action
          Twitter.post('statuses/retweet/:id', {
            // setting the id equal to the rtId variable
            id: rtId
            // log response and log error
          }, function(err, response) {
            if (response) {
              console.log('Successfully retweeted');
            }
            if (err) {
              console.log(err);
            }
          });
        }
      }
        else {
            // catch all log if the search could not be executed
          console.log('Could not search tweets.');
        }
    });
}
```

We can then call our function inside our file with a simple `retweet()`. This will execute it exactly once at initialization. If we want to do it more than once, we might want to set an interval of how often it executes with `setInterval()` and giving it an argument of time to pass. For example, `600000` will set the application to run every 10 minutes. This is also helpful if you end up deploying to a service like Heroku and using a free account since free accounts go to sleep if inactive and `setInterval()` will ensure that your account "wakes up" at a specified time regularly. 

Our final and complete code now looks like this:

```javascript
let retweet = function() {
    let params = {
        q: '#developer, #jobs',
        result_type: 'mixed',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
        // if there is no error
        if (!err) {
           // loop through the first 4 returned tweets
          for (let i = 0; i < 4; i++) {
            // iterate through those first four defining a rtId that is equal to the value of each of those tweets' ids
          let rtId = data.statuses[i].id_str;
            // the post action
          Twitter.post('statuses/retweet/:id', {
            // setting the id equal to the rtId variable
            id: rtId
            // log response and log error
          }, function(err, response) {
            if (response) {
              console.log('Successfully retweeted');
            }
            if (err) {
              console.log(err);
            }
          });
        }
      }
        else {
            // catch all log if the search could not be executed
          console.log('Could not search tweets.');
        }
    });
}
retweet();
setInterval(retweet, 600000);
```

**Running Our Bot**

To begin our bot we simply need to run `node tweetBot.js` from our command line. If you refresh your Twitter profile page you should now see some fresh new retweets committed by our bot. Congratulations! You have now created you first Twitter bot.

**Deploying to Heroku**

Once your bot is up and running you will feel a bit like you are living in Frankenstein's world. You certainly do not want to end the life of your new creation every time you close your terminal window or shut down your computer. It's time to give your bot a permanent home. This guide will not cover the steps to creating an account on Heroku. The Heroku site itself has many resources on getting started, so for our needs now we will begin from after you have your account set up. 

For your app to run on Heroku you will need a Procfile with the command to start your bot. Run `touch Procfile` from the command line and then add `worker: node tweetBot.js` in the file from within your text editor.

Next, in the command line run `heroku create NAME-YOUR-BOT`, replacing `NAME-YOUR-BOT` with a name you want to give it. Then run `git add .`, `git commit -m "deploying to Heroku"` and `git push heroku master`. Now you will need to define your access keys as Heroku environment variables in a process very similar to what you did above for your local copy. Simply run `heroku set:config key_name=key_value` for each type of key (i.e. `consumer_key`, `consumer_secret`, etc.). 

One thing that you will want to make sure about is that Heroku is running the `worker` from your Procfile. Go to the Heroku profile page for your app and check that your "free dynos" are being used for the "worker" by making sure that the toggle is set to on there. 

![Configuring Your Dynos](https://i.imgur.com/ZsviuLV.png)

That's it! Your Twitter bot is now deployed and running on Heroku and will no longer cease to exist when you close your computer. With your new bot powers remember the ancient wisdom from Spiderman: "With great power, comes great responsibility." 
