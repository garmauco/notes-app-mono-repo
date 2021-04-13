import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react' //con el metodo render vamos a poder insepeccionar un componente renderizado
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'
import i18n from '../i18n/index'

describe('<Togglabe/>', () => {
  let component
  const buttonLabel = 'Show'

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel={buttonLabel}>
        <div className='testDiv'>testDivContent</div>
      </Togglable>
    )
  })

  test('renders its childrens', () => {
    component.getByText('testDivContent')
  })

  test('style children', () => {
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display:none')//verificamos con parentNode si el componente Togglabe tiene el style
  })

  test('after clicking its childres must be show', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)
    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display:none')//verificamos con parentNode si el componente Togglabe no tiene el style despues de dar clic 'fireEvent'

  })
  test('toggled content can be closed', () => {
    const button = component.getByText(buttonLabel)
    fireEvent.click(button)
    const el = component.getByText('testDivContent')
    // expect(el.parentNode).not.toHaveStyle('display:none')
    expect(el.parentNode).toBeVisible()

    const cancelButton = component.getByText(i18n.TOGGLABE.CANCEL_BUTTON)
    fireEvent.click(cancelButton)

    // expect(el.parentNode).toHaveStyle('display:none')//verificamos con parentNode si el componente Togglabe no tiene el style despues de dar clic 'fireEvent'
    expect(el.parentNode).not.toBeVisible()
  })
})