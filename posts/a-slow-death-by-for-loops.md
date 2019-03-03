---
title: A Slow Death by For Loops
date: 2018-06-25
writtenBy: Ben Greenberg
imageUrl: 
crossPost: https://dev.to/benhayehudi/a-slow-death-by-for-loops-1004
id: 2
---

This week I was tasked with building a web application for work in PHP that would take in multiple data inputs, connect them all into one multi-dimensional associative array, do some mathematical calculations and then output to the user a CSV file with the results. 

The data in those different data sources, as is often the case, did not come in perfect shape. Prior to even connecting the pieces together, the data needed to be checked for errors and cleaned up. Some data needed to be trimmed of extraneous characters. Some data needed to be filtered for non-numeric values. While some other data needed to be checked for duplicates. 

Then, once the data was cleaned, the data inputs needed to be compared to each other for records to join together. One data source held some information for a row of information, another data source held more information, another data source yet held more and, finally, the fourth data source held the last bit of information to make a complete record.

As you can imagine, this sort of application involves a lot of iterating. Iterating over the data to clean it up. Iterating over the data to compare it, iterating within the comparison to check for further equality comparisons and applying transformations and more. 

Nowadays, space is cheap but time is still expensive. These sort of iterations can be very time expensive. Anyone who has ever worked with PHP knows the feeling of testing your application and coming across the dreaded `Fatal Error: Maximum execution time exceeded` error. 

Until you actually encounter a problem involving time complexity, the notion of Big O can seem abstract. However, just spending a few minutes trying to optimize your code to make it faster, can make you very quickly appreciate how foundational it is. 

For example, take a look at the following:

```php
for ($i = 0; $i < count($foo); $i++) {
    for ($x = 0; $x < $count($foo_two); $x++) {
       // do something...
    }
}
```

This is an incredibly common example when comparing two arrays of data. You want to loop over one while you are also looping over the other. What is the cost of this? If each for loop is O(n), then a nested for loop inside of a for loop would be O(n)^2. The *n* representing the time it would take to find the value at the very end of the data set, so each for loop doubles the time complexity in your operation. That can add up really quickly and come at quite a cost to your application's performance. 

What do you do when looping over the data is a necessity? How can you optimize it?

Let's look at a few tips, especially suited for PHP, to increase our efficiency.

## Preset your total

We all know the classic for loop expression seen in every language: `for ($i = 0; $i < count($array); $i++)`. The second part of that expression where we evaluate whether `$i` is still less than the length of the array each time we loop through is costly. Every time we loop through, our code has to recount how big our array is. What if we defined the length in advance?

```php
$length = count($array);
for ($i = 0; $i < $length; $i++) {
    // do something
}
```

Now, with our `$length` variable holding the size of the array, we do not make our application to check the length each time it loops. According to [one benchmark](http://www.phpbench.com/), using a pre-calculated variable instead of forcing the count each loop can be 94% faster. That can quickly add up. 

## Single Quote vs Double Quote

The time difference between using single quotes and double quotes is less noticeable than it used to be. Nonetheless, it is still good practice, in my opinion, to use single quotes for plain strings of text. Why is that? Every time you use double quotes PHP checks to see if there is any code that needs to be evaluated inside the quotation. So, if you are comparing an object in an array referencing its value by key using `$array['key']` tells the code that `key` is just a string of text, while using `$array["key"]` makes it check to see if `key` is in reference to anything other than just a string of text. 

## What Are You Doing Inside That For Loop?

What are you asking your program to do every time it loops through? Traversing through your data costs time just by itself. Now, factor in the cost of whatever you want to do to that data, and you can just keep on adding to the time complexity of your application. Some operations are more expensive than others. Of course, sometimes, you have no choice but to perform a costly operation inside the for loop, but if you can avoid it, your code will be all the more efficient.

An example of a common operation that can increase the time complexity quickly is string concatenation. This is an often overlooked part of your program. After all, what you are doing is just putting some text together. But, add that concatenation up by the number of times you are looping, and it can easily worsen your performance. 

What might be a more performant alternative to concatenating in the moment of the for loop? How about adding your text to an array and, when you need to output the text, imploding the array? Adding plain text values to an array can be faster than concatenating text in the midst of traversing your data. Another possibility, if it meets your requirements, is simply to just `echo` the text immediately without concatenation. Of course, that is not always a possibility depending on what you need your application to do.

In the end, applying these principles to the application I was tasked with creating, along with some other principles, helped achieve a significant performance boost. Giving thought to time complexity as an integral part of the development process can save a lot of pain later on when needing to refactor existing code that is just not making the time cut. 

Big O is not just for whiteboard interviews, but rather, an appreciation for it out in the field, can make more efficient code, which makes happier users, and by extension, happier developers.