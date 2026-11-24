---
'expo-image': patch
---

[iOS] Fix the image being clipped to its final size while a rotation, or another UIKit animation, resizes the view. The image view is hosted in a plain container view, so React Native no longer puts a static mask on it.
