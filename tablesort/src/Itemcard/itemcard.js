import React, { Fragment } from 'react';

export default (props) => (

  <div>
    <p>Выбран пользователь <b>{props.item.firstName + ' ' + props.item.lastName}</b></p>
    {props.item.address ?
      <Fragment>
        <p>
          Описание: <br />
          <textarea defaultValue={props.item.description} />
        </p>

        <p>Адрес проживания: <b>{props.item.address.streetAddress}</b></p>
        <p>Город: <b>{props.item.address.city}</b></p>
        <p>Провинция/штат: <b>{props.item.address.state}</b></p>
        <p>Индекс: <b>{props.item.address.zip}</b></p>
      </Fragment>
      :
      null

    }

  </div>
)
