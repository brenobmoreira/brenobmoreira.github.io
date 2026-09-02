(function () {
  const themes = ["aero", "2012", "terminal"];
  const fallback = "2012";
  const fromUrl = new URLSearchParams(location.search).get("theme");
  let stored = null;
  try { stored = localStorage.getItem("theme"); } catch {}
  const chosen = themes.includes(fromUrl) ? fromUrl : themes.includes(stored) ? stored : fallback;
  document.documentElement.dataset.theme = chosen;
  if (fromUrl && themes.includes(fromUrl)) { try { localStorage.setItem("theme", fromUrl); } catch {} }
  try { if (localStorage.getItem("cover") === "sasuke") document.documentElement.dataset.cover = "sasuke"; } catch {}
})();
