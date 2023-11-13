#!/usr/bin/env node

// ------------------------------------------------------------------------
// Usage:
// % imgmv -f image.png    # Print out a nicer filename for the image
// % imgmv -m -f image.png # Print out a nicer filename for the image and rename it!
//
// # Print out a nicer filename for the URL
// % imgmv -u https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg
// ------------------------------------------------------------------------

import * as fs from "fs";
import * as path from "path";
import { fileTypeFromFile } from "file-type";
import { Command } from "commander";
import OpenAI from "openai";

// ------------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------------

// Given a filename, return the base64 data URL for it
async function base64(filename) {
  const data = fs.readFileSync(path.resolve(filename));
  const mimetype = (await fileTypeFromFile(filename)).mime || "image/jpeg";
  return `data:${mimetype};base64,${data.toString("base64")}`;
}

// Given a filename, return the file extension
// E.g. foo.jpg -> jpg
function fileExtension(filename) {
  return path.extname(filename);
}

// Given a filename with or without an extension, and a file extension, return the filename with the given extension
// E.g. foo.jpg, png => foo.png
function filenameWithExtension(filename, extension) {
  let ext = fileExtension(filename);
  if (ext) {
    return filename.replace(fileExtension(filename), extension);
  } else {
    return filename + extension;
  }
}

async function main(imageUrl) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What would a good, short, filename be for this image? Only reply with the filename.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  let newFilename = response.choices[0]?.message?.content;
  if (newFilename) {
    console.log("Filename: ", response.choices[0]?.message?.content);
    if (options.filename) {
      let newWithExt = filenameWithExtension(
        newFilename,
        fileExtension(options.filename)
      );
      console.log(`mv "${options.filename}" to "${newWithExt}"`);
      if (options.move) {
        fs.renameSync(options.filename, newWithExt);
      }
    }
  } else {
    console.log("No filename found for ", filename);
  }
}

// ------------------------------------------------------------------------
// MAIN
// ------------------------------------------------------------------------
const openai = new OpenAI();

const program = new Command();

program.version("0.0.1");

// Define the CLI commands and options
program
  .option("-d, --debug", "Turn on debugging")
  .option("-u, --url <type>", "Given the image URL, return a good name")
  .option("-m, --move", "Move the file to the given name")
  .option("-f, --filename <filename>", "Use the image file as the input");

if (
  !process.argv
    .slice(2)
    .some((arg) =>
      ["-m", "--move", "-f", "--file", "-u", "--url"].includes(arg)
    )
) {
  process.argv.push("-f"); // Add '-f' as a default argument
}

program.parse(process.argv);

const options = program.opts();

let imageUrl = "";
if (options.url) {
  imageUrl = options.url;
} else if (options.filename) {
  if (options.filename) {
    const type = await fileTypeFromFile(options.filename);

    if (type?.mime?.startsWith("image/")) {
      imageUrl = await base64(options.filename);
    } else {
      console.log(
        `${options.filename} is not an image file. It is type: ${type?.mime}`
      );
      process.exit(1);
    }
  }
}

main(imageUrl);
