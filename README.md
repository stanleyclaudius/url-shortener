<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/stanleyclaudius/url-shortener">
    <img src="client/public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">URL Shortener Application</h3>

  <p align="center">
    An awesome URL Shortener application based on website
    <br />
    <a href="https://github.com/stanleyclaudius/url-shortener.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://url-shortify.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/stanleyclaudius/url-shortener/issues">Report Bug</a>
    ·
    <a href="https://github.com/stanleyclaudius/url-shortener/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

**URL Shortener Application** is a web application that allow their user to shorten a URL based on the original one. The shorter URL can be customize as well by user. If the shorter URL is not provided, then the system will automatically generate a random short URL for their user. This application also came with basic authentication features as well, such as login, register, and logout.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [Typescript](https://www.typescriptlang.org/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org)
* [Express.js](http://expressjs.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Vercel](https://vercel.com)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have package manager (either npm or yarn)

>**FYI**: This project uses **yarn** as package manager, but you're free to use **npm** too.

* Install Yarn (Only for user who want to use **yarn**)
  ```
  npm i -g yarn
  ```

### Installation

Below steps will guide you through the local installation process of this application

1. Clone the repo
   ```
   git clone https://github.com/stanleyclaudius/url-shortener.git
   ```
2. Install project dependency<br />
Make sure that your terminal pointing at the root directory of this project (url-shortener folder). And you can open up 2 terminal to run below commands:
   ```
   cd client && yarn install
   ```
   ```
   cd server && yarn install
   ```
3. Complete the .env variable<br/>
Rename .env.example file at ```server``` directory become ```.env```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What To Fill | Example Value |
    | :---: | :---: | :---: |
    | PORT | Your server port | 5000
    | DB_NAME | Your database name | url_shortify
    | DB_USER | Your PostgreSQL username | postgres
    | DB_PASS | Your PostgreSQL password | root
    | CLIENT_URL | Your client side URL | http://localhost:3000 |
    | ACCESS_TOKEN_SECRET | Random complex string for JWT | DUhxdx183)_--aACN#2%
    | REFRESH_TOKEN_SECRET | Random complex string for JWT | 17hdjcD7ud(-*&732~
4. Create a database with name corresponding to your ```DB_NAME``` value at .env file
5. Change directory to client folder, and look for ```fetchData.ts``` file at ```client/src/utils/``` folder, then change ```axios.defaults.baseURL``` to your server url (e.g. http://localhost:5000)
6. Lastly, spin off the application by running 2 terminal at the same time, with commands such as below:
    ```
    cd client && yarn start
    ```
    ```
    cd server && yarn dev
    ```

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanley-claudius-4560b21b7)

Project Link: [https://github.com/stanleyclaudius/url-shortener](https://github.com/stanleyclaudius/url-shortener)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [React Icons](https://react-icons.github.io/react-icons/) for providing icon to be used in this application.
* [Tailwind CSS](https://tailwindcss.com/) for providing CSS framework to be used in this application.
* [Vercel](https://vercel.com) for providing frontend hosting service for this application.
* [Heroku](https://herokuapp.com/) for providing backend hosting service for this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/stanleyclaudius/url-shortener.svg?style=for-the-badge
[forks-url]: https://github.com/stanleyclaudius/url-shortener/network/members
[stars-shield]: https://img.shields.io/github/stars/stanleyclaudius/url-shortener.svg?style=for-the-badge
[stars-url]: https://github.com/stanleyclaudius/url-shortener/stargazers
[issues-shield]: https://img.shields.io/github/issues/stanleyclaudius/url-shortener.svg?style=for-the-badge
[issues-url]: https://github.com/stanleyclaudius/url-shortener/issues
[license-shield]: https://img.shields.io/github/license/stanleyclaudius/url-shortener.svg?style=for-the-badge
[license-url]: https://github.com/stanleyclaudius/url-shortener/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanley-claudius-4560b21b7