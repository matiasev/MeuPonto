import React from 'react';

export const HoraryBtn = (props) => (
  <div>
    {!props.horary.start &&
      <button type="button" className="btn btn-success btn-lg btn-block" onClick={props.handleSubmit}>Entrada</button>
    }
    {!props.horary.startLunch && props.horary.start &&
      <button type="button" className="btn btn-danger btn-lg btn-block" onClick={props.handleSubmit}>Inicio do intervalo</button>
    }
    {!props.horary.endLunch && props.horary.startLunch &&
      <button type="button" className="btn btn-success btn-lg btn-block" onClick={props.handleSubmit}>Saida do intervalo</button>
    }
    {!props.horary.end && props.horary.startLunch && props.horary.endLunch &&
      <button type="button" className="btn btn-danger btn-lg btn-block" onClick={props.handleSubmit}>Saida</button>
    }
  </div>
)