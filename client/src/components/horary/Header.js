import React from 'react'

export const Header = (props) => (
    <div className="jumbotron jumbotron-home jumbotron-fluid bg-primary text-white">
      <div className="container">
        <p className="lead">{props.dateDay}</p>
        <h1 className="display-5">{props.clock}</h1>
      </div>
    </div>
  );

