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
  const [func, setFunc] = useState("")
  const [deg, setDeg] = useState(0)

  const sketch = useStatefulSketch({ size, setFunc, setDeg }, (state, p) => {
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
        []
      );

      pop = new Population(20);
      pop.scoreIndividuals(env);
    }

    p.draw = function () {
      p.background(0, 0, 0)

      let best = pop.individuals[0];
      p.translate(w / 2, h / 2)

      p.fill(255);
      env.points.forEach(point => {
        p.ellipse(point.x * state.current.size, -point.y * state.current.size, 10, 10);
      });

      best = pop.individuals[0];
      pop.runGeneration(env);
      console.log(pop.individuals[0].fitness, pop.individuals[0].root.toString(), pop.individuals[0].root.getDegree());

      state.current.setFunc(best.root.toString());
      state.current.setDeg(best.root.getDegree());

      p.stroke(255);
      p.strokeWeight(1);
      p.noFill();
      p.beginShape();
      for (let x = -w / 2 / state.current.size; x < w / 2 / state.current.size; x += 0.2) {
        let y = best.evaluate(x);
        //p.ellipse(x * state.current.size, -y * state.current.size, 5, 5);
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
      </div>
      <div>
        <SketchRenderer sketch={sketch} />
        <p>Current best function whose degree is {deg}:</p>
        <p>{func}</p>
      </div>
    </div>
  )
}
