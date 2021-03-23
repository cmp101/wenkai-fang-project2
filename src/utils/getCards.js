const cards = (() => {
  let shapes   = ["Diamond", "Round", "Squiggle"];
  let colors   = ["Red", "Green", "Blue"];
  let fillings = ["FillingEmpty", "Solid", "GrayedOut"];
  let numbers  = ["One", "Two", "Three"];

  let r = [];
  for (var shape in shapes)
    for (var color in colors)
      for (var filling in fillings)
        for (var number in numbers)
          r.push({
            shape: shapes[shape],
            color: colors[color],
            filling: fillings[filling],
            number: numbers[number]
          });
  return r;
})();

export default cards