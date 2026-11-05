/* GRE and TOEFL Dashboard: study time, accuracy, streaks and weak areas from every app in one page. */
(function () {
  'use strict';
  // Totals for one exam from the suite-wide logs.
  const summary = (sessions, practice, mistakes, exam) => {
    const s = sessions.filter((x) => x.exam === exam), p = practice.filter((x) => x.exam === exam);
    const right = SK.sum(s.map((x) => x.correct)), total = SK.sum(s.map((x) => x.total));
    return { sessions: s.length, answers: total, accuracy: total ? Math.round((100 * right) / total) : null, minutes: SK.round(SK.sum(p.map((x) => x.minutes)), 0), mistakes: mistakes.filter((m) => m.exam === exam).length, apps: new Set(s.map((x) => x.app).concat(p.map((x) => x.app))).size };
  };
  const App = {
    about: 'One page for everything you have practised in the suite: sessions, answers, accuracy, minutes and mistakes for the GRE and the TOEFL, your streak across both, and the weakest topics in each, with the apps you have used most.',
    how: ['Practise in any app; the dashboard updates itself.', 'Look at the weak areas first, and open the app that trains each.', 'Save a backup of all your progress in the Progress tab.'],
    tabs: [{ id: 'dash', label: 'Dashboard', render(el) {
      const S = SK.store.get('suite.sessions', []), P = SK.store.get('suite.practice', []), M = SK.store.get('suite.mistakes', []);
      el.appendChild(SK.card('Across both tests', SK.stats([['Day streak', SK.streak(P.map((x) => x.day).concat(S.map((x) => x.day)))], ['Hours', SK.round(SK.sum(P.map((x) => x.minutes)) / 60, 1)], ['Apps used', new Set(S.map((x) => x.app).concat(P.map((x) => x.app))).size], ['Mistakes to review', M.length]])));
      for (const exam of ['GRE', 'TOEFL']) {
        const s = summary(S, P, M, exam);
        const weak = SK.weakAreas(S.filter((x) => x.exam === exam).map((x) => Object.assign({}, x, { exam: '' })), 3).slice(0, 5);
        el.appendChild(SK.card(exam, SK.stats([['Sessions', s.sessions], ['Answers', s.answers], ['Accuracy', s.accuracy === null ? '-' : s.accuracy + '%'], ['Minutes', s.minutes], ['Mistakes', s.mistakes]]),
          weak.length ? SK.table(['Weakest topics', 'Answers', 'Accuracy'], weak.map((w) => [w.topic.trim(), w.total, w.pct + '%'])) : SK.h('p', { class: 'sk-muted', text: 'Practise in ' + exam + ' apps to see your weak topics.' })));
      }
    } }],
    summary,
    checks: { 'totals are computed per exam': (data, assert) => {
      const S = [{ exam: 'GRE', app: 'a', correct: 3, total: 4 }, { exam: 'GRE', app: 'b', correct: 1, total: 4 }, { exam: 'TOEFL', app: 'c', correct: 5, total: 5 }];
      const s = summary(S, [{ exam: 'GRE', app: 'a', minutes: 12.4 }], [{ exam: 'GRE' }], 'GRE');
      assert.deepEqual([s.sessions, s.answers, s.accuracy, s.minutes, s.mistakes, s.apps], [2, 8, 50, 12, 1, 2]);
      assert.equal(summary([], [], [], 'TOEFL').accuracy, null);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
