import { Component, createRef } from "react";
import p5 from 'p5';

export default class AstroBG extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
    }

    Sketch = (p) => {
        let MAG = p.windowWidth/8;
        let AMOUNT_OF_STARS = 25;
        let stars = [];
        let lines = [];

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL); 
          p.normalMaterial();
          
          // Generate Stars
          for (let i = 0; i < AMOUNT_OF_STARS; i++) {
              stars.push(
                [ p.random(-MAG, MAG), p.random(-MAG, MAG), p.random(-MAG, MAG) ]
              );
            }
            
        };

        p.draw = () => {
            p.orbitControl(4);
            p.background(0);
            
            // Red box
            //p.fill(255, 0, 0);
            //p.stroke(255);
            //p.box(100, 100);
            
            // Smaller shapes
            p.fill(255);
            p.stroke(255);
            
            stars.forEach(pos => {
                var [x, y, z] = pos
                p.translate(x, y, z);
                p.sphere(1);
                p.translate(-x, -y, -z);
            });

            for (var i = 0; i<lines.length; i++) {
                var [x1, y1, z1, x2, y2, z2, stroke] = lines[i];
                p.stroke(stroke);
                p.line(x1, y1, z1, x2, y2, z2);
                lines[i][6] += 1
            }
        };

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
        
        p.mouseClicked = () => {
            var [x1, y1, z1] = p.random(stars);
            var [x2, y2, z2] = p.random(stars);
            lines.push([x1, y1, z1, x2, y2, z2, 0]);
        }
    };

    componentDidMount() {
        this.p5 = new p5(this.Sketch, this.ref.current);
    }

    render() {
        return (
            <div ref={this.ref}>
            </div>
        )
    }
}

