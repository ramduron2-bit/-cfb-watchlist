const GAMES = [
  {
    home: "USC",
    away: "Louisiana",
    homeRank: 14,
    time: "Sat • 8:00 PM PT",
    network: "BTN",
    rivalryScore: 100,
    usc: true,
    why: "USC is always #1 on your list."
  },
  {
    home: "Texas",
    away: "Ohio State",
    homeRank: 4,
    awayRank: 1,
    time: "Sat • 4:30 PM PT",
    network: "FOX",
    rivalryScore: 8,
    why: "#1 vs. #4. The biggest pure football game of the week."
  },
  {
    home: "Michigan",
    away: "Oklahoma",
    awayRank: 11,
    time: "Sat • 9:00 AM PT",
    network: "FOX",
    rivalryScore: 15,
    why: "Two heavyweight programs with major-name appeal."
  },
  {
    home: "Oklahoma State",
    away: "Oregon",
    awayRank: 6,
    time: "Sat • 9:00 AM PT",
    network: "ESPN",
    rivalryScore: 8,
    why: "#6 Oregon on the road makes this an interesting early watch."
  },
  {
    home: "Iowa",
    away: "Iowa State",
    homeRank: 21,
    time: "Sat • 4:30 PM PT",
    network: "CBS",
    rivalry: "Cy-Hawk Rivalry",
    rivalryScore: 50,
    why: "One of the best true rivalries of the week."
  },
  {
    home: "BYU",
    away: "Arizona",
    homeRank: 15,
    time: "Sat • 12:30 PM PT",
    network: "ESPN",
    rivalryScore: 6,
    why: "#15 BYU has real playoff pressure."
  },
  {
    home: "Kentucky",
    away: "Alabama",
    awayRank: 12,
    time: "Sat • 12:30 PM PT",
    network: "ABC",
    rivalryScore: 7,
    why: "Alabama is ranked #12 and every SEC game matters."
  },
  {
    home: "Notre Dame",
    away: "Rice",
    homeRank: 3,
    time: "Sat • 12:30 PM PT",
    network: "NBC",
    rivalryScore: 2,
    why: "#3 Notre Dame is a national contender worth checking in on."
  },
  {
    home: "Texas A&M",
    away: "Arizona State",
    homeRank: 10,
    time: "Sat • 9:00 AM PT",
    network: "ESPN",
    rivalryScore: 5,
    why: "#10 Texas A&M has playoff-position pressure."
  },
  {
    home: "Tennessee",
    away: "Georgia Tech",
    homeRank: 18,
    time: "Sat • 4:00 PM PT",
    network: "ABC",
    rivalryScore: 5,
    why: "#18 Tennessee faces a tricky road game."
  },
  {
    home: "Utah",
    away: "Arkansas",
    homeRank: 20,
    time: "Sat • 7:15 PM PT",
    network: "ESPN",
    rivalryScore: 6,
    why: "#20 Utah gets a physical matchup."
  },
  {
    home: "Oregon State",
    away: "Texas Tech",
    awayRank: 13,
    time: "Sat • 4:30 PM PT",
    network: "FOX",
    rivalryScore: 5,
    why: "#13 Texas Tech is nationally relevant."
  },
  {
    home: "LSU",
    away: "Louisiana Tech",
    homeRank: 8,
    time: "Sat • 4:30 PM PT",
    network: "SEC Network",
    rivalryScore: 2,
    why: "#8 LSU should win, but it is still a ranked-team checkpoint."
  },
  {
    home: "Ole Miss",
    away: "Charlotte",
    homeRank: 9,
    time: "Sat • 4:45 PM PT",
    network: "SECN",
    rivalryScore: 2,
    why: "#9 Ole Miss is a national contender."
  },
  {
    home: "Georgia",
    away: "Western Kentucky",
    homeRank: 2,
    time: "Sat • 9:45 AM PT",
    network: "SEC Network",
    rivalryScore: 2,
    why: "#2 Georgia should cruise. More of a scoreboard game."
  }
];

function scoreGame(game) {
  if (game.usc) return 1000;

  let score = 20;

  score += game.rivalryScore || 0;

  if (game.homeRank && game.awayRank) {
    score += 32;
  } else if (game.homeRank || game.awayRank) {
    score += 14;
  }

  [game.homeRank, game.awayRank].forEach(rank => {
    if (rank) {
      score += Math.max(0, 18 - Math.min(rank, 18));
    }
  });

  if (
    (game.homeRank && game.homeRank <= 10) ||
    (game.awayRank && game.awayRank <= 10)
  ) {
    score += 8;
  }

  return Math.min(99, score);
}

function getLabel(score) {
  if (score >= 80) return "CAN'T MISS";
  if (score >= 60) return "MUST WATCH";
  if (score >= 45) return "WORTH WATCHING";
  return "CHECK IN";
}

function formatRank(rank) {
  return rank ? `#${rank} ` : "";
}

function renderCard(game) {
  const score = scoreGame(game);
  const label = getLabel(score);

  const rankedVsRanked =
    game.homeRank && game.awayRank
      ? `<span class="tag">Ranked vs Ranked</span>`
      : "";

  const rivalryTag = game.rivalry
    ? `<span class="tag ${game.rivalryScore >= 40 ? "hot" : ""}">${game.rivalry}</span>`
    : "";

  return `
    <article class="card">
      <div class="cardTop">
        <div>
          <div class="rank">
            ${formatRank(game.homeRank)}${game.home}
            vs
            ${formatRank(game.awayRank)}${game.away}
          </div>

          <div class="matchup">
            ${game.home} vs ${game.away}
          </div>

          <div class="time">
            ${game.time}
          </div>
        </div>

        <div class="score">
          <div class="scoreNum">${score}</div>
          <div class="scoreLabel">${label}</div>
        </div>
      </div>

      <div class="tags">
        ${rivalryTag}
        ${rankedVsRanked}
      </div>

      <div class="why">
        ${game.why}
      </div>

      <div class="network">
        ${game.network}
      </div>
    </article>
  `;
}

function renderApp() {
  const sortedGames = [...GAMES].sort(
    (a, b) => scoreGame(b) - scoreGame(a)
  );

  const usc = sortedGames.find(game => game.usc);
  const otherGames = sortedGames.filter(game => !game.usc);

  document.getElementById("weekLabel").textContent =
    "September 10–13, 2026";

  document.getElementById("updated").textContent =
    "Updated today";

  document.getElementById("uscCard").innerHTML = `
    <article class="usc">
      <div class="label">#1 ALWAYS • USC</div>

      <div class="matchup">
        ${formatRank(usc.homeRank)}${usc.home}
        vs
        ${usc.away}
      </div>

      <div class="meta">
        ${usc.time} • ${usc.network}
      </div>

      <div class="why">
        ${usc.why}
      </div>
    </article>
  `;

  document.getElementById("games").innerHTML =
    otherGames.slice(0, 8).map(renderCard).join("");

  document.getElementById("allGamesList").innerHTML =
    otherGames.map(renderCard).join("");
}

document.getElementById("refreshBtn").addEventListener(
  "click",
  renderApp
);

document.getElementById("prevWeek").addEventListener(
  "click",
  () => alert("Previous weeks will be added next.")
);

document.getElementById("nextWeek").addEventListener(
  "click",
  () => alert("Future weeks will be added next.")
);

document.getElementById("thisWeek").addEventListener(
  "click",
  renderApp
);

const banner = document.getElementById("installBanner");

if (
  window.matchMedia("(display-mode: standalone)").matches ||
  localStorage.getItem("dismissInstall") === "1"
) {
  banner.classList.add("hidden");
}

document.getElementById("dismissInstall").addEventListener(
  "click",
  () => {
    localStorage.setItem("dismissInstall", "1");
    banner.classList.add("hidden");
  }
);

renderApp();
