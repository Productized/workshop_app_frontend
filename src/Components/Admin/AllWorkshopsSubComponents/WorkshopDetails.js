import React from "react";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";

const WorkshopDetails = ({ workshop, toggleDisplayModal, deleteWorkshop }) => {
  const workshopDate = workshop.date.substring(0, 10);
  const starting_at = workshop.starting_hour.substring(0, 5);
  const ending_at = workshop.ending_hour.substring(0, 5);

  const handleDelete = () => {
    toggleDisplayModal(
      "confirm",
      "Are you sure you want to delete this workshop?",
      workshop.id,
      workshop.enrolled_attendees
    );
  };

  const handleEdit = () => {
    toggleDisplayModal("workshop", "", workshop.id);
  };

  return (
    <tr>
      <td className="date-col">
        <div>{workshopDate}</div>
        <div>{`${starting_at}-${ending_at}`}</div>
      </td>
      <td className="title-col">{workshop.title}</td>
      <td className="speaker-col">{workshop.workshop_speaker}</td>
      <td className="registrations-col">{`${workshop.enrolled_attendees}/${workshop.room_capacity}`}</td>
      <td className="room-setup-col">{workshop.room_type}</td>
      <td className="room-manager-col">{workshop.room_manager}</td>
      <td className="dropdown">
        <button className="options-icon">
          <FaListUl />
        </button>
        <div className="btns-dropdown">
          <button>
            <Link to={`/admin/workshop-attendees/${workshop.speaker_id}`}>
              more
            </Link>
          </button>
          <button onClick={handleEdit}>edit</button>
          <button className="delete-workshop-btn" onClick={handleDelete}>
            delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default WorkshopDetails;