---
title: "SQL Server Reporting Services: Lessons Learned from the Trenches"
date: 2018-06-03
writtenBy: Ben Greenberg
imageUrl: 
crossPost: https://dev.to/benhayehudi/sql-server-reporting-services-lessons-learned-from-the-trenches-1p0d
id: 1
---

Two months ago I had not even heard of SQL Server Reporting Services (SSRS) and my most involved experience with SQL was manipulating a database using ActiveRecord in Rails. However, for the past nearly two months I have worked full time on both optimizing existing SSRS reports and creating new SSRS reports for a financial services company. This has definitely been a learning experience one that has me interacting deeply with SQL in ways I did not think I would be doing previously. 

What are some of the key lessons I have learned that I wish had known from day one?

## Know Your Database

This is perhaps the most essential point and is absolutely essential. Before getting your hands dirty in any reporting spend some serious time in the database. Get to know your data. Become good friends with your data. Take your data out on a few dates. 

What relationship do the tables have with each other? Identify the foreign keys in each table and all the myriad ways an item in the database is connected. A good way to do this is to pick a few random rows from a table and trace its path through the database. If it is a sales table, how does the record of the sale connect to the customer, sales person, company, etc.?

What kinds of data do you have in your database? Does the column type match with what kind of data is being stored in it? This is an often overlooked aspect, but if you are working with a legacy database do not assume anything. Furthermore, if you see a discrepancy in the type of data being stored (e.g. dates in a varchar column) investigate why that was done. Most likely it was an oversight, but there is always the possibility that there was a reason for it. Perhaps the reason is faulty, perhaps it no longer applies, but nonetheless, it is good to investigate.

## Build Your Queries With Intention

SQL Server Management Studio is a great tool to build your SQL queries. The user interface is relatively easy to navigate and there is some good diagnostic information built right in. Pay attention to how long your query takes to execute. Is it taking more than a few seconds? Why is that? Are you unnecessarily using "expensive" SQL operations? 

It is really important to get your SQL query as performant as possible before building a report on top of it with SSRS because SSRS will add additional time for processing and rendering your report. From a business perspective, every second that an end user needs to wait for a report to load and stares at that dreaded "Loading" display is bad news for you as the developer. The execution log for a report is actually saved in the report server's database and you can view how long it took for the report to render broken down for the query, the processing and the render. This will be very helpful when it comes time to optimize your report, which you will inevitably need to do.

When running the queries you are building in SQL Server Management Studio, a helpful option to turn on is the ability to see the execution plan for that query. You will be presented with the path your query took to execute along with the time for each point along with some key diagnostic information, like if a table is not indexed. Using the information provided in the execution plan I was able to reduce a query's execution time from around 30 seconds to 1 second.

## SSRS Is Expensive

No, I do not mean it is expensive in terms of money. SSRS is expensive in terms of time. There are so many helpful features available to build your report. You may be tempted to use all of them. Take my battle scars as a warning not to. Treat them as valuable commodities that you want to use sparingly and only when necessary. Even items that seem quite basic like the option to "keep items on one page when possible" for a table in your report can end up expending precious time in processing and cause your user to send you an email asking why the report is taking so long.

However, unless you are returning tens (maybe hundreds?) of thousands of records, there are some features that, when used carefully and sparingly, can really save you some effort in developing a report. But, just to repeat myself again, try and let the data you bring back from your query be as formatted as you possibly can get it, and minimize that sort of work from SSRS. Some examples of SSRS features that have proven useful, either for the data or for the aesthetic: alternating row colors in a table, sorting by a user defined parameter, the ability to click through an item to either another report (i.e. like a detailed sub-report from a summary report) or to an external URL and providing default text for columns that have no data in a row.

## Be Careful With Your Datasets

In a recent report, I was asked to create multiple data presentations for multiple nuanced relationships between the data. My first thought was to create multiple datasets, one for each type of relationship with the data. This however proved very challenging. It is very hard and requires a lot of workarounds to get fields from multiple datasets to appear in the same table. Furthermore, each dataset's query must be executed before SSRS begins to process and render the data and all the formatting you applied to the report. The more queries, the more time a user looks at that "Loading" display for their report. 

Eventually, I figured out a way to make one query that got all the data I needed and I reduced my datasets to one. Yet, I forgot to delete the old datasets! It took me a good thirty minutes or so (although it felt much longer) until I realized that those old dataset queries were being run each time I ran the report. The lesson from the story: Tread carefully with your datasets. 

## User Parameters

Users love the ability to customize their reports for their needs. Additionally, as a developer, why build 8 reports for the 8 different lines of business when you can just create 1 report and let the user pick which business line to run it for? Yet, as great as parameters can be, they are also a real complication. 

Want to set the report to run overnight and cache the data so when users open it in the morning, it renders instantaneously? That's pretty hard to do if users get to pick a date range each time they open the report. Are you going to cache data for every day of the week? The month? The year? What about if they can pick a date range, a service line of the business, a type of employee or specific employees and more? The more parameters the user can choose the more variations of the report there can be.

One item that has really worked to speed up reports for me, is assigning the value of a parameter to a variable declared in the dataset's query and using that variable in the query and not the value of the parameter itself. I am honestly not sure why that makes things faster, but it clearly has for each report I have worked on.

In addition, to all of the above, spending time in the wonderful world of SQL sans an ORM library makes you appreciate and understand so much more what is happening behind the scenes the next time you build a method with ActiveRecord, Doctrine, SQLAlchemy, etc. If you are, like I was, approaching SSRS for the first time, I hope these pointers were helpful in your learning.
