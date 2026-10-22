---
layout: post
title: "Analyzing Collected Data"
---
Revised the ground truth foot contact labeling method to include the whole window of time where the foot touches the ground. The problem is that the frames only capture discrete moments in time, so the foot contact can take place before the first frame where the foot is touching the ground, and the foot leaving the ground can happen after the last frame where the foot is touching the ground. Since ground truth window should capture the whole duration of the foot contact, ground truth foot contact timestamps start at (and include) the frame right before the foot contacts the ground and end at (and include) the first frame where the foot leaves the ground. Using this new method, the 3 preliminary tuning sprints from 10/19 were labeled and analyzed.

One issue that came up was a small false positive spike during the first step, shown in the graph below:

![Z-acceleration vs. time for preliminary sprint 8, showing a small false positive spike during the first step](images/Prelim%208%20z-accel%20vs%20time.png)

Analyzing arm motion only video demonstrated that the largest downward vertical acceleration from the arm is when the hand is at its peak height, and the largest upward vertical acceleration is when the watch arm is rising and the watch, shoulder, and hip form a roughly 20 degree angle. Further analyzing sprint footage showed that the small initial z-acceleration spike causing a false positive detection was due to the arm movement reaching maximum z-acceleration around 150ms before the first “push” ended, effectively separating the upward acceleration from the arm and the upward acceleration from the leg.


- static let startThreshold: Double = 1.0

Start threshold was kept low to keep sensitivity high: inadvertent starts can easily be cancelled, but late starts caused by excessively high thresholds can lead to systematic error in final times.

- static let stepThreshold: Double = 1.2 -> 2.0

Step threshold was kept somewhat low because amateur athletes may put less force into the ground, and the vertical acceleration graph shows a clear pattern of spikes without double peaks or false positive crossings, except for the small spike caused by the arm movement in the first step.

- static let strideCooldown: Double = 0.20 -> 0.15

Some athletes have quick and short strides. Anything less than 150ms between strides means 6+ strides/second, unrealistic for a vast majority of sprinters.

- static let strideConfirmationWindow: Double = 0.40

Confirmation period = ground contact time, which, at easier paces or at the end of a difficult race, can be much longer.


## What's next

Talk to potential customers and find the highest-leverage algorithm improvement.