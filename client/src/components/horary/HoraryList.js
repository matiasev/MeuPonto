import React  from 'react';
import moment from 'moment'
require('moment/locale/pt')

export const HoraryList = (props) => (
  <div>
    
    <ul className="list-group list-group-flush">
      <li className="list-group-item d-flex justify-content-between">Entrada
            {props.horary.start &&
          <span>{moment(props.horary.start).format('LT')}</span>
        }
        {!props.horary.start &&
          <span>--:--</span>
        }
      </li>
      <li className="list-group-item d-flex justify-content-between">Inicio do intervalo
            {props.horary.startLunch &&
          <span >{moment(props.horary.startLunch).format('LT')}</span>
        }
        {!props.horary.startLunch &&
          <span>--:--</span>
        }
      </li>
      <li className="list-group-item d-flex justify-content-between">Saida do intervalo
            {props.horary.endLunch &&
          <span >{moment(props.horary.endLunch).format('LT')}</span>
        }
        {!props.horary.endLunch &&
          <span>--:--</span>
        }
      </li>
      <li className="list-group-item d-flex justify-content-between">Saida
            {props.horary.end &&
          <span >{moment(props.horary.end).format('LT')}</span>
        }
        {!props.horary.end &&
          <span>--:--</span>
        }
      </li>
    </ul>
  </div>
)