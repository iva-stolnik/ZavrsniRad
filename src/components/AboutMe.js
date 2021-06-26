import React from "react";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="segment-container clipart-first">
        <div className="beginning-segment">
          <em>Davno je to bilo...</em>
          <hr />
          <p>
            Zovem se Iva i odrasla sam u Slatini gdje sam završila opću
            gimnaziju, a dvije velike školske ljubavi bile su mi povijest i
            biologija. Programiranje me tada još nije zanimalo {`:)`}
          </p>
        </div>
      </div>
      <div className="segment-container clipart-second">
        <div className="growing-segment">
          <em>Krenulo je u jednom smjeru...</em>
          <hr />
          <p>
            Po završetku srednje škole dolazim u Zagreb na studij povijesti koji
            završavam 2018. godine, ali prvi posao ne pronalazim u struci nego u
            IT industriji kao administrator. Nešto kasnije postajem Process
            experience specialist, a na kraju i software tester. Sve je to
            probudilo znatiželju u meni pa sam odlučila saznati kako nastaju
            produkti koje sam do tada samo testirala i/ili koristila, a kako bih
            to ostvarila upisala sam program za&nbsp;
            <b>Front end developera</b> na sveučilištu&nbsp;
            <a href="https://www.algebra.hr/" target="_blank" rel="noreferrer">
              <b>Algebra</b>
            </a>
            .
          </p>
        </div>
      </div>
      <div className="segment-container clipart-third">
        <div className="future-segment">
          <em>A završilo u posve drugom...</em>
          <hr />
          <p>
            U trenutku pisanja ovoga teksta još sam uvijek polaznik Algebrina
            programa, a o mom napretku od <em>totalno ne IT osobe</em> do Front
            end developera više će, nadam se, reći ova web aplikacija&nbsp;
            <i className="far fa-smile-beam" />. Po završetku programa želja mi
            je nastaviti se usavršavati i istražiti sve što struka ima za
            ponuditi, a osnovna misao kojom se pritom vodim je -&nbsp;
            <q>Samo je nebo granica</q>.
          </p>
        </div>
      </div>
      <br />
      <div className="contact-segment pt-5">
        <div>
          <a href="https://github.com/loindes" target="_blank" rel="noreferrer">
            <i className="fab fa-github mb-3" />
          </a>
          &nbsp;
          <span>Moj GitHub repozitorij</span>
        </div>
        <div>
          <a href="mailto:iva.filipovic91@gmail.com">
            <i className="fas fa-envelope-square mb-3" />
          </a>
          &nbsp;
          <span>E-mail: iva.filipovic91@gmail.com</span>
        </div>
        <div>
          <a href="tel:+385914959132">
            <i className="fas fa-phone-square mb-3" />
          </a>
          &nbsp;
          <span>Telefon: 091/495-9132</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
