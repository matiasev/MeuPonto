import React    from 'react';
import { Link } from "react-router-dom"

export const Footer = (props) => (
  <div>
    <ul className="nav d-flex justify-content-between">
      <li className="nav-item">
        <Link className="nav-link active" to="/"><i className="material-icons">fingerprint</i></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/"><i className="material-icons">event_note</i></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/"><i className="material-icons">person</i></Link>
      </li>
    </ul>
  </div>
)
