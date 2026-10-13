---
layout: post
title: "Storing data sample timestamps"
---
Fixed timestamps, which made logging (data collection), starting, and finishing more accurate: time discrepancies due to caching and main thread processing times are now solved by saving timestamps of inputs that trigger a stride or GPS update.

## [What's next]

Continue debugging, this time the GPS pipeline.