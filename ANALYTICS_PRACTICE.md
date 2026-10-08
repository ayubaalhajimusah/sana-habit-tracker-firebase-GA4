# Firebase + GA4 Hands-On Practice

No implementation code is given here on purpose. Use the official docs (Firebase "Get started with Google Analytics for Web", GA4 Help, DebugView docs). Hints are marked 💡.

## LEVEL 1 — Firebase Setup
1. Create a Firebase project (enable Google Analytics when asked).
2. Register a **web app** in the project.
3. Find the web app config object in Project settings.
4. Install the Firebase SDK with npm.
5. Decide where the config should live. 💡 Think about `.env` files, Vite's env-variable rules, and `.gitignore`.
6. Initialize the Firebase app in a new file and confirm `npm run dev` still works with no console errors.

## LEVEL 2 — GA4 Setup
1. Find the GA4 property linked to your Firebase project.
2. Find the web data stream and its Measurement ID. Check that the ID is in your Firebase config.
3. Write, in your own words, how these relate: Firebase project, Google Analytics account, GA4 property, web app, data stream, Measurement ID.
4. Initialize Analytics in your code. 💡 Is Analytics supported in every browser context? Find out how to check.

## LEVEL 3 — First Event: `habit_completed`
Send one event when a habit is completed. Decide:
- the event name and why (naming rules, recommended vs custom events)
- which function in `App.jsx` is the right place to fire it
- how to avoid firing on **Undo**, and avoid double firing (💡 React StrictMode, re-renders, state updaters)
- how to test it: enable DebugView and find the event there
- what you expect to see before you click

## LEVEL 4 — Event Parameters
Add parameters to `habit_completed` such as `habit_name`, `category`, `frequency`.
- Why do parameters matter for analysis?
- Which are low-cardinality and good for reporting?
- 💡 Parameters do not appear in standard reports until registered as custom dimensions. Find where to do that, and note how long it takes.

## LEVEL 5 — More Events
Implement and verify each in DebugView: `habit_created`, `habit_deleted`, `habit_search`, `category_filter`, `progress_viewed`, `theme_changed`.
Questions to answer first:
- Search fires on every keystroke: what would that do to your data? How could you avoid it?
- What parameters (if any) does each event need? Is any value personal or sensitive?
- Is a page/screen view needed too? This app has no router. How will you report navigation?

## LEVEL 6 — Key Events
1. List which events show the product is valuable to users.
2. Pick one (candidate: `habit_completed`) and mark it as a key event in GA4.
3. Write down: event vs key event, why `habit_deleted` or theme changes would be poor choices, and one vanity metric versus one meaningful metric for this app.

## LEVEL 7 — Reporting
Answer using GA4 (Realtime, Reports, Explorations):
1. How many users used the app?
2. Which category gets the most engagement?
3. How many users completed a habit?
4. Which event is most frequent?
5. How many users visited Progress?
6. What percentage of users completed at least one habit?
7. What is the most popular habit?
8. Do users search?
9. Do users return?
10. Which feature seems most engaging?
💡 Some questions need registered custom dimensions or an Exploration.

## LEVEL 8 — Debugging Checklist
Investigate, don't just fix. For each, write down what you checked and what you found:
- events don't appear
- DebugView is empty
- users appear but events don't
- events appear twice
- parameters aren't visible
- Realtime differs from reports
- reports are delayed
💡 Ideas: browser network tab, ad blockers, wrong Measurement ID, debug mode, consent, data filters, processing latency.

## LEVEL 9 — Mini Analytics Project
You are the product analyst. The product team asks: **are users actually engaging with habit completion?**
Generate varied usage yourself (different browsers, devices, categories), then investigate users, sessions, engagement, `habit_completed` events, categories, user journeys and key events.
Write a short analysis with:
1. **Finding**
2. **Evidence**
3. **Interpretation**
4. **Recommendation**
