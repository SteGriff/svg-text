const express = require("express");
const app = express();
const ttsvgLib = require("text-to-svg");
const svgEngine = ttsvgLib.loadSync();
const svgRender = require("svg-render");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.redirect("/Use me like this.svg")
});

app.get("/:text.svg", (request, response) => {
  const text = request.params.text;
  const svg = makeSvg(text);
  response.setHeader("content-type", "image/svg+xml");
  response.send(svg);
});

app.get("/:text.png", (request, response) => {
  const text = request.params.text;
  const svg = makeSvg(text);
  const svgBuffer = Buffer.from(svg);

  svgRender({
    buffer: svgBuffer
  }).then(function(png) {
    response.setHeader("content-type", "image/png");
    response.send(png);
  });
});

const makeSvg = text => {
  console.log("Requested:", text);

  const attributes = { fill: "white", stroke: "black" };
  const options = {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: "top",
    attributes: attributes
  };
  const svg = svgEngine.getSVG(text, options);

  //console.log(svg);
  return svg;
};

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
