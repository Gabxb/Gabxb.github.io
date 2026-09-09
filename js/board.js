const copy = {
  en: {
    tagline: "public node · bulletin board · no cookies",
    heroKicker: "notice 001 // pinned",
    heroTitle: "Multi-Agent Coding Orchestra",
    heroBody: "Claude Code / Codex conduct. Grok researches. Gemini reviews. GPT implements. A local model verifies. Tests, git, and the PR come back to the conductor.",
    heroSub: "One person. One control plane. Many models doing the work.",
    stamp: "DO NOT REMOVE",
    opsKicker: "thermal copy",
    opsTitle: "Operator commands",
    cmdResearch: "survey repo / topic",
    cmdReview: "challenge code, plans, diffs",
    cmdImplement: "scoped coding on the side",
    cmdVerify: "second-pass check",
    cmdStatus: "jobs, waits, merge",
    archKicker: "classified diagram",
    archTitle: "Control plane",
    wantedKicker: "now hiring workers",
    wantGrok: "second opinion, fast",
    wantGemini: "second pair of eyes",
    wantGpt: "side-lane coding",
    wantLocal: "no quota / no net",
    roleResearch: "research",
    roleReview: "review",
    roleImplement: "implement",
    roleVerify: "verify",
    labKicker: "open drawers",
    labTitle: "Lab index",
    termKicker: "local tty",
    termTitle: "gabxb@lab",
    cmdPlaceholder: "help",
    boot: [
      "CONNECTING TO GABXB://LAB ...",
      "AUTH: PUBLIC / READ-ONLY",
      "MOUNTING BULLETIN BOARD",
      "WORKERS ONLINE: GROK GEMINI GPT LOCAL",
      "READY.",
    ],
  },
  zh: {
    tagline: "公开节点 · 公告栏 · 无 cookie",
    heroKicker: "告示 001 // 钉住",
    heroTitle: "多模型编码乐团",
    heroBody: "Claude Code / Codex 当指挥。Grok 调研，Gemini 评审，GPT 落地，本地模型复核。测试、git、PR 回到指挥手里。",
    heroSub: "一个人。一个控制面。多个模型干活。",
    stamp: "禁止撕毁",
    opsKicker: "热敏副本",
    opsTitle: "操作指令",
    cmdResearch: "调研仓库 / 主题",
    cmdReview: "挑战代码、方案、diff",
    cmdImplement: "旁路做有边界的编码",
    cmdVerify: "第二遍核对",
    cmdStatus: "任务、等待、合并",
    archKicker: "机密图纸",
    archTitle: "控制面",
    wantedKicker: "正在招募工人",
    wantGrok: "快调研 / 第二意见",
    wantGemini: "第二双眼睛",
    wantGpt: "旁路编码",
    wantLocal: "没配额 / 没网络",
    roleResearch: "调研",
    roleReview: "评审",
    roleImplement: "实现",
    roleVerify: "复核",
    labKicker: "公开抽屉",
    labTitle: "实验室索引",
    termKicker: "本地终端",
    termTitle: "gabxb@lab",
    cmdPlaceholder: "help",
    boot: [
      "正在接入 GABXB://LAB ...",
      "认证：公开 / 只读",
      "挂载公告栏",
      "工人在线：GROK GEMINI GPT LOCAL",
      "就绪。",
    ],
  },
};

const replies = {
  en: {
    help: "commands: help · whoami · ls · orchestra · /grok:research · /gemini:review · /gpt:implement · /agent:status · zh · en · clear",
    whoami: "Gabxb / LAB — one conductor, many workers.",
    ls: "NOTICE_001  THERMAL_COPY  DIAGRAM  WANTED  LAB_INDEX  TTY",
    orchestra: "Claude/Codex delegate. Workers: Grok research, Gemini review, GPT implement, local verify.",
    grok: "Grok Researcher → running... 12.8s → brief ready.",
    gemini: "Gemini Reviewer → running... 17.4s → notes ready.",
    gpt: "GPT Implementer → waiting for research+review merge.",
    status: "jobs: grok done · gemini done · gpt waiting · local idle",
    unknown: "unknown token. type help.",
  },
  zh: {
    help: "命令：help · whoami · ls · orchestra · /grok:research · /gemini:review · /gpt:implement · /agent:status · zh · en · clear",
    whoami: "Gabxb / LAB — 一个指挥，多个工人。",
    ls: "告示_001  热敏副本  图纸  招募  实验室  终端",
    orchestra: "Claude/Codex 分派。工人：Grok 调研，Gemini 评审，GPT 实现，本地复核。",
    grok: "Grok 调研 → running... 12.8s → 简报就绪。",
    gemini: "Gemini 评审 → running... 17.4s → 意见就绪。",
    gpt: "GPT 实现 → 等待调研+评审合并。",
    status: "任务：grok 完成 · gemini 完成 · gpt 等待 · local 空闲",
    unknown: "未知指令。输入 help。",
  },
};

let lang = "en";

function applyLang(next) {
  lang = next;
  document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  const t = copy[lang];
  for (const [key, value] of Object.entries(t)) {
    if (key === "boot") continue;
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach((el) => {
      el.textContent = value;
    });
  }
  const input = document.getElementById("cmd");
  if (input) input.placeholder = t.cmdPlaceholder;
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

function clock() {
  const el = document.getElementById("clock");
  const now = new Date();
  el.textContent = now.toISOString().replace("T", " ").slice(0, 19) + "Z";
}

function logLine(text) {
  const log = document.getElementById("term-log");
  const line = document.createElement("div");
  line.textContent = "> " + text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  const r = replies[lang];
  if (!cmd) return;
  if (cmd === "clear") {
    document.getElementById("term-log").textContent = "";
    return;
  }
  if (cmd === "zh" || cmd === "en") {
    applyLang(cmd);
    logLine(cmd === "zh" ? "语言 → 中文" : "language → english");
    return;
  }
  if (cmd === "help") return logLine(r.help);
  if (cmd === "whoami") return logLine(r.whoami);
  if (cmd === "ls") return logLine(r.ls);
  if (cmd === "orchestra") return logLine(r.orchestra);
  if (cmd.startsWith("/grok") || cmd.includes("research")) return logLine(r.grok);
  if (cmd.startsWith("/gemini") || cmd.includes("review")) return logLine(r.gemini);
  if (cmd.startsWith("/gpt") || cmd.includes("implement")) return logLine(r.gpt);
  if (cmd.startsWith("/agent") || cmd === "status") return logLine(r.status);
  logLine(r.unknown);
}

function boot() {
  const overlay = document.getElementById("boot");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    overlay.classList.add("done");
    return;
  }
  const out = document.getElementById("boot-log");
  const lines = copy[lang].boot;
  let i = 0;
  const tick = () => {
    if (i >= lines.length) {
      setTimeout(() => overlay.classList.add("done"), 420);
      return;
    }
    out.textContent += lines[i] + "\n";
    i += 1;
    setTimeout(tick, 280);
  };
  tick();
}

document.addEventListener("DOMContentLoaded", () => {
  applyLang("en");
  clock();
  setInterval(clock, 1000);
  boot();
  document.getElementById("skip-boot").addEventListener("click", () => {
    document.getElementById("boot").classList.add("done");
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
  const form = document.getElementById("term-form");
  const input = document.getElementById("cmd");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runCommand(input.value);
    input.value = "";
  });
  logLine(replies.en.help);
});
