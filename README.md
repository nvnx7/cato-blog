<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="./content/assets/cato-logo.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Cato Blog
</h1>

Blog site for [Cato.tv](https://cato.tv), built with Gatsby from [this](https://github.com/gatsbyjs/gatsby-starter-blog) starter template.

## 🚀 Quick start

1.  **Clone the repo.**

    Use git cli to clone this repo.

    ```shell
    # create a new Gatsby site using the blog starter
    git clone https://github.com/theNvN/cato-blog.git
    ```

2.  **Install dependencies.**

    Install all required packages listed in `package.json`.

    ```shell
    cd cato-blog/
    npm install
    ```

3.  **Start developing.**

    Navigate into site’s directory and start it up using gatsby cli.

    ```shell
    cd cato-blog/
    gatsby develop
    ```

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── tsconfig.json
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

## 🟠 NOTE

There isn't any `index.tsx` page in `./src/pages/` directory. Almost always this page is intended to be displayed at root path (`/`), as home page. Instead page at root path is generated using the template - `./src/templates/blog-list-page.tsx`. This was done to display paginated list of blogs, so page at root will display first page (first paginated list of blogs) and subsequent pages will be displayed at paths `/2`, `/3`, `/4` and so on.
