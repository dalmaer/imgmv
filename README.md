# imgmv

Given an image file or URL come up with a better name for it and rename if if you fancy

# Usage

## Print out a nicer filename for the image

```bash
% imgmv -f "Screenshot 2023-11-06 at 8.27.34 PM.png"

Filename:  Thinking_Fast_and_Slow_Cover.png
```

## Print out a nicer filename for the image and rename it!

```bash
% imgmv -m -f "Screenshot 2023-11-06 at 8.27.34 PM.png"

Filename:  Thinking_Fast_and_Slow_Cover.png
Attempting to rename "samples/Screenshot 2023-11-06 at 8.27.34 PM.png" to Thinking_Fast_and_Slow_Cover.png"
```

## Print out a nicer filename for the URL

```bash
% imgmv -u https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg

Filename: WoodenPathThroughMeadow.jpg
```

## TODO: Given a directory, do this for all the things

```bash
% imgmv -d Screenshots/

mv foo.jpg WoodenPathThroughMeadow.jpg
mv bar.jpg Wiggles.jpg
```

# TODO

- [ ] Given a directory (e.g. /Screenshots) go through them all and clean up shop
