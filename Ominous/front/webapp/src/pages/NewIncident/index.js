import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const history = useHistory()
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState()

    async function handleNewIncident(e) {
        e.preventDefault()
        const data = { title, description, value }

        try {
            await api.post('incidents', data, { headers: { Authorization: ongId } })
            history.push('/profile')
        } catch (err) {
            alert('Erro no cadastro do caso, tente novamente')
        }
    }

    return (
        <div className="new-incident-container page">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do Caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição detalhada" value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value.replace(',', '.'))} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}