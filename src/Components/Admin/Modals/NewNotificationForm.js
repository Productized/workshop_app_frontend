import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NotificationContext } from '../../../Context/NotificationContext';
import moment from 'moment';

const NewNotificationForm = ({ send_to, attendees, toggleDisplayModal }) => {

  const [checkboxCheck, setCheckboxCheck] = useState(false);
  const { confirmNotification } = useContext(NotificationContext);

  const toggleSchedule = () => {
    setCheckboxCheck(!checkboxCheck);
  };

  const emailsList = attendees
    .map((attendee) => {
      return attendee.email;
    })
    .join();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const now_formated = moment().add(1, 'minutes').format('YYYY-MM-DDTHH:mm');

    const date = data.checkbox ? data.date : now_formated;

    const state = data.checkbox ? 'scheduled' : 'sent';

    const newObject = [
      {
        subject: data.subject,
        content: data.content,
        state: state,
        send_to: send_to,
        date: date,
        emailsList: emailsList,
      },
    ];

    if (data.checkbox) {
      toggleSchedule();
    }

    confirmNotification(newObject);
    toggleDisplayModal('message', 'notification successfully sent');
  };

  return (
    <form className='new-notification-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='new-notification-form-header' />
      <div className='new-notification-form-body'>
        <p className='defined-to'>To: {send_to}</p>
        <input
          style={errors.subject && { border: '1px solid #3B65B0' }}
          type='text'
          placeholder='Subject'
          name='subject'
          ref={register({ required: true })}
        />
        {errors.subject && <p>please add a subject</p>}
        <textarea
          style={errors.content && { border: '1px solid #3B65B0' }}
          className='content'
          type='text'
          placeholder='Content'
          name='content'
          row='5'
          cols='50'
          ref={register({ required: true })}
        />
        {errors.content && <p>please add some content</p>}
        <div className='schedule'>
          <label htmlFor='schedule'>Schedule</label>
          <input
            type='checkbox'
            name='checkbox'
            id='schedule'
            value={checkboxCheck}
            onChange={toggleSchedule}
            ref={register}
          />
          {checkboxCheck && (
            <input
              style={errors.subject && { border: '1px solid #3B65B0' }}
              type='datetime-local'
              name='date'
              ref={register({ required: true })}
            />
          )}
          {errors.date && <p>please choose a date</p>}
        </div>
      </div>
      <div className='new-notification-form-footer'>
        <button type='submit'>Send</button>
        <button onClick={toggleDisplayModal} style={{ backgroundColor: 'red' }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewNotificationForm;
