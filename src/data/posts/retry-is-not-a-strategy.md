---
title: "Retry Is Not a Strategy: Classifying and Recovering from AI Agent Failures with Python"
date: "2026-08-28"
description: "A personal account of presenting triage at PyCon JP 2026, mixed with a quick technical dive into why retries fail for AI agents and how the triage library classifies and recovers from nine distinct failure types."
tags: ["AI agents", "Python", "Error handling", "triage", "PyCon JP", "Travel"]
slug: "retry-is-not-a-strategy"
---

## A Dream Trip, A Nerve‑Racking Talk

<img src="/images/blog/774266417-1488517373306800-5033087096224172286-n.jpg" width="600" alt="774266417_1488517373306800_5033087096224172286_n" style="display:block; margin:0 auto;" />
<i>Official pubmat from PyCon JP Team.</i>


I still remember the first time I saw a picture of the **Glico Man** in Osaka’s Dōtonbori. It was the postcard I kept in my room the night before I was supposed to board a plane to Japan for **PyCon JP 2026**. My childhood was spent hunting Pokémon, battling in *Monster Hunter*, and losing myself in countless anime series. So when the plane finally touched down, I felt like a kid in a candy store—only this store sold ramen, okonomiyaki, and memories.

<img src="/images/blog/unknown-4.jpg" width="600" alt="Unknown-4" style="display:block; margin:0 auto;" />


<img src="/images/blog/unknown-5.jpg" width="600" alt="Unknown-5" style="display:block; margin:0 auto;" />

<i> *plays Baka Mitai in the background* </i>


I had a very specific selfie on my checklist: a photo in front of the giant **crab restaurant** (Sōtenbori) that only true *Yakuza : Like a Dragon* fans would recognize. The Glico Man was there, of course, but I wanted that “if you know, you know” shot. After a quick selfie, I headed to the conference venue, my mind buzzing with the slides I had rehearsed a thousand times.

<img src="/images/blog/unknown-3.jpg" width="600" alt="Unknown-3" style="display:block; margin:0 auto;" />

<i> Sorry for the blurry photo. </i>


The conference ran on **Friday 21 – Saturday 22 August 2026** at the **International Conference Center Hiroshima**. A *Sprint* day followed on **Sunday 23 August 2026** at Hiroshima University’s Higashi‑Senda Campus. The main conference featured two keynote speakers—**Carol Willing** and **Takashi Kitao**—who shared perspectives on open science, creative Python use, and the future of the language.


The night before the talk, sleep was a luxury. I kept replaying the opening line, tweaking code examples, and making sure I could field questions about edge cases. The result? A few unintended dozes during the presentation (embarrassing, but the audience was kind enough to smile). By the time I wrapped up, the relief was palpable—​the talk was over, the questions were interesting, and the library I’d built had captured several curious eyes.

## When “Just Retry” Isn’t Enough

Most AI‑agent frameworks share a common pattern:

```python
try:
    result = agent.run(task)
except Exception:
    # blind retry
    result = agent.run(task)
```

The code catches **any** exception and blindly retries the whole run. This works for simple timeouts, but it collapses *all* failure signals into one bucket. A `TimeoutError`, a malformed JSON response, or an infinite‑looping tool call are all treated the same, even though each demands a different remedy.

In practice, Python already gives us useful signals. A `json.JSONDecodeError` tells us the payload is broken; an `httpx.HTTPStatusError` with a 503 tells us the upstream service is flaky. When we wrap an agent in a generic ``except Exception`` block, we lose that nuance. Moreover, many failures surface **outside** a standard exception—​for example, a tool is called repeatedly with identical arguments, or a policy‑breaking constraint is silently ignored. Those cases need context that no single exception provides.

## Enter **triage** – Classification Before Recovery

`triage` is a lightweight Python library that sits between an agent’s crash and the recovery policy. It **classifies *why* the agent failed** and then routes the failure to a matching strategy instead of blindly retrying.

### Two‑Tier Classification
1. **Rules tier** – a deterministic, token‑free set of regex‑based rules. It checks, in order:
   - Loop detection (last three steps identical)
   - Wrong‑tool call
   - Schema mismatch
   - External fault (HTTP 5xx)
   - Timeout
   - Constraint ignored (message pattern)
   - Exception‑type matches for the remaining five types
   - Anything else → `UNKNOWN`
2. **LLM tier** – invoked only when the rules tier returns `UNKNOWN`. It sends the full trajectory to a configurable LLM (Anthropic, OpenAI‑compatible, Ollama) which reasons about the failure and returns a classification.

### The Nine Failure Types
| Type | What it means |
|------|----------------|
| `WRONG_TOOL_CALLED` | The agent asked for a tool that doesn’t exist or isn’t enabled |
| `SCHEMA_MISMATCH` | JSON or pydantic validation failed |
| `EXTERNAL_FAULT` | Upstream service returned 5xx, 429, etc. |
| `TIMEOUT` | Operation exceeded a deadline |
| `LOOP_DETECTED` | Identical tool calls appear in the last three steps |
| `CONSTRAINT_IGNORED` | Agent violated a user‑defined rule |
| `PLAN_INCOMPLETE` | Agent finished without completing sub‑goals |
| `CONTEXT_OVERFLOW` | Context window was exceeded, causing loss of earlier steps |
| `UNKNOWN` | Not matched by any rule; falls back to LLM tier |

## Honest Numbers – 52 % Recall, 100 % Precision

We evaluated the **RulesClassifier** on a held‑out corpus of 27 real SDK error strings that were never used to write the rules. The results:

- **Recall:** 52 % (14/27) – the classifier correctly identified the failure type in a little more than half the cases.
- **Precision:** 100 % – every classification it made was correct; the remaining 13 cases returned `UNKNOWN` rather than a wrong guess.

Why this matters: a mis‑routed recovery can be harmful (e.g., retrying a schema mismatch). `triage` prefers an *unknown* fallback, letting the default policy (usually a safe retry or escalation) take over.

The full benchmark script lives in the main repo (`scripts/classifier_accuracy.py`). The same script also reports perfect scores on the in‑corpus regression and near‑miss tests, confirming that the rules are reliable where they apply.

## Mapping Failures to Strategies
Each failure type can be paired with a concrete recovery policy. Here’s the one‑to‑one mapping we demonstrated at PyCon JP:

| Failure Type | Strategy |
|--------------|----------|
| `WRONG_TOOL_CALLED` | `retry_with_tool_manifest` – retry while hinting the correct tool list |
| `SCHEMA_MISMATCH` | `retry_with_tool_manifest` – same hint, but focused on schema |
| `EXTERNAL_FAULT` | `backoff_and_retry` – exponential backoff before retry |
| `TIMEOUT` | `backoff_and_retry` |
| `LOOP_DETECTED` | `replan` – generate a new plan that avoids the loop |
| `CONSTRAINT_IGNORED` | `replan` with a constraint reminder |
| `PLAN_INCOMPLETE` | `rollback_to_checkpoint` – continue from the last saved state |
| `CONTEXT_OVERFLOW` | `replan` with a compressed‑context hint |
| `UNKNOWN` | `escalate` or `suspend` – hand off to a human or store a resumable token |

All the strategies are tiny, composable callables shipped with `triage`. You can also build custom ones that inspect the attempt history.

## Minimal Code Example (≈ 30 lines)

```python
import triage
from triage.strategies.retry import backoff_and_retry, retry_with_tool_manifest
from triage.strategies.replan import replan
from triage.strategies.rollback import rollback_to_checkpoint

# 1️⃣  Define a simple async agent (no framework required)
async def my_agent(task: str, *, record_step, update_state, **kwargs):
    # simulate a tool call that may fail
    try:
        result = call_external_api(task)
    except Exception as e:
        # record the failure step; triage will see it later
        record_step(triage.Step(
            index=0,
            action="call external api",
            tool_called="api",
            tool_input={"q": task},
            tool_output=str(e),
        ))
        raise
    record_step(triage.Step(index=0, action="api success", tool_output=result))
    update_state({"last_result": result})
    return result

# 2️⃣  Declare a policy that maps each FailureType
policy = triage.FailurePolicy(
    WRONG_TOOL_CALLED = retry_with_tool_manifest(max_attempts=2),
    SCHEMA_MISMATCH   = retry_with_tool_manifest(max_attempts=2),
    EXTERNAL_FAULT    = backoff_and_retry(max_attempts=4),
    TIMEOUT           = backoff_and_retry(max_attempts=3),
    LOOP_DETECTED     = replan(hint="Try a different approach."),
    CONSTRAINT_IGNORED= replan(hint="Remember the constraints!"),
    PLAN_INCOMPLETE   = rollback_to_checkpoint(),
    CONTEXT_OVERFLOW = replan(hint="Compress the context and try again."),
    default           = triage.FailurePolicy.escalate_by_default(),
)

# 3️⃣  Wrap the agent with triage
agent = triage.Agent(my_agent, policy=policy)

# 4️⃣  Run – triage takes care of classification \u0026 recovery
result = await agent.run("search for recent AI papers")
print("Final result:", result)
```

If you already use **LangGraph**, you can drop in the adapter with a single line:

```python
from triage.adapters.langgraph import wrap_langgraph
agent = wrap_langgraph(compiled_graph, policy=policy)
```

The adapter automatically listens to `graph.astream_events(...)` and builds the trajectory for you—no manual `record_step` calls needed.

## Demo Scripts from the Talk
The companion **PyCon JP 2026** repo (`github.com/mattekudacy/pycon-jp-2026`) ships five runnable scripts that illustrate the library end‑to‑end:

1. `01_blind_retry_fails.py` – shows the naïve retry pattern and its cost.
2. `02_triage_recovers.py` – the same failure, now fixed by `triage`.
3. `03_taxonomy_sweep.py` – walks through all nine failure types with dedicated strategies.
4. `04_does_it_actually_work.py` – runs the RulesClassifier on the held‑out corpus, printing the 52 % recall / 100 % precision numbers.
5. `05_failure_metrics.py` – demonstrates the OpenTelemetry counters (`triage.failures`, `triage.recoveries`, `triage.runs`) emitted by default.

All scripts require only `pip install "triage-agent==1.0.0"` (plus `opentelemetry-sdk` for the metrics demo) and run in a few seconds—no external API keys.

## What triage *isn't*
- It does **not** replace a model’s self‑correction abilities. If an LLM can fix its own hallucination without side effects, you’d still prefer that.
- It is **not** a replacement for LangGraph’s checkpointing; they complement each other—checkpoints let you roll back, triage tells you *why* you should roll back.
- Multi‑agent coordination is out of scope for now; adapters for OpenAI Agents SDK and CrewAI were removed to keep the codebase stable.

## Reflections After the Talk

The night after the presentation, I finally allowed myself to sleep—in a tiny Osaka capsule, with the faint hum of a vending machine outside. The next morning, I boarded a shinkansen to Hiroshima, where I tried okonomiyaki that melted in my mouth and visited two Pokémon Centers, a Capcom store (Monster Hunter merch), and a Nintendo shop that felt like a shrine.

Seeing a **Mudkip** plush in the Pokémon Center brought a grin back to my face; it was the perfect reward after the pressure of the conference. The locals were warm, the food unforgettable, and the experience reminded me why I fell in love with Japan in the first place.

<img src="/images/blog/unknown-6.jpg" width="600" alt="Unknown-6" style="display:block; margin:0 auto;" />

<i> I forgot to take pics of the mudkip, but here's a picture of other Pokemon </i>


During the **Sprint** day (Sunday 23 August), we decided to ditch any further coding and be tourists for a few hours. We took a short boat ride to **Miyajima** and stood before the iconic **floating torii gate** of Itsukushima Shrine. The sight of the massive red gate seemingly hovering on water was breathtaking. While wandering the island, we encountered the friendly, cute deer that roam freely—each one pausing for a quick photo before hopping away. It was a serene contrast to the intense technical discussions of the conference, and a reminder that exploring new places can recharge the mind.

<img src="/images/blog/unknown-2.jpg" width="600" alt="Unknown-2" style="display:block; margin:0 auto;" />

<i> Too bad its low tide. Maybe next time? </i>


I also want to extend another apology to the PyCon JP organizers for any inconvenience my exhausted dozes may have caused. Your patience and support made the experience possible, and I’m grateful for the warm welcome.

I’m already looking forward to the mini‑PyCon JP event on **12 December 2026**, which will feature security engineers from PyPI and the Python Software Foundation. If you’re planning to attend, swing by my talk’s code repos, try the demos, and maybe we’ll bump into each other at a ramen stall.

## Takeaways
1. **Don’t treat every failure as a retry.** Classify first; recover intelligently.
2. **Rules can be powerful and cheap.** The deterministic tier gives 52 % recall with zero API cost and perfect precision.
3. **LLM fallback is a safety net.** When rules can’t decide, a cheap LLM can still provide a useful guess.
4. **Recovery strategies belong in a policy map.** One line per `FailureType` makes the intent crystal clear.
5. **Observability matters.** OpenTelemetry spans and counters let you monitor which failures dominate your production runs.

If you’ve ever watched an agent spin its wheels, burn API credits, or silently drop data, give `triage` a try. The library is available on PyPI (`pip install triage-agent`) and the source lives at https://github.com/mattekudacy/triage.

---

*Happy hacking, and may your next trip be as rewarding as your next bug‑fix.*
