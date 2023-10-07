'use client'

import { useState } from 'react'
import { Image, Renderer } from 'p5'

import useStatefulSketch from './p5/useStatefulSketch'
import SketchRenderer from './p5/SketchRenderer'

import Individual from './Classes/PopulationStuff/Individual'
import Population from './Classes/PopulationStuff/Population'
import Environment from './Classes/EnviromentStuff/Enviroment'

export default function ExampleSketch() {
  const [size, setSize] = useState(50)

  const sketch = useStatefulSketch({ size }, (state, p) => {
    const w = 800
    const h = 800

    let canvas: Renderer
    let img: Image

    let pop: Population;
    let env: Environment;
    p.setup = function () {
      canvas = p.createCanvas(w, h)
      canvas.mousePressed(function () {
        if (p.mouseButton == p.LEFT)
          env.points.push(p.createVector(p.mouseX / state.current.size - w / 2 / state.current.size, -p.mouseY / state.current.size + h / 2 / state.current.size));
        else if (p.mouseButton === p.RIGHT)
          env.points[0] = p.createVector(p.mouseX / state.current.size - w / 2 / state.current.size, -p.mouseY / state.current.size + h / 2 / state.current.size);
      })

      env = new Environment(
        [p.createVector(0, 0),
        p.createVector(1, 1),
        p.createVector(2, 2),
        p.createVector(3, -1),
        ]
      );

      pop = new Population(20);
      pop.scoreIndividuals(env);
    }

    p.draw = function () {
      p.background(0, 0, 0)

      let best = pop.individuals[0];
      p.textAlign(p.LEFT, p.TOP)
      p.textSize(20)
      p.fill(255)
      p.text(best.root.toString(), 0, 0)

      p.translate(w / 2, h / 2)

      env.points.forEach(point => {
        p.ellipse(point.x * state.current.size, -point.y * state.current.size, 10, 10);
      });

      best = pop.individuals[0];
      pop.runGeneration(env);
      console.log(pop.individuals[0].fitness, pop.individuals[0].root.toString(), pop.individuals[0].evaluate(3));


      p.stroke(255);
      p.strokeWeight(1);
      p.noFill();
      p.beginShape();
      for (let x = -w / 2 / state.current.size; x < w / 2 / state.current.size; x += 0.2) {
        let y = best.evaluate(x);
        p.ellipse(x * state.current.size, -y * state.current.size, 5, 5);
        p.vertex(x * state.current.size, -y * state.current.size);

      }
      p.endShape();

    }

    // non va bene perchè il listener è su window e non sull'elemento dello sketch
    // p.mouseClicked = function () {
    //   setSize(50)
    // }
  })

  return (
    <div>
      <label htmlFor="sizeSlider">Dimensione</label>
      <input
        id="sizeSlider"
        type="range"
        min={1}
        max={100}
        value={size}
        onChange={(e) => setSize(parseInt(e.target.value))}
      />
      <SketchRenderer sketch={sketch} />
    </div>
  )
}
