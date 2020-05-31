import React from "react"
import './style.css'

// this is a sticky footer. The body and html styling needed to make it so are located in /src/index.css

function Footer() {
  return (
    <footer>
      <div className="uk-flex uk-flex-column">
        <div className="uk-margin-small-bottom uk-margin-small-top">
          Developed by
        </div>
        <div className="uk-flex uk-flex-row uk-flex-center">

          {/* info for Alvin */}
          <div className="member-info">
            <a href="https://github.com/aroblesgalit" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail uk-" src="https://avatars2.githubusercontent.com/u/38934010?s=460&u=92262cc7b285cd2d8e8e5216bac5b54c5c989983&v=4" alt="Alvin Galit" />
            </a>
            <div>Alvin<br />Galit</div>
          </div>
          {/* info for Michael */}
          <div className="member-info">
            <a href="https://github.com/mdcassaro" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src="https://avatars3.githubusercontent.com/u/60193809?s=400&u=d80ade1797a18813d4d312528780f5b503b65f13&v=4" alt="Michael Cassaro" />
            </a>
            <div>Michael<br />Cassaro</div>
          </div>
           {/* info for Cynthia */}
           <div className="member-info">
            <a href="https://github.com/cynthia-dm1216" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src="https://avatars3.githubusercontent.com/u/60992830?s=400&u=0f399e7a7a0e0fff40133f86ec93f6115625a005&v=4" alt="Cynthia Dominguez" />
            </a>
            <div>Cynthia<br />Dominguez</div>
          </div>
          {/* info for Jordan */}
          <div className="member-info">
            <a href="https://github.com/jroenitz" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src="https://avatars0.githubusercontent.com/u/61602629?s=460&u=1995a6a23ecd93be57fc6a84ac8f61d205401101&v=4" alt="Jordan Roenitz" />
            </a>
            <div>Jordan<br />Roenitz</div>
          </div>
          {/* info for Ryan */}
          <div className="member-info">
            <a href="https://github.com/ryangautier1" target="_blank" rel="noopener noreferrer">
              <img className="member-thumbnail" src="https://avatars2.githubusercontent.com/u/35753007?s=460&u=103cbdbd244670bd042aa8f4f72cf893798365f5&v=4" alt="Ryan Gautier" />
            </a>
            <div>Ryan<br />Gautier</div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
