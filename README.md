# Sean Matthew Capistrano — Portfolio

A personal portfolio showcasing Sean Matthew C. Capistrano’s full-stack development projects, technical skills, education, and IT support experience.

Built with HTML, CSS, vanilla JavaScript, and an Express server.

## Features

- Responsive layouts with a mobile navigation menu.
- Light and dark themes with saved preferences.
- A skippable welcome animation, scroll reveals, and typing headlines.
- An animated hanging ID card with cursor-follow effects.
- A continuously scrolling technology marquee.
- Project detail dialogs with features, contributions, timelines, and technology logos.
- Education, certifications, work experience, and technical skills.
- A downloadable PDF resume and contact links.
- Keyboard focus indicators and reduced-motion support.

## Run locally

Install Node.js and npm, then run:

```bash
git clone https://github.com/secapistrano-rgb/Sean_Matthew_Capistrano_Portfolio.git
cd Sean_Matthew_Capistrano_Portfolio
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

To use a different port on macOS or Linux:

```bash
PORT=3001 npm start
```

The portfolio serves static content; no database setup is required.

## Project structure

```text
public/
  index.html       Page content and layout
  styles.css       Themes, responsive styling, and animations
  script.js        Navigation, project dialogs, and interactions
  assets/          Project screenshots, portrait, and resume
    tech/          Technology icons and attribution
server.js          Express server and static file handling
package.json       Dependencies and start command
package-lock.json  Locked dependency versions
```

## Featured work

| Project | Overview |
| --- | --- |
| CSPC Lost & Found Admin | Web management experience for lost-item reporting, tracking, and AI-assisted matching. |
| Job Operations | A centralized web application for task scheduling, records, and workflow automation. |
| Lost & Found App | The student-facing React Native component of the CSPC Lost & Found capstone. |
| Personal Portfolio Website | This responsive website, featuring project case studies, theme switching, animated interactions, and a downloadable resume. |

## Customize

- Edit `public/index.html` to update the introduction, project cards, skills, experience, and contact information.
- Edit `projectDetails` in `public/script.js` to update the project dialog descriptions, technology stacks, and contributions.
- Adjust the CSS variables in `public/styles.css` to change theme colors and fonts.
- Replace images in `public/assets/` and update their references as needed.
- Replace `public/assets/sean-matthew-capistrano-resume.pdf` to update the downloadable resume.

## Checks

```bash
node --check server.js
node --check public/script.js
git diff --check
```

These commands check JavaScript syntax and whitespace. Preview the site in a browser to review layouts, animations, and interactions.

## Asset attribution

Technology icon sources and licensing details are recorded in [`public/assets/tech/SOURCES.md`](public/assets/tech/SOURCES.md) and [`DEVICON-LICENSE`](public/assets/tech/DEVICON-LICENSE).

## Contact

- [GitHub](https://github.com/secapistrano-rgb)
- [LinkedIn](https://www.linkedin.com/in/sean-matthew-capistrano-2787b2410/)
- [Email](mailto:seanmatthewcapistrano@gmail.com)
