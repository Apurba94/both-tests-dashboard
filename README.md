# GRE and TOEFL Dashboard

One page that brings together your study time, accuracy, streaks and weak areas from every app.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE and TOEFL and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `GRE and TOEFL Dashboard.exe` from the [latest release](https://github.com/Apurba94/both-tests-dashboard/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/both-tests-dashboard/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

One page for everything you have practised in the suite: sessions, answers, accuracy, minutes and mistakes for the GRE and the TOEFL, your streak across both, and the weakest topics in each, with the apps you have used most.

Sections: Dashboard, Progress, About.

## How to use it

1. Practise in any app; the dashboard updates itself.
2. Look at the weak areas first, and open the app that trains each.
3. Save a backup of all your progress in the Progress tab.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
