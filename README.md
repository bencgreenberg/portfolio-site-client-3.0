# Portfolio Site on Jekyll

This is a portfolio site built on Jekyll and a modified version of the [Freelancer Jekyll Theme](https://github.com/jeromelachaud/freelancer-theme).

* [Installation and Usage](#installation-and-usage)
    * [Automated Blog Post Importing](#automated-blog-post-importing)
* [License](#license)

## Installation and Usage

To use this site for your own portfolio, follow these steps:

1. Clone the repository to your local machine
2. Run `bundle install` to install the dependencies
3. Edit the various content files to suit your needs
4. Run `jekyll serve` to boot up a server and serve your site on `localhost:4000`

### Automated Blog Post Importing

This portfolio site uses a [GitHub Action](https://github.com/benhayehudi/dev-posts-to-jekyll-markdown-action) to automatically import new [DEV](https://dev.to) blog posts, import them into the `_posts` folder and create a pull request with them. 

You can find installation and usage instructions for that Action in its [README](https://github.com/benhayehudi/dev-posts-to-jekyll-markdown-action/blob/master/README.md).

## License

This project's License is available [here](lICENSE).