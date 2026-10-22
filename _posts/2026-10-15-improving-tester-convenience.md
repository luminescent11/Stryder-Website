---
layout: post
title: "Improving Tester Convenience"
---
- HealthKit session now starts when the automatic starter is armed, not when the timer actually starts, so the watch does not go to sleep right before the user starts.
- Raw acceleration data is now saved to the watch for later exporting and easier testing. accelDecimationConstant increased from 4 to 10 to decrease burden of sending many samples.

## What's next

Continue preliminary tuning for essential constants.