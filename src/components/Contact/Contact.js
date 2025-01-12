import "./Contact.scss";
import contactImage from "../../images/contact-image-thumbnail.jpg"
import React, { useEffect } from 'react';

export default function Contact() {

  useEffect(() => {
    // --------------------------------------------------------
    // Follow mouse image
    // https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html

    let constrain = 60;
    let mouseOverContainer = document.querySelector('.contact-section');
    let layer = document.querySelector('.contact-img');

    function transforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - (box.height / 2)) / constrain;
      let calcY = (x - box.x - (box.width / 2)) / constrain;

      return "perspective(100vw) "
        + "   rotateX(" + calcX + "deg) "
        + "   rotateY(" + calcY + "deg) ";
    };

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }

    mouseOverContainer.onmousemove = function (e) {
      let xy = [e.clientX, e.clientY];
      let position = xy.concat([layer]);

      window.requestAnimationFrame(function () {
        transformElement(layer, position);
      });
    };
  }, []);

  return (
    <section id="contact" className="contact-section" data-scroll-section>
      <div className="wrapper-rolling-text">
        <div className="rolling-text title-200">
          <span>Get in touch · Get in touch ·&nbsp;</span>
        </div>
      </div>

      <div className="mid-container">
        <div className="contact-img-container">
          <img src={contactImage} alt="contact" className="contact-img" data-scroll></img>
        </div>

        <div className="links">
          <div className="link-title text">Socials</div>
          <div className="link text hover-underline-animation"><a href="https://dribbble.com/" target="_blank" rel="noreferrer">Dribbble</a></div>
          <div className="link text hover-underline-animation"><a href="https://dribbble.com/" target="_blank" rel="noreferrer">Instagram</a></div>
          <div className="link text hover-underline-animation"><a href="https://dribbble.com/" target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>

        <div className="links">
          <div className="link-title text">Contact</div>
          <div className="link text hover-underline-animation"><a href="mailto:nmthanh99@gmail.com">nmthanh99@gmail.com</a></div>
          <div className="link text hover-underline-animation"><a href="tel:+33621617481">+33 6 21 61 74 81</a></div>
          <div className="link text hover-underline-animation">&#8205;</div>
        </div>
      </div>

      <div className="text designed-by font-dark">Designed by Minh Thanh.</div>
    </section>
  )
}