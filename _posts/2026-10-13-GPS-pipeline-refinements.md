---
layout: post
title: "GPS Pipeline Refinements"
---
- GPS sample pipeline initially allowed old runs to add a GPS sample to the cache, affecting the next run; this was patched. Also, failed sprints were not handled; now, failed sprints properly end the session.
- GPS updates come in batches, not necessarily one at a time. Originally, the app was only taking the last of each of the batches, which loses finer detail that is important to accuracy; the GPS sample handler now processes all the location samples. A related issue was that a clamp on GPS updates completely removed any sample that created a distance delta of more than 10.0 meters. A speed guard replaced it, clamping any GPS distance deltas that exceed a constant maxPlausibleSpeed = 13.0 m/s down to match that limit.
- Decided to temporarily keep GPS-based distance tracking out by setting the GPS weight constant to 0.0, to focus on optimizing the stride-based distance calculation model.

## What's next

Begin preliminary tuning for essential constants.