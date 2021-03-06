import React from 'react'
import { reduxForm } from 'redux-form'
import Input from 'react-toolbox/lib/input'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'

import css from './styles.scss'

class PigForm extends React.Component {

  componentWillMount() {
    const { tagNumber, boughtDate, initializeForm, purchasedPrice, birthDate, fatherTag, motherTag } = this.props
    initializeForm({
      tagNumber,
      boughtDate: boughtDate && boughtDate !== '' ? boughtDate : new Date(),
      purchasedPrice,
      birthDate: birthDate && birthDate !== '' ? birthDate : new Date(),
      fatherTag,
      motherTag,
    })
  }

  preventDefaultSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  formatDate = (value) => {
    return `${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`
  }

  render() {
    const { handleSubmit, fields: { tagNumber, boughtDate, purchasedPrice, birthDate, fatherTag, motherTag } } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <span>Agregar o editar un animal</span>
        <div>
          <Input
            className={css.input}
            type="text"
            label="Caravana"
            {...tagNumber}
          />
        </div>
        <div className={css.displayFlex}>
          <DatePicker
            autoOk
            label="Nacimiento"
            inputFormat={this.formatDate}
            {...birthDate}
          />
          <DatePicker
            autoOk
            label="Ingreso"
            inputFormat={this.formatDate}
            {...boughtDate}
          />
        </div>
        <div className={css.displayFlex}>
          <Input className={css.input} type="text" label="Padre" {...fatherTag} />
          <Input className={css.input} type="text" label="Madre" {...motherTag} />
        </div>
        <div>
          <Input className={css.input} type="text" label="Precio" {...purchasedPrice} />
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
  boughtDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.instanceOf(Date)]),
  initializeForm: React.PropTypes.func.isRequired,
  purchasedPrice: React.PropTypes.string,
  birthDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.instanceOf(Date)]),
  fatherTag: React.PropTypes.string,
  motherTag: React.PropTypes.string,
}

PigForm = reduxForm({
  form: 'pig',
  fields: ['boughtDate', 'tagNumber', 'purchasedPrice', 'birthDate', 'fatherTag', 'motherTag'],
  getFormState: (state, path) => state.get(path).toJS(),
})(PigForm)

export default PigForm
