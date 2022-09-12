import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { EDIT_NUMBER } from './queries'

const PhoneForm = ({setError}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    
    const [changeNumber, result] = useMutation(EDIT_NUMBER)

    const submit = (event) => {
        event.preventDefault()
        
        changeNumber({variables : {name, phone}})
        setName('')
        setPhone('')
    }

    useEffect(() => {
      if(result.data && result.data.editNumber === null){
        setError('person not found')
      }
    }, [result.data]) //eslint-disable-line

  return (
    <div>
        <h2>change Numbers</h2>

        <form onSubmit={submit}>
            <div>
                name 
                <input type="text"
                value= {name}
                onChange={({target})=> setName(target.value)} />
            </div>
            <div>
                phone 
                <input type="text"
                value= {phone}
                onChange={({target})=> setPhone(target.value)} />
            </div>
            <button type="submit">update!</button>
        </form>
    </div>
  )
}

export default PhoneForm