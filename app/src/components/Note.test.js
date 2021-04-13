import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react' //con el metodo render vamos a poder insepeccionar un componente renderizado
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders contents', () => {
  const note = {
    content: 'this is a test',
    important: true
  }

  const component = render(<Note note={note} />)
  component.getByText('this is a test')
  component.getByText('make not important')
  // expect(component.container).toHaveTextContent(note.content)
  // console.log(component)
  // component.debug()
  // const li = component.container.querySelector('button')
  // console.log(prettyDOM(li))
})
test('clicking the button calls event handler once', () => {
  const note = {
    content: 'this is a test',
    important: true
  }
  const mockhandler = jest.fn() //creamos una función que podremos monitorear
  const component = render(<Note note={note} toggleImportance={mockhandler} />)
  const button = component.getByText('make not important') //recuperamos el boton con el texto que se renderiza al ser important=true
  fireEvent.click(button)//dispara el evento clic al button
  // expect(mockhandler.mock.calls).toHaveLength(1)//esto nos dice si se ha llamado una vez a la funcion
  expect(mockhandler).toHaveBeenCalledTimes(1)
})
