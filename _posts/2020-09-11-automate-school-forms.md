---
layout: post
cover: https://dev-to-uploads.s3.amazonaws.com/i/x43vhwa68vvy888s1sxq.jpg
title: Automate School Forms with Web Scraping in Ruby
date: 2020-05-13
categories: blog
author: ben
featured: true
summary: Learn to automate form submissions with web scraping in Ruby
---

My good friend and former colleague Yechiel recently wrote about automating Google Forms submissions in Ruby. He and I both share the same purpose for our automation, which is to save valuable time in the daily morning preparations of busy working families, but our schools use very different systems for their daily coronavirus health form requirements.

If you are interested in learning how to automate Google Forms submission then navigate over to <a href="https://dev.to/yechielk/automating-google-form-submission-in-ruby-30b0">Yechiel's excellent post</a>.

In this post I will share how I automated the submission process for our school system, which uses a custom website.

*tl;dr You can find the code for this application on [GitHub](https://github.com/bencgreenberg/school-health-declaration-automation) with instructions on how to use it.*

For a successful submission of the daily school form my app needed to:

* Log in to the site with my username and password
* Check two HTML checkboxes
* Draw on an HTML5 Canvas element
* Press the "Submit" button
* Account for each child in my list and repeat each action for each child
* Skip a child in the list if their form had already been submitted
* Give me some feedback if the submission was successful or tell me if something went wrong

This is what the form looks like for each child:

![Health Form Screenshot](https://dev-to-uploads.s3.amazonaws.com/i/kq1ja2w4d68zp6uky7is.png)

To solve this problem I used [Watir](http://watir.com/), which is a Ruby gem that lets your application interact with a web browser the way a person would interact with it. Watir enables you to click on links, fill out forms, submit them and more.

I added the three following gems to my `Gemfile`, which is where you list your application dependencies:

```ruby
gem 'dotenv'
gem 'watir'
gem 'webdrivers'
```

I used the `dotenv` gem to help manage my environment variables in the application. Specifically, in order to not store my username and password in any public version control, I use environment variables for them and access the variables in the application.

Additionally, the `webdrivers` gem is used to make the [Chrome Webdriver](https://chromedriver.chromium.org/) available, which simulates accessing a website in a Chrome browser.

Once I had my dependencies I was ready to build my app. I like to encapsulate my code in small methods that do as little as possible. It makes it easier for me to diagnose when things go wrong.

The first method I built was `#call`, which serves as the entry point for the application. The method invokes the next method `#get_sign_in_page` that instantiates the Watir instance and cicks on the first button that must be clicked on to get to the sign-in page:

```ruby
def call(url)
  get_sign_in_page(url)
end

def get_sign_in_page(url)
  browser = Watir::Browser.new :chrome, headless: false
  browser.goto(url)

  click_first_sign_in(browser)
end
```

The second method above then invokes `#click_first_sign_in`, which does as it is called, namely clicking on that first sign in link:

```ruby
def click_first_sign_in(page)
  page.link(:class => [
    'text-bold',
    'color-white',
    'edu-connect',
    'btn',
    'color-blue',
    'border-blue',
    'btn-connect-briut'
    ]).click

  fill_in_sign_in_form(page)
end
```

I find the sign-in link using its collection of CSS classes and pass them to the instance method `#link` of Watir as an Array of Strings. Once I identified the right button, then I click on it with the `#click` method! Don't you love when methods are named so well?

The method ends by invoking the next method, `#fill_in_sign_in_form`, which completes the login process:

```ruby
def fill_in_sign_in_form(page)
  page.text_field(id: /HIN_USERID/).set(ENV['USERNAME'])
  page.text_field(id: /Ecom_Password/).set(ENV['PASSWORD'])
  page.button(name: /loginButton2/).click

  fill_out_declaration(page)
end
```

The method above finds the text fields in the form for the username and password and supplies my environment variables as their values. It then finds the submit button and clicks on it. Lastly, I then move on to the next method, which takes care of my kids health forms.

In the next method, I first get the list of kids by finding it in its `<div>` using its CSS class. Then I iterate through the list of links in that `<div>`. 

During the iteration, I check if the form each element (i.e. each child) has already been submitted. If it has then I output to the console a short message explaining that. If it has not, then I `#click` on the kid and `#complete_individual_form`: 

```ruby
def fill_out_declaration(page)
  kids_list = page.div(class: /name_student_infile/)
  kids_list.links.each do |kid|
    if check_already_submitted?(page)
      puts "Form already submited"
      next
    end
    kid.click
    complete_individual_form(page)
  end
end
```

The individual form is processed for its requirements. That means that each of the two checkboxes are clicked and the application draws a bit on the Canvas element:

```ruby
def complete_individual_form(page)
  # two checkboxes
  page.label(:xpath => '/html/body/div[1]/section/div/div[3]/form/div/div[2]/b/div[2]/div/label').click
  page.label(:xpath => '/html/body/div[1]/section/div/div[3]/form/div/div[2]/b/div[3]/p/label').click
  
  # canvas element
  canvas = page.browser.driver.find_element(:xpath => "/html/body/div[1]/section/div/div[3]/form/div/div[2]/b/div[6]/div[1]/div/canvas")
  page.browser.driver.action.move_to(canvas, 50, 20).click_and_hold.move_to(canvas, 550, 85).release.perform
  page.browser.driver.action.move_to(canvas, 200, 85).click_and_hold.move_to(canvas, 75, 43).release.perform
  page.button(id: /btn_send/).click
  
  validate_success(page)
end
```

After the form has been finished, I validate that it was performed successfully. 

In the case of this specific website, all the error messages are already on the site but hidden behind a CSS class of `hidden`. If there was an error then the `hidden` class is removed and the error message becomes visible. 

Similarly, if the `hidden` class is removed on the success message, then it means the form was submitted successfully.

```ruby
def validate_success(page)
  check_for_errors(page)
  
  if page.label(class: /answer_send color-red/).present?
    puts "Sent form successfully"
  end
end

def check_for_errors(page)
  if page.label(class: /fill_answer1 color-red/).present?
    puts "First checkbox not checked properly"
  end

  if page.label(class: /fill_answer2 color-red/).present?
    puts "Second checkbox not checked properly"
  end

  if page.label(class: /fill_sign color-red/).present?
    puts "Signature not recorded properly"
  end

  if page.label(class: /answer_send color-red hidden/).present?
    puts "Form not sent successfully"
  end
end
```

At the very end, I needed to also include the method, `#check_already_submitted?` that I referenced in the iteration of the list of children, but had not built yet:

```ruby
def check_already_submitted?(page)
  page.link(:class => [
    'answer_send',
    'pdf_wrap_create_briut',
    'padding-right-lg-x',
    'cursor-pointer'
    ]).present?
end
```

Now, the file just needs an invocation to the entry point, which is as simple as adding `call(ENV['URL'])` on a new line at the end. 

Before the application is ready to be run we needed to make sure that there was a `.env` file with the right variables, namely:

* `URL`: The website entry point for the health form
* `USERNAME`: Your username
* `PASSWORD`: Your password

We also needed to add a few `require` statements at the top of the file:

```ruby
require 'dotenv'
Dotenv.load!

require 'webdrivers/chromedriver'
require 'watir'
```

Now, from the command line we can run `bundle exec ruby declare.rb` and watch the forms get filled out for us automatically!

If you don't want to watch them, you can change `headless` to `true` in `#get_sign_in_page` and it will run in the background.

You can find the code for this application on [GitHub](https://github.com/bencgreenberg/school-health-declaration-automation).

Happy automating!