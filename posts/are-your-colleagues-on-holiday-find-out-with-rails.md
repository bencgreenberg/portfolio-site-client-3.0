---
title: Are Your Colleages on Holiday? Find out with Rails and the Nexmo Voice API
date: 2019-03-04
writtenBy: Ben Greenberg
imageUrl: https://www.nexmo.com/wp-content/uploads/2018/10/dialingtelephonekeypadco_536224original-1200x600.jpg
crossPost: https://dev.to/nexmo/are-your-colleagues-on-holiday-build-a-voice-app-with-rails-to-find-out-nlh
id: 16
---

Nexmo's [Voice API](https://developer.nexmo.com/voice/voice-api/overview) allows you to build real-time voice communications in the cloud. With the Nexmo Voice API, you can build voice communications using your existing web framework, record and store inbound calls, create conference calls, and send text-to-speech messages in 40 languages and with a plethora of accents.

Nowadays, people find themselves increasingly working within globally distributed teams. It can be a common occurrence for a portion of your colleagues to be away from their desks for a national holiday in their home country. Yet, how can you keep track of all of the national holidays of all the countries your colleagues live in?

In this blog post, we are going to create a Rails application that will help you determine if your colleagues are on a national holiday. When we are finished, we will have an application that anyone can call into that, after going through simple menu prompts, will inform the person whether there is a national holiday in either a specific country or worldwide.

## Prerequisites

* [Ruby 2.5.3+](https://www.ruby-lang.org/en/downloads/)
* [Rails 5.2.2+](https://guides.rubyonrails.org/getting_started.html)
* [ngrok](https://ngrok.io)
* A [Nexmo](https://dashboard.nexmo.com/sign-up) account

This tutorial will take you through the process from scratch. If you'd like to see the finished code, you can clone the [git repository](https://github.com/Nexmo/rails-vapi-holiday-checker) for this project.

## Starting a Rails Project

We are going to initialize a new Rails API project with no database. The reason we are starting the project without a database is we are not persisting any data. From your console, run the following:

```shell
rails new rails-holiday-checker --api --skip-active-record
```

Go ahead and change into the new directory that our command has created: `cd rails-holiday-checker` and open up the project with your preferred text editor.

We are now ready to start building our application.

## Configuring Rails

### Installing Dependencies

The first thing we want to do is install the dependency our project needs. Open up the `Gemfile` and add the following:

```ruby
gem 'holidays'
```

After saving the file, run `bundle install` from your console. We have installed the [Ruby holidays gem](https://github.com/holidays/holidays) to extend the functionality of Ruby's built in Date and Time classes with holiday lookup.

### Controller Actions

At this point, we are ready to define our Controller actions. Let's create a new Controller in `/app/controllers` called `holidays_controller.rb` and inside of it, we will create our actions. However, before we do so, let's take a moment and discuss the flow of our application. This will allow us to understand the logic behind our actions more clearly.

The way our program will work is a user will dial into our application and be prompted to either check for a holiday on a specific date or today. If the user chooses to check for today, they will be directed to another menu asking them where they wish to check: the US, the UK or worldwide. If the user chooses to check for a specific date, they will be directed to a menu option asking them to enter a date. After the user enters the date, they are then asked to pick which country to check for a holiday: the US, the UK, or worldwide. As a result of this flow, we need the following actions (and also routes, to be defined next):

* `#answer`: Determining if the user wants to pick a date or if they want to check today
* `#date_type`: Prompting the user to either enter a specific date, if that is what they chose in `#answer`, or redirecting them to `#country_choice`
* `#country_choice`: Prompting the user to pick a country; the US, the UK, or worldwide
* `#holiday_output`: Checking for a holiday by calling a private method we will create called `#holiday_lookup` and providing the answer to the user in text-to-speech format
* `#event`: An action to receive the response from the Nexmo API and print it to the console

Now that we have an understanding of the flow of our application and the Controller actions we need let's create them:

```ruby
class HolidaysController < ActionController::API

    BASE_URL = ""

    def answer
        render json:
        [
            { 
                :action => 'talk', 
                :text => 'Find out if your colleagues are on a holiday. Press 1 to enter a date or 2 for today.'
            },
            {
                :action => 'input',
                :eventUrl => ["#{BASE_URL}/date_type"]
            }
        ].to_json
    end

    def date_type
        dtmf = params['dtmf'] || parsed_body['dtmf']

        if dtmf == '1'
            render json:
            [
                {
                    :action => 'talk',
                    :text => 'Please enter a date on your keypad in the following format: four digits for the year, 
                    followed by two digits for the month and two digits for the day, followed by the hash symbol. 
                    For example, January 2nd, 2019 would be 2 0 1 9 0 1 0 2.',
                    :bargeIn => true
                },
                {
                    :action => 'input',
                    :submitOnHash => true,
                    :maxDigits => 8,
                    :eventUrl => ["#{BASE_URL}/country_choice"]
                }
            ].to_json
        elsif dtmf == '2'
            render json:
            [
                {
                    :action => 'talk',
                    :text => 'Please enter 1 for the US, 2 for the UK or 3 for worldwide holidays.'
                },
                {
                    :action => 'input',
                    :eventUrl => ["#{BASE_URL}/holiday_output"]
                }
            ].to_json
        else
            render json:
            [{:action => 'talk', :text => 'I did not recognize your selection. Please call back and try again.'}].to_json
        end
    end

    def country_choice
        date = ((params['dtmf'] || parsed_body['dtmf']) || '')

        render json:
        [
            {
                :action => 'talk',
                :text => 'Please enter 1 for the US, 2 for the UK or 3 for worldwide holidays.'
            },
            {
                :action => 'input',
                :eventUrl => ["#{BASE_URL}/holiday_output?date=#{date}"]
            }
        ].to_json
    end

    def holiday_output
        country_input = params['dtmf'] || parsed_body['dtmf']
        date_input = params['date'] || ''

        if country_input == '1'
            holidays = holiday_lookup(date_input, :us) 
        elsif country_input == '2'
            holidays = holiday_lookup(date_input, :gb)
        elsif country_input == '3'
            holidays = holiday_lookup(date_input, :all)
        else
            render json:
        [
            { 
                :action => 'talk', 
                :text => 'I did not recognize the number you entered. Please call back and try again.'
            }
        ].to_json
        end

        if (holidays.length == 0 || holidays.nil?)
            render json:
            [
                {
                    :action => 'talk',
                    :text => 'Your colleagues are not on a holiday today. Feel free to message them on Slack! Goodbye.'
                }
            ].to_json
        else
            render json:
            [
                {
                    :action => 'talk',
                    :text => "Your colleagues are not at their desk today. It is #{holidays[0][:name]}. Goodbye."
                }
            ].to_json
        end
    end

    def event
        puts params
    end

end
```

You will notice that the the `BASE_URL` variable is empty. Once you have set up ngrok and have an externally accessible ngrok URL, please change `BASE_URL` to your ngrok address.

The bulk of the work of our Controller actions is to create [Nexmo Call Control Objects (NCCO)](https://developer.nexmo.com/voice/voice-api/overview/curl#about-nexmo-call-control-objects) that dictate what happens during the call. An NCCO is formatted in JSON and, at the most simple, is composed of an `:action` and a `:text` key-value pair. In the `#date_type` Controller action, we also use additional parameters, such as `:submitOnHash`, `:bargeIn` and `:maxDigits` to make it possible for users to enter more than a one number response, to signify they're finished by entering the hash key, and to begin entering their response before the message finishes.

As we mentioned above and as the code for the Controller shows, we also need to build a method that performs the holiday lookup based on the parameters provided. Let's go ahead and do that:

```ruby
class HolidaysController < ActionController::API

...

    private

    def holiday_lookup(date_input, country)
        with_date = false
        (date_input == '' || date_input.nil?) ? with_date = false : with_date = true

        if with_date
            year = date_input[0, 4].to_i
            month = date_input[4..5].to_i
            day = date_input[6..7].to_i
        end

        if country != :all
            with_date ? Holidays.on(Date.civil(year, month, day), country) : Holidays.on(Date.today, country)
        else
            with_date ? Holidays.on(Date.civil(year, month, day)) : Holidays.on(Date.today)
        end
    end

end
```

The `#holiday_lookup` method takes two arguments: `date_input` and `country`. It creates a `with_date` variable to hold a boolean flag. If the user did not provide a date, then the `with_date` flag is `false`, but if they did, then it is set to `true`. The method then sets `year`, `month`, and `date` values, if the user provided a specific date. Those values are used to check for a holiday on a specific date or, if `with_date` is `false`, to check for a holiday today. Furthermore, the method also checks if the user asked for holidays in a specific country, or worldwide, and performs the appropriate search.

### Defining our Routes

The last item we need to do to set up our Rails application is define our routes. Open up `/config/routes.rb` and add the following:

```ruby
get '/answer', to: 'holidays#answer'

post '/event', to: 'holidays#event'

post '/dtmf', to: 'holidays#dtmf'

post '/date_type', to: 'holidays#date_type'

post '/country_choice', to: 'holidays#country_choice'

post '/holiday_output', to: 'holidays#holiday_output'

post '/event', to: 'holidays#event'
```

Our Rails application is now ready for use, but we still need to set up our Nexmo credentials. However, before we do so, we need to create an externally accessible URL with ngrok that the Nexmo API can use to interact with our application. The following [blog post](https://www.nexmo.com/blog/2017/07/04/local-development-nexmo-ngrok-tunnel-dr/) details the steps necessary for setting up ngrok, if you have not done so before. 

Now that we have both our Rails application and our ngrok external URL information, we can set up our Nexmo account.

## Setting up our Nexmo account

In order for our voice application to work, we need a Nexmo account, a Nexmo provisioned phone number, a Nexmo application, and, lastly, we need to link our application to our phone number. 

### Creating a Nexmo Account

You can create a Nexmo account for free, and as an added bonus, your account will be credited with 2 euros to begin using your new application. Navigate to [https://dashboard.nexmo.com/sign-up](https://dashboard.nexmo.com/sign-up) in your web browser and go through the sign up steps. Once you have finished you will be in your Nexmo dashboard.

### Buying a Phone Number

From the Nexmo Dashboard, click on the `Numbers` menu item on the left-hand menu. You will see three options appear:

<img src="https://www.nexmo.com/wp-content/uploads/2019/02/Screen-Shot-2019-02-25-at-13.07.32.png" alt="" width="538" height="286" class="alignnone size-full wp-image-28364" />

Click on the `Buy numbers` option and you will be directed to a page where you can choose a country, features, type, and four digits you would like the number to have.

<img src="https://www.nexmo.com/wp-content/uploads/2019/02/buy_numbers_nexmo_dashboard.png" alt="" width="1618" height="300" class="alignnone size-full wp-image-28370" />

For our purposes: pick the country that you are currently in, so that the call will be a local call for you; pick `Voice` for features and either mobile or land line for type. You do not need to enter anything for the `Number` text field. When you click `Search`, you will see a list of phone numbers available. 

Pick one by clicking the orange `Buy` button, and clicking the orange `Buy` button once more in the confirmation prompt.

You now own a Nexmo phone number. Our next step is to create an application in the Nexmo dashboard.

### Create a Nexmo Application

From the left-hand menu, click on the `Voice` menu item. You will see the following four options under `APPLICATIONS`:

<img src="https://www.nexmo.com/wp-content/uploads/2019/02/voice_menu_options_dashboard.png" alt="" width="510" height="426" class="alignnone size-full wp-image-28391" />

Click on the `Create an application` option and you will be directed to a page where you can set up a new Nexmo application.

Complete the form with the following:

* `Application name` text field enter `holidays-checker`
* `Event URL` text field enter your ngrok URL: `https://[ngrok url here]/event`
* `Answer URL` text field enter your ngrok URL again: `https://[ngrok url here]/answer`

We do not need a public/private key pair for the purposes of this application, but nonetheless, it is a good idea to generate them. When you click the link `Generate public/private key pair`, the public key will populate the `Public key` text area and a private key will automatically download to where your browser saves downloads. You can save that private key in the root folder of your application, but make sure to add `./private.key` to your `.gitignore` file so as not to commit it to version control and make it public.

Once you have finished, go ahead and click the blue `Create Application` button. 

### Linking Your Nexmo Number to Your Nexmo Application

Now that we have both a Nexmo voice number and a Nexmo application, all that is left to do is link the two together.

Click on the `Numbers` menu option in the left-hand menu and then click on `Your numbers`. You will be directed to a page listing the phone numbers you purchased, which, at this point, is the one number we just bought. Click on the gear icon on the right-hand side of the page adjacent to the number and a menu will pop up. The only step to complete here is to select your new application from the drop down list under the `Voice` area and press the blue `Ok` button.

<img src="https://www.nexmo.com/wp-content/uploads/2019/02/configure_number_dashboard.png" alt="" width="1550" height="608" class="alignnone size-full wp-image-28397" />

You have now linked your new Nexmo voice number to your new Nexmo application, and with that last step, you are ready to run your application!

## Starting Your Application

With your ngrok server still running in the background, go ahead and run `rails s` from your console. This will boot up your Rails server on `https://localhost:3000`. There are no views in your application, so the only way to interact with it is to call it; go ahead and dial your new Nexmo phone number. You should hear your application answer the call and ask you the first prompt from the `#answer` Controller method. Feel free to experiment with different options and play with your application. You now have a fully functioning holiday checker with Rails and the Nexmo Voice API. Congratulations!

## More Resources

If you are interested in finding out more about the Nexmo Voice API, check out the following resources:

* [Nexmo Voice API Reference](https://developer.nexmo.com/api/voice)
* [How to receive voice call events for an in-progress call with Rails](https://www.nexmo.com/blog/2017/12/19/receive-voice-call-events-call-progress-ruby-rails-dr/)
* [How to handle inbound calls with Rails](https://www.nexmo.com/blog/2017/12/19/receive-voice-call-events-call-progress-ruby-rails-dr/)
* [Build a family hotline with the Nexmo Voice API](https://www.nexmo.com/blog/2018/11/20/build-a-family-hotline-dr/)