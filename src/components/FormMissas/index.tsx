import { format } from 'date-fns'
import React, { FormEvent, useEffect, useState } from 'react'
import { BiChurch } from 'react-icons/bi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import flechaTorta from '../../assets/icons/flechaTorta.png'
import sublinhado from '../../assets/sublinhado.png'
import { Local, Missa } from '../../utils/interfaces'
import { mockedLocais } from '../../utils/mocks/locais'
import { dataParaSelect } from '../../utils/tratandoDatas'

import './styles.css'

interface FormMissa {
  titulo: string,
  txtBtn: string,
  missa?: Missa,
  mensagemEsquerda?: string,
  mensagemDireita?: string
}

const FormMissas: React.FC<FormMissa> = ({ titulo, txtBtn, missa, mensagemEsquerda, mensagemDireita }) => {
  const [nome, setNome] = useState(missa?.nome || '')
  const [locais, setLocais] = useState<Local[]>([])
  const [local_id, setLocal_id] = useState(missa?.local_id || 0)
  const [max_pessoas, setMax_pessoas] = useState(missa?.max_pessoas || '')
  const [data_hora, setData_hora] = useState(missa?.data_hora ? dataParaSelect(missa.data_hora) : '')

  const navigate = useNavigate()

  useEffect(() => {
    // api.get('locais')
    //   .then(({ data }) => setLocais(data))
    //   .catch(({ response }) => {
    //     console.log(response)
    //     alert(response?.data.erro || 'Falha ao listar locais.')
    //   })

    setLocais(mockedLocais)
  }, [])

  function criarEditarMissa(event: FormEvent) {
    event.preventDefault()

    if (data_hora) {
      // const dadosMissa = { nome, local_id, data_hora, max_pessoas }

      if (!missa) {
        // api.post('missas', dadosMissa)
        //   .then(({ data }) => {
        //     setNome('')
        //     setLocal_id(0)
        //     setMax_pessoas('')
        //     setData_hora('')

        //     alert(data.mensagem)
        //   })
        //   .catch(({ response }) => {
        //     console.log(response)
        //     alert(response.data.erro || 'Falha ao cadastrar a missa')
        //   })

        setNome('')
        setLocal_id(0)
        setMax_pessoas('')
        setData_hora('')

        alert('Missa cadastrada com sucesso!')
      } else {
        // api.put(`missas/${missa.id}`, dadosMissa)
        //   .then(({ data }) => {
        //     alert(data.mensagem)
        //     push('/lista-missas')
        //   })
        //   .catch(({ response }) => {
        //     console.log(response)
        //     alert(response.data.erro || 'Falha ao atualizar a missa')
        //   })

        alert('Missa atualizada com sucesso!')
        navigate('/lista-missas')
      }
    }
  }

  return (
    <section className="secCadastrarEditar">
      <form onSubmit={criarEditarMissa}>
        <h1>{titulo}</h1>

        <div className="containerInputsForm">
          <div>
            <input className="nome" type="text" placeholder="Dê um nome à missa" required
              onChange={({ target }) => setNome(target.value)} value={nome} />

            <BiChurch size={20} fill="#1c1c1c" />
          </div>

          <div>
            <input className="dataHora" type="datetime-local" onChange={({ target }) => setData_hora(target.value)} required
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")} value={data_hora} />
          </div>

          <div>
            <div>
              <select value={local_id} onChange={({ target }) => setLocal_id(+target.value)} required>
                <option value="" hidden>Selecione um local</option>

                {!!locais[0] && locais.map(local => <option value={local.id} key={local.id}>{local.nome}</option>)}
              </select>

              <FaMapMarkedAlt size={20} fill="#1c1c1c" />
            </div>

            <div>
              <input className="maxPessoas" type="number" placeholder="Máximo de pessoas" min={1} required
                onChange={({ target }) => setMax_pessoas(+target.value)} value={max_pessoas} />

              <HiUserGroup size={20} fill="#1c1c1c" />
            </div>
          </div>
        </div>

        {mensagemEsquerda &&
          <div className="msgEsquerda">
            {mensagemEsquerda} <br />
            <img src={flechaTorta} alt="Flecha" />
          </div>
        }

        {mensagemDireita &&
          <div className="msgDireita">
            {mensagemDireita} <br />
            <img src={sublinhado} alt="Sublinhado" />
          </div>
        }

        <button type="submit">{txtBtn}</button>
      </form>

      <div className="decoracaoFormMissa" id="decoracaoFormVermelha"></div>
      <div className="decoracaoFormMissa" id="decoracaoFormDourada"></div>
      <div className="decoracaoFormMissa" id="decoracaoFormAzul"></div>
    </section>
  )
}

export default FormMissas
