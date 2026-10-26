---
layout: post
title: "Preparing for Model Testing"
---
- Validating accuracy with tester data is planned to be done soon, so the sprint pipeline needed to guarantee it would capture the full 100 meters (even if the measured distance and time totals were inaccurate). This was done by adding a 3.0 second buffer window that happens after the sprint finish has been detected, where sensor data continues to be collected.

- Distances between consecutive GPS updates (not the raw locations themselves) are also stored now.

- A new function that simulates given CSV sensor data can be run on a laptop to see how different approaches or SprintConstants constant values will affect the model’s predicted time and accuracy. This update will be used extensively in experiments with the model and testing.

## What's next

Talk to potential customers and find the highest-leverage algorithm improvement.