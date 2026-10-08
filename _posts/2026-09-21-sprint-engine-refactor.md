---
layout: post
title: "Sprint Engine Refactor"
---
Architectural overhaul for 4+ hours. The central SprintViewModel class carried too many responsibilities and was becoming way too long, so I had to extract pure math, time and distance handling, and automatic stopping into a new SprintFusionEngine class. The code is much cleaner now because of this fix, and I don’t have to search through a 500 line file every time I want to change something related to sprint functionality. Additionally, I fixed a previous bug where the sprint could report as NaN and silently fail to save.

## [What's next]

Sending the first ready build to TestFlight for internal testing.