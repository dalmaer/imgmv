# imgmv

Given an image file or URL come up with a better name for it and rename if if you fancy

# Usage

## Print out a nicer filename for the image

```bash
% imgmv -f image.png

Filename:  Thinking_Fast_and_Slow_Cover.png
```

## Print out a nicer filename for the image and rename it!

```bash
% imgmv -m -f image.png

Filename:  Thinking_Fast_and_Slow_Cover.png
Attempting to rename "samples/Screenshot 2023-11-06 at 8.27.34 PM.png" to Thinking_Fast_and_Slow_Cover.png"
```

## Print out a nicer filename for the URL

```bash
% imgmv -u https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg

Filename: WoodenPathThroughMeadow.jpg
```

// % imgmv -f image.png
// % imgmv -m -f image.png
// % imgmv -u https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg

# TODO

- [ ] Given a directory (e.g. /Screenshots) go through them all and clean up shop
