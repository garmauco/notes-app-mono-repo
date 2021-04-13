import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n/index'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  //En el primer parametro guardamos la función que queremos ejecutar fuera del componente 'ref', en este caso tendremos disponible el metodo 'togglevisibility
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>{i18n.TOGGLABE.CANCEL_BUTTON}</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable' //lo usamos para mostrar el nombre del componente en caso de que usemos hooks tipo forwardRef o memo
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable