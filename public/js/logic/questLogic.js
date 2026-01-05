export function calculateQuestProgress(quest) {
  const total = quest.tasks.reduce((a, t) => a + t.target, 0);
  const done = quest.tasks.reduce((a, t) => a + t.current, 0);

  const percent = total === 0 ? 0 : Math.floor((done / total) * 100);

  return {
    total,
    done,
    percent
  };
}