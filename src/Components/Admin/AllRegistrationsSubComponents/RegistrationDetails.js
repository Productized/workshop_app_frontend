import React from 'react';
import { MdDelete, MdMessage } from 'react-icons/md';


const RegistrationDetails = ({user, toggleDisplayModal}) => {


    const handleNotification = () => {
        toggleDisplayModal("notification","", user)
    }

    const handleDelete = () => {
        toggleDisplayModal("confirm", "Are you sure you want to delete this user?",null, user.id, user.role )
    }

    const name = `${user.firstname} ${user.lastname}`

        return (
            <tr>
                <td className="name-col">
                    <div>{name}</div> 
                </td>
                <td className="email-col">{user.email}</td>
                <td className="position-col">{user.position}</td>
                <td className="company-col">{user.company}</td>
                <td className="workshops-col">{user.workshop_count === 0 ? "N/A" : user.workshop_count}</td>
                <td className="country-col">{user.country}</td>
                <td className="type-col">{user.role}</td>
                <td>
                    <button title="New Notification" className="registrations-notification-btn" onClick={handleNotification}><MdMessage /></button>
                    <button title="Delete User" className="registrations-delete-btn" onClick={handleDelete}><MdDelete /></button>
                </td>
            </tr>
        );
}

export default RegistrationDetails;