---
layout: post
title: "Orientation Fix"
---
Switched the matrix multiplication to accel_world = R^T * accel_rel (the transpose instead of original matrix), as R (the rotation matrix) is orthogonal and converts from world to relative. The app needs the opposite direction, converting the sensor output’s relative acceleration to the world acceleration. Also confirmed from the Apple documentation that the userAcceleration does not include acceleration due to gravity, meaning that gravity does not need to be subtracted from acceleration samples.

## What's next

Continue debugging.