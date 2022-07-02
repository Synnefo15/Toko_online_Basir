import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tes = () => {
	const [users, setUsers] = useState([]);
	const getData = async () => {
		const  result  = await axios.get('https://jsonplaceholder.typicode.com/users');
		setUsers(result.data);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			<ul>
				{users.map((user)=>(
                    <li key={user.email}>{user.name}</li>
                ))}
			</ul>
		</div>
	);
};

export default Tes;
