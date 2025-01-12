import '../styles/App.scss';
import React, { useEffect } from 'react';
import Menu from './Menu/Menu';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export default function App() {

  useEffect(() => {
    // check if font is loaded before rolling text
    const font = new FontFace("SangBleu Empire", "url(fonts/SangBleuEmpire-Regular.ttf)", {
      style: "normal",
      weight: "400",
    });

    font.load().then(function(loaded_face) {
      // loaded_face holds the loaded FontFace
      // --------------------------------------------------------
      // Rolling text
      // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010
      gsap.registerPlugin(ScrollTrigger);

      let direction = 1; // 1 = forward, -1 = backward scroll

      const roll1 = roll(".rolling-text", { duration: 10 });
      const roll2 = roll(".rollingText02", { duration: 10 }, true);
      ScrollTrigger.create({
        onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;
            gsap.to([roll1, roll2], { timeScale: direction, overwrite: true });
          }
        }
      });

      // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
      function roll(targets, vars, reverse) {
        vars = vars || {};
        vars.ease || (vars.ease = "none");

        const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
          }
        })
        const elements = gsap.utils.toArray(targets);
        const clones = elements.map(el => {
          let clone = el.cloneNode(true);
          el.parentNode.appendChild(clone);
          return clone;
        });
        const positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {
          position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)
        }));

        positionClones();
        elements.forEach((el, i) => tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0));

        window.addEventListener("resize", () => {
          let time = tl.totalTime(); // record the current time
          tl.totalTime(0); // rewind and clear out the timeline
          positionClones(); // reposition
          tl.totalTime(time); // jump back to the proper time
        });

        return tl;
      }
    }).catch(function(error) {
      // error occurred
      console.log("ERROR : Loading font");
    });

    // document.fonts.add(font);
    // font.load();

    // document.fonts.ready.then(() => {
      
    // });

    // page transition handler
    // source : https://codepen.io/kylops/pen/PzZjXz
    // const buttons = document.querySelectorAll(".button");

    // buttons.forEach(button => {
    //   button.onclick = () => {
    //     console.log("transition")
    //     var id = button.getAttribute("id");
    //     var layerClass = "." + id + "-layer";
    //     var layers = document.querySelectorAll(layerClass);

    //     for (const layer of layers) {
    //       layer.classList.toggle("active");
    //     }
    //   }
    // })
  }, []);

  return (
    <div className="App">
      <div id="cursor" className="cursor"></div>
      <div className="follower"></div>

      <div className="transition-layer">
        <div className="bottom-layer">
          <div className="bottom-layer bottom-layer--2"></div>
          <div className="bottom-layer bottom-layer--3"></div>
        </div>
      </div>

      <Menu />
    </div>
  );
}