---
title: Test Driven Discovery - Finding Out What Code Does By Writing Tests
date: 2019-01-15
writtenBy: Ben Greenberg
imageUrl: https://i.giphy.com/media/3orieUe6ejxSFxYCXe/giphy.gif
crossPost: https://dev.to/benhayehudi/test-driven-discovery-finding-out-what-code-does-by-writing-tests-3imk
id: 11
---

You have been assigned to a new codebase and you are trying to figure out what each method does. Some of them are more simple than others and their purpose can be figured out through a quick read of the actual code. Other methods, meanwhile, are much complicated and have more interconnected dependencies in the application, which makes understanding their purpose more challenging. 

When encountering code that is new to you, one of the best ways to understand it is to write tests for it. Test Driven Development (TDD) assumes tests written before the writing of the code, letting the developer determine behavior first before programming it. In the scenario we are discussing, what we are concerned with is what we might call **Test Driven Discovery (TDDo)**, where we are engaged in some detective work and we are using tests to do our investigation.

![](https://media.giphy.com/media/3orieUe6ejxSFxYCXe/giphy.gif)

Let's take a look at an example. The following is the code for a [markdown filter](https://github.com/Nexmo/nexmo-developer/blob/master/app/filters/label_filter.rb).

You can find all the code at Nexmo Developer:

[https://github.com/Nexmo/nexmo-developer](https://github.com/Nexmo/nexmo-developer)

```ruby
class LabelFilter < Banzai::Filter
  def call(input)
    input.gsub(/\[([a-zA-Z0-9\s:\-\.]+)\]/) do |_s|
      "<span class='Vlt-badge #{class_name($1)}'>#{$1}</span> "
    end
  end

  private

  def class_name(text)
    case text
    when 'POST'
      'Vlt-badge--green'
    when 'GET'
      'Vlt-badge--blue'
    when 'DELETE'
      'Vlt-badge--red'
    when 'PUT'
      'Vlt-badge--yellow'
    end
  end
end

``` 

We know a few things about this code right from the start: 

* It defines a class called `LabelFilter`
* The class has one method named `call` that takes in a single argument
* The `call` method uses regex to find and replace a string with an HTML `span` tag that has a variable class name depending on the input provided to the method
* There is a private method called `class_name` that takes in a single argument and consists of a case statement that outputs text depending on the input text.

Yet, despite knowing all this, we know very little about the actual behavior of this code. What does it actually do? 

How do we find out? Let's build some tests!

We will use our tests to see exactly what happens to the text we provide. First, what does the `call` method do to a random string of text that it's provided?

```ruby
require 'rails_helper'

RSpec.describe LabelFilter do 
  it 'does something with some text' do
    input = "some text"
    
    puts described_class.call(input) 
  end
end
```

What result do we get when we run RSpec?

```ruby
some text
```

We see that if the input is any random text, the resulting output will be exactly that same text not touched or transformed in any way. Let's go ahead and change the way we word our first test accordingly:

```ruby
it 'does not transform a random string' do
  input = "some text"

  expected_output = "some text"

  expect(described_class.call(input)).to eq(expected_output)
end
```

When we run RSpec at this point our test will pass. It is important to remember that we are writing tests to discover the behavior of existing code, not to describe the behavior of future code. These tests are our Sherlock. We have now discovered that a random string of text does not get modified by the `LabelFilter`.

![](https://media.giphy.com/media/RaLIOPl8MLyWA/giphy.gif)

What about text that matches the regex? A great tool to break down Ruby regex is [Rubular ](http://rubular.com/). If we copy and paste the expression from our code into Rubular we see that an alphanumeric string within brackets will make a match.

What happens if we change our input to match that regex?

Let's add another test:

```ruby
it 'does something with a string inside brackets' do
  input = "[some text]"

  puts described_class.call(input)
end
```

We get back the following when we run RSpec:

```html
<span class='Vlt-badge '>some text</span>
```

Why is that? If we look at the private method `class_name` we see that the user input is being passed to this method and evaluated in the case statement. There are cases for four possibilities, but what we provided is not one of those. Thus, what gets returned is the first part of the `span` because that is explicitly spelled out: `<span class='Vlt-badge ...`, but the second half is dependent on that case statement and since our text didn't make a match there, we get back whitespace: `<span class='Vlt-badge '>`.

We can modify our test now to expect that behavior from the code as it is currently written:

```ruby
it 'returns an HTML span tag when provided with random text inside brackets' do
  input = "[some text]"

  expected_output = "<span class='Vlt-badge '>some text</span> "

  expect(described_class.call(input)).to eq(expected_output)
end
```

What about when we provide text that matches the regex?

```ruby
it 'does something with "[POST]" input' do
  input = "[POST]"

  puts described_class.call(input)
end
```

This returns:
```html
<span class='Vlt-badge Vlt-badge--green'>POST</span> 
```

We see that it returns the word "POST" inside a `<span>` tag that has been given the class names "Vlt-badge Vlt-badge--green". This matches what we would expect when reading the `class_name` private method.

What about when we don't provide the brackets but do provide a matching word? This gives us back just the word unaltered by the method. 

Now that we know these two things we have two more tests:

```ruby
it 'does not transform a matching string if it is not inside brackets' do
  input = "POST"

  expected_output = "POST"

  expect(described_class.call(input)).to eq(expected_output)
end

it 'returns a green HTML class when string "[POST]" is provided and puts "POST" in between <span> tags stripped of brackets' do
  input = "[POST]"

  expected_output = "<span class='Vlt-badge Vlt-badge--green'>POST</span> "

  expect(described_class.call(input)).to eq(expected_output)
end
```

At this point we have a pretty good idea about **what** this code actually does. Now we want to make sure we cover the rest of the cases with tests to confirm our assumptions:

```ruby
it 'converts [POST] to a green label' do
  input = "[POST]"

  expected_output = "<span class='Vlt-badge Vlt-badge--green'>POST</span>"

  expect(described_class.call(input)).to eq(expected_output)
end

it 'converts [GET] to a blue label' do
  input = "[GET]"

  expected_output = "<span class='Vlt-badge Vlt-badge--blue'>GET</span>"

  expect(described_class.call(input)).to eq(expected_output)
end

it 'converts [DELETE] to a red label' do
  input = "[DELETE]"

  expected_output = "<span class='Vlt-badge Vlt-badge--red'>DELETE</span>"

  expect(described_class.call(input)).to eq(expected_output)
end

it 'converts [PUT] to a yellow label' do
  input = "[PUT]"

  expected_output = "<span class='Vlt-badge Vlt-badge--yellow'>PUT</span>"

  expect(described_class.call(input)).to eq(expected_output)
end
```

When we run these tests we see that they all pass. Our Test Driven Discovery method has yielded to us a lot of information about this code. We went from having a basic outline of the code structure to getting a much clearer picture as to the behavior of the code itself. There is still some more tests we can build to explore the edges of the behavioral expectations. For example, what happens if a user input the correct string, inside brackets, but it is lowercase or it is capitalized?

```ruby
it 'does something with "[post]"' do
  input = '[post]'

  puts described_class.call(input)
end
```

The result? We get: `<span class='Vlt-badge '>post</span>`. This does not appear to be a desired result. When we are building tests to discover the behavior of code, what do we do when we encounter undesired behavior? Do we modify the behavior to conform to what we think the code should do as a result of our investigation?

My recommendation is to log this behavior and raise it as an issue to be reviewed. Perhaps there is a reason why the behavior is as such and you did not consider it? If not, then the edge case can be addressed, but at this point, our goal is to discover the existing behavior, not to simultaneously modify it while we are describing it. Thus, we can write this test as follows:

```ruby
# possible undesired behavior, to be discussed
it 'returns a non-color HTML span tag with  "post" in between the tags when "[post]" is provided' do 
  input = "[post]"

  expected_output = "<span class='Vlt-badge '>post</span> "

  expect(described_class.call(input)).to eq(expected_output)
end
```

Once we have worked our way through this process we can take off our detective hats and take a look at what we accomplished. We went from knowing nothing about this existing code to now understanding what it does, what it does not do and, perhaps, finding an area to address later. And, if that was not enough, not only did we expand our comprehension of this code, we also expanded our test coverage! 

Test Driven Discovery lets us walk our way through code we are unfamiliar with and come out with a deeper understanding. Next time you are faced with existing code you are trying to wrap your head around, why not give it a shot?

If you are interested, check out the [pull request](https://github.com/Nexmo/nexmo-developer/pull/1329) for these tests.
