import React from 'react';
import { useQuery } from '@tanstack/react-query';
import '../CSS/users.css';

//Rest API keys
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const API_URLv2 = 'https://jsonplaceholder.typicode.com/posts';

// function for fetching actions of users
async function getAct() {
    const res = await fetch(API_URLv2);
    if (!res.ok) {
        throw new Error('Network Error');
    }
    const user_act = await res.json();
    return user_act.map(user => ({
        userID: user.userId,
        title: user.title,
        body: user.body
    }));
}
//getting the users info
async function getUsers() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error('Network Error');
    }
    const data = await res.json();
    return data.map(person => ({
        id: person.id,
        name: person.name,
        email: person.email,
        address: person.address ? `${person.address.street}, ${person.address.city}` : 'N/A',
        phone: person.phone
    }));
}
// capture the data of the users
function DisplayUsers() {
    const { data: users, status: userStatus } = useQuery({
        queryKey: ['userData'],
        queryFn: getUsers,
        onError: (error) => {
            console.error('Error fetching data:', error);
        }
    });

    const { data: act, status: actStatus } = useQuery({
        queryKey: ['userAct'],
        queryFn: getAct,
        onError: (error) => {
            console.error('Error fetching data:', error);
        }
    });
       //error status
    if (userStatus === 'loading' || actStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (userStatus === 'error' || actStatus === 'error') {
        return <div>Error fetching data</div>;
    }

    if (!users || !act) {
        return <div>No data available</div>;
    }

    return (
        <div>
            {users.map(user => (
                <div key={user.id} className='profile-container'>
                    <div className='profile-row'>
                        <div className='profile-details'>
                            <h3 className='profile-heading'>
                                Profile <span className='user-name'>{user.name}</span>
                            </h3>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Address: {user.address}</p>
                        </div>

                        <div className='activities-container'>
                            <h3 className='profile-heading'>Activities</h3>
                            {act.filter(activity => activity.userID === user.id).map(activity => (
                                <div key={activity.title} className='activity-item'>
                                    <h4>{activity.title}</h4>
                                    <p>{activity.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayUsers;
