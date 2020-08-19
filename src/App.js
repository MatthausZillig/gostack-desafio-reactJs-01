import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			url: 'https://github.com/josepholiveira',
			title: `Desafio ReactJS`,
			techs: ['React', 'Node.js'],
		});

		const repositorie = response.data;

		setRepositories([...repositories, repositorie]);
	}

	async function handleRemoveRepository(id) {
		try {
			await api.delete(`repositories/${id}`);
			setRepositories(
				repositories.filter((repository) => repository.id !== id)
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			<ul data-testid='repository-list'>
				{repositories.length > 0 &&
					repositories.map((repositorie) => (
						<li key={repositorie.id}>
							{repositorie.title}
							<button
								onClick={() =>
									handleRemoveRepository(repositorie.id)
								}
							>
								Remover
							</button>
						</li>
					))}
			</ul>
			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
