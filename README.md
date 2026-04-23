# fontawesome-icon-viewer

`whats it?`
- A simple, offline-first tool to browse and copy FontAwesome icons. Built for situations where the internet is completely cut off and developers cannot access any online CDNs or web libraries.

---

## Why this project exists?

During a complete internet shutdown in Iran, access to all essential web development resources — including FontAwesome CDN, Google Fonts, Bootstrap CDN, and other free libraries — was fully blocked.

This makes it impossible for developers to work, and as a result, countless online businesses and services are being destroyed.

I program this project to help Iranian developers and people, even in a small way, to regain access to something that is their basic right.

More open source projects will be shared soon.

Be the voice of the Iranian people.

---

## Features

- Browse all available FontAwesome icons (`Regular` & `Solid`)
- Search icons by name (e.g., `user`, `heart`, `trash`)
- so you can, One-click copy icon class name to clipboard
- Fully offline – works without any internet connection
- Lightweight and fast

---

## How to use

1. Place the project inside your local web server (e.g., XAMPP, WAMP, Laragon, or any PHP-supported server)
2. Make sure the following files exist in `assets/css/`:
   - `fontawesome.min.css`
   - `solid.min.css`
   - `regular.min.css`
   - `brands.min.css`
   - `webfonts\` folder
3. Open the project in your browser
4. Browse or search for icons
5. Click on any icon to copy its class name

---

## Requirements

- PHP (only for parsing the CSS file and extracting icon names)
- A web server (Apache / Nginx / built-in PHP server)

---

## Project structure

fontawesome-icon-viewer/
├── index.php
├── .gitignore
├── README.md
├── assets/
│ ├── chash/
│ │ └── fontawesime-icons.json
│ ├── css/
│ │ ├── fontawesome.min.css
│ │ ├── solid.min.css
│ │ ├── regular.min.css
│ │ ├── brands.min.css
│ │ └── styles.css          
│ └── js/
│ │ ├── brand.js
│ │ ├── fontawesome.js
│ │ ├── fontawesome.min.js
│ │ ├── brands.min.css
│ │ └── regular.js
│ │ └── solid.js 
│ │ └── main.js     #main script
│ ├── webfonts/
│ │ ├── fa-brands-400.woff2
│ │ ├── fa-brands-400.ttf
│ │ ├── fa-light-300.woff2
│ │ ├── fa-light-300.woff2
│ │ ├── fa-regular-400.ttf
│ │ ├── fa-regular-400.ttf
│ │ ├── fa-solid-900.ttf
│ │ ├── fa-solid-900.ttf
│ │ ├── fa-v4compatibility.ttf
└─└─└── fa-v4compatibility.ttf
     

---

## License

MIT – `Free for everyone. in the name of Iranian`

---

## Author

Built with determination during a full internet shutdown in Iran.

> Be the voice of the Iranian people.

We said `MIGA`
Viva `Shah`
