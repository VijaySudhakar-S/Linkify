import React from "react";
import Typewriter from "typewriter-effect";

export const Leftdiv = () => {
  return (
    <>
      <section className="hero text-center text-lg-start">
        <h1>
          Intuitive, Secure & Dynamic
          <span className="typing-text">
            <Typewriter
              options={{
                strings: ["QR Code.", "Links."],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </span>
        </h1>
        <h5 className="hero-sub">Your links are <span>safe</span> and always <span>accessible</span></h5>
        
      </section>
    </>
  );
};
