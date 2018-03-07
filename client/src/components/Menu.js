import React from 'react'

export const Menu = (props) => (
  <div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
      </ol>
    </nav>
  </div>
)