import React from "react";
import './style.css';
import alvin from '../../images/alvin_thumbnail.jpg';
import michael from '../../images/michael_thumbnail.png';
import cynthia from '../../images/cynthia_thumbnail.jpg';
import jordan from '../../images/jordan_thumbnail.jpg';
import ryan from '../../images/ryan_thumbnail.png';


// this is a sticky footer. The body and html styling needed to make it so are located in /src/index.css

function Footer() {
  return (
    <footer>
      <div className="uk-flex uk-flex-column">
        <div className="uk-margin uk-margin-top uk-text-small">
          Developed by
        </div>
        <div className="uk-flex uk-flex-row uk-flex-center">

          {/* info for Alvin */}
          <div className="member-info">
            <a href="https://github.com/aroblesgalit" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src={alvin} alt="Alvin Galit" />
            </a>
            <div>Alvin<br />Galit</div>
          </div>
          {/* info for Michael */}
          <div className="member-info">
            <a href="https://github.com/mdcassaro" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src={michael} alt="Michael Cassaro" />
            </a>
            <div>Michael<br />Cassaro</div>
          </div>
           {/* info for Cynthia */}
           <div className="member-info">
            <a href="https://github.com/cynthia-dm1216" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src={cynthia} alt="Cynthia Dominguez" />
            </a>
            <div>Cynthia<br />Dominguez</div>
          </div>
          {/* info for Jordan */}
          <div className="member-info">
            <a href="https://github.com/jroenitz" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src={jordan} alt="Jordan Roenitz" />
            </a>
            <div>Jordan<br />Roenitz</div>
          </div>
          {/* info for Ryan */}
          <div className="member-info">
            <a href="https://github.com/ryangautier1" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src={ryan} alt="Ryan Gautier" />
            </a>
            <div>Ryan<br />Gautier</div>
          </div>

        </div>
        <a className="credit-text" href="https://www.freepik.com/free-photos-vectors/background">Vectors created by freepik</a>
      </div>
    </footer>
  )
}

export default Footer
