import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi'

import api from '../../services/api'
import Header from '../../components/Header'
import Missa from '../../utils/interfaces'
import { formatDiaMesHora } from '../../utils/tratandoDatas'

import './styles.css'

const ListaMissas: React.FC = () => {
	const [missas, setMissas] = useState<Missa[]>([])
	const [erroMissas, setErroMissas] = useState('')

	useEffect(() => {
		api.get('missas')
			.then(({ data }) => setMissas(formatDiaMesHora(data)))
			.catch(({ response }) => {
				console.log(response)
				setErroMissas(response?.data.erro || 'Falha ao listar missas.')
			})
	}, [])

	function excluirMissa(id: number) {
		// eslint-disable-next-line no-restricted-globals
		if (confirm('Deseja realmente excluir esta missa?')) {
			setMissas(missas.filter(missa => missa.id !== id))

			api.delete(`missas/${id}`)
				.catch(({ response }) => {
					console.log(response)
					alert(response?.data.erro || 'Falha ao excluir missa.')
					window.location.reload()
				})
		}
	}

	return (
		<>
			<Header />

			<section className="secListaMissas">
				<div className="headerLista">
					<h3>Missa</h3>

					<div>
						<h3>Data</h3>
						<h3>Horário</h3>
						<h3>Local</h3>
						<h3>Pessoas</h3>
					</div>
				</div>

				<div>
					{missas[0] ? missas.map(missa => {
						const [data, hora] = missa.data_hora.split('T')
						const nomeLocal = missa.local_id === 1 ? 'Centro' : 'Termas'

						const urlImagem = `${process.env.REACT_APP_URL_BANCO}/uploads/fotosLocais/igreja${nomeLocal}.jpg`

						return (
							<div className="missa" key={missa.id}>
								<div className="imagemNomeMissa">
									<img src={urlImagem} alt="Imagem da Igreja" />

									<h1>{missa.nome}</h1>
								</div>

								<hr />

								<div className="dadosMissa">
									<h3>{data}</h3>
									<h3>{hora}</h3>
									<h3>{nomeLocal}</h3>
									<h3>{missa.pessoas_cadastradas}/{missa.max_pessoas}</h3>
								</div>

								<hr />

								<div className="btnsMissa">
									<Link to={`/editar-missa/${missa.id}`} className="btnEditar">
										<BiEditAlt size={32} color="#e5e5e5" />
									</Link>

									<div className="btnExcluir" onClick={() => excluirMissa(missa.id)}>
										<BiTrash size={32} color="#e5e5e5" />
									</div>

									<Link to={`/detalhes-missa/${missa.id}`} className="btnDetalhes">
										<BiDotsVerticalRounded size={32} color="#e5e5e5" />
									</Link>
								</div>
							</div>
						)
					}) :
						<h2 className="semMissas">{erroMissas}</h2>
					}
				</div>
			</section>
		</>
	)
}

export default ListaMissas