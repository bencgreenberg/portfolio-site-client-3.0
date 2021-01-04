---
layout: post
modal-id: 3
date: 2020-07-12
cover: https://dev-to-uploads.s3.amazonaws.com/i/9ypnjtzia26m35ala0fo.png
alt: Cover Image
title: Add Right to Left Text to GitHub Markdown
link: https://dev.to/bengreenberg/add-right-to-left-text-to-your-github-profile-readme-5c89
featured: true
author: ben
categories: blog
---

Just a few days ago GitHub introduced a great new feature available for your profile. You are now able to add a README to your profile, which shows up on your homepage.

The new README lets you add a lot more customization to your profile, and share with visitors more information about yourself. It is a good way to contextualize the activity chart, the pinned repositories and other already available information points on the profile.

The possibilities for what you can do with it are seemingly endless! Just check out some of these other posts on DEV on what people have done:

* [3 Ways to Spice up Your GitHub Profile README](https://dev.to/jayehernandez/3-ways-to-spice-up-your-github-profile-readme-1276)
* [Dynamically Generated GitHub Stats for Your Profile README](https://dev.to/anuraghazra/dynamically-generated-github-stats-for-your-profile-readme-o4g)
* [How To Add An Awesome README to your GitHub Profile](https://dev.to/satvikchachra/how-to-add-an-awesome-readme-to-your-github-profile-361n)

In addition to all these awesome ideas, you can also share with folks that you speak more than one language. Knowing another language is a great asset to highlight. 

What if your second (or third, fourth, etc.) language is not written left to right? How do you add Arabic, Hebrew, Farsi, Urdu and other languages to your GitHub README profile?

If you are a speaker of one of those languages, you are well aware that internationalization is often a second-class citizen in web development. Text editors, input boxes and more often do not consider the needs of languages not written in Latin characters or in a different direction. This can cause all sorts of issues, with misplaced punctuation marks being the most common.

GitHub uses a [specialized implementation of markdown](https://github.github.com/gfm/) that it will render on documentation. This means that not all HTML tags will render in a GitHub README.

In that case, what is a relatively straightforward way to add RTL recognition in your new GitHub profile README?

There is a special [right to left embedded unicode character](https://www.w3.org/International/questions/qa-bidi-unicode-controls) that you can add to the beginning of each right to left sentence:

```
&#x202b;
```

This lets the interpreter know that what follows it show be rendered from right to left.

Take this one line text from my [GitHub profile README](https://github.com/benhayehudi) as an example:

```
&#x202b; אהלן! 👋
```

Without being enclosed in the code snippet markdown of the triple back-ticks, it renders with the exclamation point in the correct place:

&#x202b; אהלן! 👋

There are other methods to add right to left text support to your markdown documentation, including your new GitHub profile README. This way, though, is a quick and easy way to add some RTL text with just the addition of one unicode character.

In the long term, we can all advocate for websites such as GitHub and others to make internationalization a higher priority.

