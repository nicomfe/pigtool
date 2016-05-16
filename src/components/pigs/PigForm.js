import React from 'react'
import { reduxForm } from 'redux-form'
import Input from 'react-toolbox/lib/input'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'

import css from './styles.scss'

class PigForm extends React.Component {

  componentWillMount() {
    const { tagNumber, date, initializeForm, purchasedPrice, birthDate } = this.props
    initializeForm({
      tagNumber,
      date: date && date !== '' ? date : new Date(),
      purchasedPrice,
      birthDate: birthDate && birthDate !== '' ? birthDate : new Date(),
    })
  }

  preventDefaultSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    const { handleSubmit, fields: { tagNumber, date, purchasedPrice, birthDate } } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <DatePicker className={css.input} label="Ingreso" {...date} />
        </div>
        <div>
          <Input className={css.input} type="text" label="Caravana" {...tagNumber} />
        </div>
        <div>
          <Input className={css.input} type="text" label="Precio" {...purchasedPrice} />
        </div>
        <div>
          <DatePicker className={css.input} label="Fecha de Nacimiento" {...birthDate} />
        </div>
        <div>
          <Button
            type="submit"
            raised
            primary
            onClick={handleSubmit}
            className={css.button}
          >
            Guardar
          </Button>
        </div>
      </form>
    )
  }
}

PigForm.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  tagNumber: React.PropTypes.string,
  date: React.PropTypes.string,
  initializeForm: React.PropTypes.func.isRequired,
  purchasedPrice: React.PropTypes.string,
  birthDate: React.PropTypes.date,
}

PigForm = reduxForm({
  form: 'pig',
  fields: ['date', 'tagNumber', 'purchasedPrice', 'birthDate'],
  getFormState: (state, path) => state.get(path).toJS(),
})(PigForm)

export default PigForm
