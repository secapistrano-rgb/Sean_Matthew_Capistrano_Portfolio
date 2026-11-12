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
- A nine-step sample-data Lost & Found walkthrough following Appendix F of the project’s User’s Guide: student sign-in, dashboard, reporting, matches, ownership evidence, staff sign-in, item management, claim review, and collection.
- Reporting simulates photo selection and location detection, with editable descriptions and a report date. Students submit ownership evidence in the app before staff review it on CSPC Web. The complete screen browser also provides separate web and app galleries.
- A complete screen browser with 12 web previews (including the item quick-preview and email logs) and all 12 app previews, captions, direct screen selection, and previous/next navigation.
- “Behind the build” stories for each project, covering an engineering challenge, its solution, and a lesson.
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
  walkthrough.js   Browser-only sample scenario and workflow state
  walkthrough-gallery.js  Full screen browser and navigation
  walkthrough-catalog.js  Screen titles, captions, and asset paths
  assets/          Project screenshots, portrait, and resume
    tech/          Technology icons and attribution
    walkthrough/   Fictional admin previews and source notes
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
- Edit `buildStories` in `public/script.js` to update each project’s challenge, solution, and lesson. Keep these grounded in the project’s actual implementation.
- Update the walkthrough markup in `public/index.html` and its state transitions in `public/walkthrough.js` together. The demo uses fictional records, fixed match scores, and in-memory state; it does not connect to the CSPC backend.
- Adjust the CSS variables in `public/styles.css` to change theme colors and fonts.
- Replace images in `public/assets/` and update their references as needed.
- Replace `public/assets/sean-matthew-capistrano-resume.pdf` to update the downloadable resume.

## Checks

```bash
node --check server.js
node --check public/script.js
node --input-type=module --check < public/walkthrough.js
node --input-type=module --check < public/walkthrough-gallery.js
node --input-type=module --check < public/walkthrough-catalog.js
git diff --check
```

These commands check JavaScript syntax and whitespace. Preview the site in a browser to review layouts, animations, and interactions.

## Asset attribution

Technology icon sources and licensing details are recorded in [`public/assets/tech/SOURCES.md`](public/assets/tech/SOURCES.md) and [`DEVICON-LICENSE`](public/assets/tech/DEVICON-LICENSE).

Walkthrough screenshot origins and the distinction between interface previews and the interactive simulation are documented in [`public/assets/walkthrough/SOURCES.md`](public/assets/walkthrough/SOURCES.md).

## Contact

- [GitHub](https://github.com/secapistrano-rgb)
- [LinkedIn](https://www.linkedin.com/in/sean-matthew-capistrano-2787b2410/)
- [Email](mailto:seanmatthewcapistrano@gmail.com)
