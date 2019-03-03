---
title: A Window Into Developer Relations
date: 2019-02-21
writtenBy: Ben Greenberg
imageUrl: https://cdn-images-1.medium.com/max/1600/1*6W5eurFhYPpwNbRbqNImgQ.jpeg
crossPost: https://dev.to/benhayehudi/a-window-into-developer-relations-3dmh
id: 14
---

I remember the first time I heard about developer relations as a possible career path. I was at [RubyConf in New Orleans](https://dev.to/benhayehudi/beignets-sharks-and-ruby-my-week-at-rubyconf-c9g) and exploring the booths in the sponsors area. It was there that I met for the first time a person with a title of "Developer Evangelist." What was this job? As a rabbi-turned-coder, I was not so keen on embracing a title with the word _Evangelist_ in it, but I was intrigued by the broader field of Developer Relations. 

Fast forward to now, and I am in my first Developer Relations position at [Nexmo](https://www.nexmo.com). As a Ruby developer advocate and a platform engineer for the [Nexmo Developer Platform](https://developer.nexmo.com), I get to participate in a wide array of activities. There is an ongoing conversation on Twitter, and elsewhere, on what exactly do Developer Advocates do? What is the work of Developer Relations? Do Developer Advocates still code? Do we only travel and attend conferences? 

With the caveat that this is only my experience, I am happy to share one window into the world of Developer Relations. First, let me offer my take at what Developer Relations is all about:

_Developer Relations is about serving the developer community by advocating for their needs internally and providing the best possible experience and tooling to enable their work and act as a catalyst for their success._

How does that translate practically daily?

* Developer Experience
* Client library
* Developer Engagement

## Developer Experience

*What are the areas that could be improved in the way developers interact with your platform?*

*Is the way your documentation is structured accessible to developers? What about developers of different experience levels? Does your API Reference reflect the current reality of your APIs? Are your code samples up to date and easy to understand?*

*How can you make it easier for your colleagues to iterate on your platform and make their work more straightforward, and thus, bring new features and new information to your community quicker?*

These questions and more animate a lot of the developer experience work for me. Developer Experience is arguably one of the most critical aspects of the work. Can developers get to what they need quickly and intuitively? Can your platform be iterated upon easily? Are your docs up to date and well structured?

Some of the work I've done in the past couple months to improve our platform involves things like adding more tests to the application to make it more durable:

[https://github.com/Nexmo/nexmo-developer/pull/1333](https://github.com/Nexmo/nexmo-developer/pull/1333)

Creating config-driven customizable landing pages:

[https://github.com/Nexmo/nexmo-developer/pull/1372](https://github.com/Nexmo/nexmo-developer/pull/1372s)

Adding documentation to make the feature more straightforward to use:

[https://github.com/Nexmo/nexmo-developer/pull/1439](https://github.com/Nexmo/nexmo-developer/pull/1439)

An important point about the work of developer experience is that some of the work are things that are directly visible to the community, while others are there to ensure that the platform stays resilient and, thus, are more internal. Both external facing improvements and internal improvements are essential for the developer experience. A well-running application means less downtime, faster results and an overall better interaction for everyone. 

## Client Library

If you want to make it as straightforward as possible for people to integrate your APIs into their work, then a client library is essential. However, a client library that is not well maintained or well documented can cause more harm than good. When you publish a client library, you must also commit to actively managing it. That means, briefly:

* Keeping up to date with the latest changes in the language
* Keeping the library in sync with API changes
* Ensuring the docs are clear and relevant
* Responding in a timely fashion to issues and pull requests

As someone relatively new to this work, I am fortunate to have an entire team of experienced colleagues who provide examples of best practices in this area. I'm a big advocate in being open to what you need to learn. There is nothing to be embarrassed about learning new tasks and new ways of doing things. Thus, as I work on adding a new API service to our Ruby client library, the conversation about how best to do that is publicly available in the GitHub pull request. Perhaps the record of my learning in this area will be helpful to someone else down the road who is also learning the best approaches to this area. 

[https://github.com/Nexmo/nexmo-ruby/pull/117](https://github.com/Nexmo/nexmo-ruby/pull/117)

## Developer Engagement

Are you the type of developer who loves getting up from their desk and discussing the work with your colleagues? Do you enjoy meeting other people in the community and sharing successes and challenges in the work? I am definitely one of those people, and the area of developer engagement is one of my most enjoyable aspects of the work.

Developer engagement can happen at conferences, meetups, in a co-working space, on Stack Overflow or as an issue raised on GitHub. Any time you direct your focus, attention, and care to the developer community, you are doing the work of developer engagement. I love talking to people who are using our APIs or who are curious about it. I want to hear about what is working, and even more so, what is not working. What are the difficulties in integrating them? What successes have you had? What do you wish was there but is currently not?

Developer engagement is also the act of thinking about the best ways to share new insights and ways to accomplish tasks with the larger community. If the work is enabling the success of the community, then engaging the community with quickstart examples furthers that goal, like, for example, [how to stream audio to an existing phone call](https://www.nexmo.com/blog/2019/01/24/play-streaming-audio-to-a-call-with-ruby-dr/).

Those conversations and this process directly inspires the future of our work. What we focus on, what we prioritize and what we build is inextricably bound to the conversations with the community. 

My developer relations is a lot of coding and a lot of listening. It is the work that sits at the intersection of programming and empathy. It lets me bring my fuller self to my work; my love of engineering, my passion for people-to-people connection and my desire to teach. At the end of the day, developer relations is a service-driven career. You work to serve the developer community. You work to place their needs and their desires first and foremost. You succeed when you enable and catalyze their success. As a former rabbi, this work feels both very familiar and very important.
