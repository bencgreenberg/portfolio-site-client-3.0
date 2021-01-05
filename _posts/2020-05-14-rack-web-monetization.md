---
layout: post
modal-id: 4
date: 2020-05-14
cover: https://i.imgur.com/6o2c3Wq.png
alt: Cover Image
title: Rack Middleware for the Web Monetization API
link: https://dev.to/bengreenberg/rack-middleware-for-the-web-monetization-api-1ah9
featured: true
author: ben
categories: blog
---

Initially, I did not know if there was a relevant way for me to participate in this DEV hackathon since the Web Monetization API is primarily a client-side topic, and as a backend dev, it wasn't apparent where my point of contribution would be.


However, I then read this idea from fellow DEV community member Kinyanjui Wangonya to create a [Python binding for the Web Monetization API](https://dev.to/wangonya/a-python-binding-for-the-web-monetization-javascript-api-4p1n) and I had a moment of inspiration! 

It was time to build middleware for the Ruby ecosystem to handle the different states returned from the API. 

## What I built

I built Rack middleware, `rack-monetize`, that can be used in either a standalone Ruby application or mounted into a Rails application. 

The middleware functions like other middleware in that it sits in the *middle* of the stack and watches the request parameters coming into the application. 

When the middleware finds parameters related to the Web Monetization API it intercepts it and processes it. If the data value of the parameter matches one of the states [documented in the API] (https://webmonetization.org/docs/api) then it lets the data continue on down the stack of the app. If, however, the data is not one of the expected states then it stops the flow of the app and returns a `403` HTTP status.

This functionality can be built by every Ruby developer for each application they are integrating the web monetization API, but the middleware abstracts that process for them, and makes it as simple as including `use Rack::Monetize::ProcessMonetizeState` in their `config.ru` or `config.middleware.use Rack::Monetize::ProcessMonetizeState` in their `config/application.rb` file if it is inside Rails.

The gem is available on [RubyGems](https://rubygems.org/gems/rack-monetize) and the code is available on [GitHub](https://github.com/bencgreenberg/rack-monetize):

### Submission Category: 

Foundational Technology

## Demo
 
The app (v0.1.0) can be found on [RubyGems](https://rubygems.org/gems/rack-monetize).

The client application would need to send the Web Monetization API state to a backend with `rack-monetize` installed. The state needs to be sent with the `monetization_state` key.

## How I built it 

I built it by first using the new gem functionality in bundler:

```bash
$ bundle gem rack-monetize
```

This initiates a series of question prompts, which I answered. These questions are about the license, code of conduct, etc.

Once that was done, I filled in the details of the `rack-monetize.gemspec`, which is used to build out the gem and I added `rack` as a runtime dependency:

```ruby
spec.add_runtime_dependency('rack', '~> 2.2', '>= 2.2.2')
```

At that point, I was ready to write the code itself, which lives inside `/lib/rack/monetize/process_monetize_state.rb`.

The `ProcessMonetizeState#initialize` method takes in the app as an argument and assigns it to an instance variable, `@app`, to use it in the rest of the code.

The `#call` method will `return` the environment back to the stack if the `params` do not include `monetization_state`.

If the `params` do include `monetization_state` it invokes the `#check_monetization_state` method. 

The method returns `true` if the state is one of: `stopped`, `pending`, `started` or `undefined`. (According to the [API Documentation](https://webmonetization.org/docs/api#undefined) `undefined` will be present until web monetization is built into the browsers.)

The middleware will return a `403` HTTP status if there is a `monetization_state` parameter, but its value is not one of the aforementioned states.